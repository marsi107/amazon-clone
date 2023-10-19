require('dotenv').config()
const express = require("express")
const cors = require('cors');
const mongoose = require("mongoose")
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const bcrypt = require("bcrypt")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const path = require("path");
const { ObjectId } = require('mongodb');
const app = express()
app.use(express.json())
app.use(express.static("../"))
app.use(express.urlencoded({ extended: false}))
app.use(bodyParser.json());

const CLIENT_URL = process.env.CLIENT_URL;
const secretKey = process.env.SESSION_SECRET_KEY;
const uriDB = process.env.URI_DB

console.log('Client URL ' + CLIENT_URL)

const corsOptions = {
  origin: CLIENT_URL,
};

app.use(cors('*', corsOptions));

mongoose.connect(uriDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection

db.on("error", console.error.bind(console, "MongoDB connection error:"))
db.once("open", () => {
  console.log("Connected to MongoDB");
})

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);


let users = [];

app.get('/get-users', async (req, res) => {
  try {
    const retrievedUsers = await User.find();
    users = retrievedUsers
    res.json(retrievedUsers)
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
})

app.get("/", (req, res)=>{
    res.json({"Server":"Server running on " + process.env.SERVER_URL || "http://localhost:5000"})
})

app.post("/login-process", async (req, res)=>{
  const { email, password } = req.body;

  const authenticatePassword = async (password) => {
    for(let i = 0; i < users.length; i++){
      if(await bcrypt.compare(password, users[i].password)) return true;
    }
    return false;
  }

  const userFound = users.find(user => user.email === email);

  if (!userFound) {
    res.status(401).json({ message: 'Invalid email' });
  } else {
    authenticatePassword(password).then(passOK=>{
      if(!passOK){
        res.status(401).json({ message: 'Invalid password' });
      } else {
        const token = jwt.sign({ userId: userFound.id }, secretKey, { expiresIn: '12h' });
        res.json({ token, userFound, userLoggedIn: true });
      }
    });
  }
})

app.post("/refresh", async (req, res)=>{
  const { userId } = req.body;
  const userFound = users.find(user => user._id == userId);

  if (!userFound) {
    res.status(401).json({ message: 'Invalid user id' });
  } else {
    res.json({ userFound });
  };
})

app.post("/register-process", async (req, res)=>{
  const { name, email, password } = req.body;

  try{
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await newUser.save(); // Use `await` to handle the promise returned by `save`

    res.json({ url: "/login" })
  }catch{      
      res.json({url: '/register'})
  }
})

app.post("/create-checkout-session", async (req, res) => {
  const prodList = req.body.products;
  let lineItems = []
  const limit = 100
  let startingAfter = null
  let allStripeProducts = []

  // Get all stripe products, it has to be done that way, because if not stripe only returns 10 items, it's the default limit
  while (true) {
    const options = { limit }
    
    if (startingAfter) {
      options.starting_after = startingAfter;
    }

    const result = await stripe.products.list(options);

    // Add the retrieved products to the array
    allStripeProducts = allStripeProducts.concat(result.data);

    // If there are more products to retrieve, set the startingAfter for the next page
    if (result.has_more) {
      startingAfter = result.data[result.data.length - 1].id;
    } else {
      break; // No more products to retrieve
    }
  }

  // Match stripe product with amazon-clone received product
  for(let i=0; i < prodList.length; i++){
    const product = await allStripeProducts.find((prod) => {
      return prod.id==prodList[i].id
    })
    console.log(prodList[i].id)
    console.log(product.default_price)
    console.log(prodList[i].quantity)

    // Add products to line items so it would appear later in stripe payment
    lineItems.push({
      price: product.default_price,
      quantity: prodList[i].quantity,
    })
  }

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: `${CLIENT_URL}?success=true`,
    cancel_url: `${CLIENT_URL}/checkout?canceled=true`,
  });

  res.json({url: session.url})
})

// Only used for dev purposes to upload all the products to stripe
const dataFilePath = path.join(__dirname, 'products.json');

app.get("/upload-stripe_products", async (req, res) => {

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading JSON file');
    } else {
      try {
        const jsonData = JSON.parse(data);
        console.log(Object.keys(jsonData).length)
        for(let i=0;i<Object.keys(jsonData).length;i++){
          console.log(jsonData[i].id)
          console.log(jsonData[i].title)
          console.log(jsonData[i].price)
          const product = stripe.products.create({    
            id: jsonData[i].id,
            name: jsonData[i].title,
            default_price_data: {
              unit_amount: jsonData[i].price * 100,
              currency: 'eur',
            },
            expand: ['default_price'],
          })
        }
        res.json(jsonData);
      } catch (parseError) {
        console.error(parseError);
        res.status(500).send('Error parsing JSON data');
      }
    }
  })

  //const product = await stripe.products.create({    
  //  id: "54",
  //  name: 'btest4',
  //  default_price_data: {
  //    unit_amount: 1000,
  //    currency: 'eur',
  //  },
  //  expand: ['default_price'],
  //})

})

app.get("/upload-one-stripe", async (req, res) => {
  const product = stripe.products.create({    
    id: 1,
    name: "Guinness World Records 2023",
    default_price_data: {
      unit_amount: 8.50 * 100,
      currency: 'eur',
    },
    expand: ['default_price'],
  })
  res.json({product})
})

app.listen(5000, () => {console.log("Server running on port 5000")})