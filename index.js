require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require('mongoose')


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



// server running
app.listen(process.env.PORT, () => {
    connectDB()
  console.log("app is running on port ",process.env.PORT);
});
