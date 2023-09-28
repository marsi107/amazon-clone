console.log("Hi all")
require('dotenv').config()
const express = require("express")
const app = express()
app.use(express.json())
app.use(express.static("../"))

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const CLIENT_DOMAIN = 'http://localhost:3000';

app.get("/", (req, res)=>{
    res.json({"Server":"Server running on http://localhost:5000"})
})

app.post("/create-checkout-session", async (req, res) => {
      //res.json({ url: "My url" })
      console.log("Server reached")
      console.log(process.env.STRIPE_PRIVATE_KEY)
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1Nuvk2DwetCnRMHE5sDpUK3N',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${CLIENT_DOMAIN}?success=true`,
        cancel_url: `${CLIENT_DOMAIN}/checkout?canceled=true`,
      });
    
      res.json({url: session.url})
  })


app.listen(5000, () => {console.log("Server running on port 5000")})