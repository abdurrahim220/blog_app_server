const express = require("express");
const app = express();

//database

const connectDB = async () => {
  try {
    await mongoose.connect();
  } catch (error) {
    console.log(error);
  }
};

app.listen(5000, () => {
  console.log("app is running on port");
});
