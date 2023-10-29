const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comments");
const bcrypt = require("bcrypt");
const verifyToken = require('../middleWare/verifyToken');

// update
router
  .post("/write", verifyToken,async (req, res) => {
    try {
      const newPost = new Post(req.body);
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .put("/:id",verifyToken, async (req, res) => {
    try {
      const updatedUser = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .delete("/:id",verifyToken, async (req, res) => {
    try {
      await Post.findByIdAndDelete(req.params.id);

      res.status(500).json("Post has been deleted!");
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .get("/user/:userId", async (req, res) => {
    try {
      const post = await Post.find({ userId: req.params.userId });

      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .get("/", async (req, res) => {
    const query = req.query;
    try {
      const searchFilter = {
        title: { $regex: query.search, $options: "i" },
      };
      const getPost = await Post.find(query.search ? searchFilter : null);

      res.status(200).json(getPost);
    } catch (error) {
      res.status(500).json(error);
    }
  });

//
module.exports = router;
