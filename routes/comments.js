const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Comment = require("../models/Comments");
const bcrypt = require("bcrypt");

// update
router
  .post("/write", async (req, res) => {
    try {
      const newComment = new Comment(req.body);
      const savedComment = await newComment.save();
      res.status(200).json(savedComment);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .put("/:id", async (req, res) => {
    try {
      const updatedUser = await Comment.findByIdAndUpdate(
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
      await Comment.findByIdAndDelete(req.params.id);

      res.status(500).json("Comment has been deleted!");
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .get("/post/:postId", async (req, res) => {
    try {
      const comment = await Comment.find({ postId: req.params.postId });

      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .get("/", async (req, res) => {
    try {
      const getComment = await Comment.find();

      res.status(200).json(getComment);
    } catch (error) {
      res.status(500).json(error);
    }
  });

// get user

module.exports = router;
