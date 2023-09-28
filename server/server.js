require('dotenv').config()
const express = require("express")
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

// TODO put this into a DB
const users = [
  { id: 1, name: "name1", email: 'user1@a.com', password: 'p1' },
  { id: 2, name: "name2", email: 'user2@a.com', password: 'p2' },
];


app.get("/", (req, res)=>{
    res.json({"Server":"Server running on http://localhost:5000"})
})

app.get("/login-process", async (req, res)=>{
  res.json({"User": "UserTest"})
})

app.post("/login-process", async (req, res)=>{
  const { email, password } = req.body;

  const userFound = users.find(user => user.email === email && user.password === password);

  if (!userFound) {
    res.status(401).json({ message: 'Invalid credentials' });
  } else {
    const token = jwt.sign({ userId: userFound.id }, secretKey, { expiresIn: '12h' });
    res.json({ token });
  }

  console.log(`email is ${email} and password is ${password}`)
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