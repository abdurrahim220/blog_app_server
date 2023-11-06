const express = require("express");
const router = express.Router();
const Comment = require("../models/Comments");
const verifyToken = require('../middleWare/verifyToken');

// update
router
  .post("/write", verifyToken,async (req, res) => {
    try {
      const newComment = new Comment(req.body);
      const savedComment = await newComment.save();
      res.status(200).json(savedComment);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .put("/:id", verifyToken,async (req, res) => {
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
  .delete("/:id",verifyToken,async (req, res) => {
    try {
      const deletedComment = await Comment.findByIdAndDelete(req.params.id);

      if (!deletedComment) {
        return res.status(404).json("Comment not found");
      }
      res.status(200).json("Comment has been deleted");
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
