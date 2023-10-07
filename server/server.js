require('dotenv').config()
const express = require("express")
const cors = require('cors');
const pg = require('pg')
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const bcrypt = require("bcrypt")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const path = require("path")
const app = express()
app.use(express.json())
app.use(express.static("../"))
app.use(express.urlencoded({ extended: false}))
app.use(bodyParser.json());

const CLIENT_URL = process.env.CLIENT_URL;
const secretKey = process.env.SESSION_SECRET_KEY;

console.log('Client URL ' + CLIENT_URL)

const corsOptions = {
  origin: CLIENT_URL,
};

app.use(cors('*', corsOptions));

const db = new pg.Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

let users = [];

app.get('/get-users', async (req, res) => {
  db.query('SELECT * FROM users', (err, data) => {
    if (err) {
      return res.status(500).send("error: " + err.message);
    }
    users = data.rows;
    res.json({"Server":"Users retrieved properly from DB"});
  });
});

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
  const userFound = users.find(user => user.id == userId);

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
    const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`;
    const values = [name, email, hashedPassword];

    db.query(query, values, function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }else{
        res.json({url: '/login'})
      }
    });
  }catch{
      res.json({url: '/register'})
  }
})


app.post("/create-checkout-session", async (req, res) => {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1Nuvk2DwetCnRMHE5sDpUK3N',
            quantity: 1,
          },
        ],
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

app.post("/test-checkout-session", async (req, res) => {
  const { prodList } = req.body;
  const products = await stripe.products.list()

  console.log(prodList)

  //for(let i=0; i < prodList.length; i++){
//
  //}
  const product = products.data.find((prod) => {
    return prod.id===prodList[0].id
  })
  //console.log(product.default_price)
//
  //const session = await stripe.checkout.sessions.create({
  //  line_items: [
  //    {
  //      // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
  //      price: product.default_price,
  //      quantity: 1,
  //    },
  //  ],
  //  mode: 'payment',
  //  success_url: `${CLIENT_URL}?success=true`,
  //  cancel_url: `${CLIENT_URL}/checkout?canceled=true`,
  //});
//
  //res.json({url: session.url})
})


app.listen(5000, () => {console.log("Server running on port 5000")})