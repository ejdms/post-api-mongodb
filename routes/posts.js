const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

//GET ALL
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.json({ error });
  }
});

//GET ONE
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.json(post);
  } catch (error) {
    res.json({ error });
  }
});

//POST NEW
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  const post = new Post({
    title,
    description
  });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    res.json({ error });
  }
});

//DELETE ONE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.deleteOne({ _id: id });
    res.json(post);
  } catch (error) {
    res.json({ error });
  }
});

//UPDATE ONE
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let newPost = {};
    const { title, description } = req.body;
    if (title) {
      newPost = {
        ...newPost,
        title
      };
    }
    if (description) {
      newPost = {
        ...newPost,
        description
      };
    }
    const post = await Post.updateOne(
      { _id: id },
      {
        $set: {
          ...newPost
        }
      }
    );
    res.json(post);
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
