const dotenv = require('dotenv')
const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')

//database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("data base is connected is successfully")
  } catch (error) {
    console.log(error);
  }
};


// middlewares
dotenv.config()
app.use(cors());
app.use(express.json())
app.use('/api',authRouter)

app.get('/',(req,res)=>{
  res.send("Server is running")
})
// server running
app.listen(process.env.PORT, () => {
    connectDB()
  console.log("app is running on port ",process.env.PORT);
});
