/*const express=require('express')//npm i express
const cookieParser=require('cookie-parser') //npm i cookie-parser
const authRoutes=require('./routes/auth.routes')
const foodRoutes=require('./routes/food.routes')
const foodPartnerRoutes=require('./routes/food-partner.routes')
const cors=require('cors')

const app=express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.get("/",(req,res)=>{
    res.send("Hello World")
})
app.use('/api/auth',authRoutes)
app.use('/api/food',foodRoutes)
app.use('/api/food-partner',foodPartnerRoutes)
module.exports=app; */// 
const express = require('express'); // npm i express
const cookieParser = require('cookie-parser'); // npm i cookie-parser
const cors = require('cors');

// Routes
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodPartnerRoutes = require('./routes/food-partner.routes');

const app = express();

// 🔹 Middleware
app.use(cors({
  origin: "https://foodieappfrontend-omwh.onrender.com", // frontend URL
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// 🔹 Optional: attach io in controllers
// ye server.js me already handle ho raha hai, yaha sirf placeholder hai
app.use((req, res, next) => {
  // req.io will be injected from server.js
  next();
});

// 🔹 Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);

module.exports = app;