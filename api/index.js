const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const productRoute = require("./routes/product")
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const Stripe = require("stripe");
const { User } = require('./models/User')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//DB CONNECTION
mongoose.connect(process.env.MONGODB, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
.then(()=>console.log("Connection successfull"))
.catch(err=>console.log(err))

//MIDDLEWARES
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res)=>{
  res.send("hola")
})


app.post("/api/checkout", async (req, res) => {
  // you can get more data to find in a database, and so on
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "",
      payment_method: id,
      confirm: true, //confirm the payment at the same time
    });

    return res.status(200).json({ message: "Successful Payment" });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.raw.message });
  }
});

//ROUTES
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoute)

//STARTING SERVER
const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log('Running')
})