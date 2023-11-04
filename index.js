const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const path = require("path")
// const errorHandler = require('./middleWare//errorHandler')
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const commentRouter = require("./routes/comments");

//database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("data base is connected is successfully");
  } catch (error) {
    console.log(error);
  }
};

// middlewares
dotenv.config();
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());

// routes
app.use("/api", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
// app.use(errorHandler)

// multer storage

const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, "images");
  },
  filename: (req, file, fn) => {
    fn(null, req.body.img);
    // fn(null, "image1.png");
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Image has been uploaded successfully");
});

app.get("/", (req, res) => {
  res.send("Server is running");
});
// server running
app.listen(process.env.PORT, () => {
  connectDB();
  console.log("app is running on port ", process.env.PORT);
});
