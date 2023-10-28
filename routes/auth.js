const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register

router.post("/register", async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 11);
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    const saveUser = await newUser.save();
    res.status(200).json(saveUser);
  } catch (error) {
    res.status(500).json(error);
  }
}).post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User not found!!");
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).json("Wrong credentials!!");
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "3d",
    });
    const { password, ...info } = user._doc;
    res.cookie("token", token).status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
});

//logout

router.get('/logout',async(req,res)=>{
    try {
        res.clearCookie("token",{sameSite:"none",secure:true}).status(200).send("User logged out successfully")
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;
