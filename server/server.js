require('dotenv').config()
const express = require("express")
const sqlite3 = require('sqlite3');
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const bcrypt = require("bcrypt")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const app = express()
app.use(express.json())
app.use(express.static("../"))
app.use(express.urlencoded({ extended: false}))
app.use(bodyParser.json());

const CLIENT_URL = 'http://localhost:3000';
const secretKey = process.env.SESSION_SECRET_KEY;

const db = new sqlite3.Database('./amazon-clone.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the database.');
  }
});

let users = [];

app.get('/get-users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    users = rows;
    res.json({"Server":"Users retrieved properly from DB"});
  });
});

app.get("/", (req, res)=>{
    res.json({"Server":"Server running on http://localhost:5000"})
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
    users.push({
      id: Date.now().toString(),
      name: name,
      email: email,
      password: hashedPassword
    })
    res.json({url: '/login'})
  }catch{
    res.json({url: '/register'})
  } 
  // TODO remove this comment when finished
  console.log(users)
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


app.listen(5000, () => {console.log("Server running on port 5000")})