const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comments");
const bcrypt = require("bcrypt");

// update
router
  .put("/:id", async (req, res) => {
    try {
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 11);
      }
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .delete("/:id", async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      await Post.deleteMany({ userId: req.params.id });
      await Comment.deleteMany({ userId: req.params.id });
      res.status(500).json("User has been deleted!");
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      const {password,...info}=user._doc
      res.status(200).json(info)
    } catch (error) {
      res.status(500).json(error);
    }
  });

// get user

module.exports = router;
