const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

// Middlewares
const VerifyToken = require("./../middlewares/auth");

// Validation
const postValidation = require("./../validations/post");

// Model
const Post = require("./../models/Post");
const User = require("./../models/User");
const Image = require("../models/Image");

// Post
router.post("/", [VerifyToken, postValidation()], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const user = await User.findById(req.userId).select("-password");
    // const img = await Image.findById(req.body.image);

    const newPost = new Post({
      user: req.userId,
      username: user.name,
      avatar: user.avatar,
      title: req.body.title,
      image: req.body.image, // get the image encrypted name
      description: req.body.description,
      tags: req.body.tags,
      content: req.body.content.map((part) => {
        return {
          subtitle: part.subtitle,
          text: part.text,
          code: part.code,
        };
      }),
    });

    const post = await newPost.save();
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
});

// Get all posts
router.get("/:page", async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const PAGE_SIZE = 5;
    const skip = (page - 1) * PAGE_SIZE;

    const posts = await Post.find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(PAGE_SIZE)
      .select("-content -comments");

    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
});

// Get a post by ID
router.get("/post/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "Post not found" }); // Solve: downgrade mongoose version
    }
    res.status(500).send("Server Error!");
  }
});

// Get posts made by user ID
router.get("/user/:id/:page", async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const PAGE_SIZE = 5;
    const skip = (page - 1) * PAGE_SIZE;

    const posts = await Post.find({ user: req.params.id })
      .skip(skip)
      .limit(PAGE_SIZE)
      .sort({ date: -1 });
    if (posts.length <= 0) {
      return res
        .status(400)
        .json({ msg: "This user doesn't have any posts yet!" });
    }
    res.json(posts);
  } catch (error) {}
});

// Comment on post
router.post("/comment/:id", VerifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    const post = await Post.findById(req.params.id);

    const newComment = {
      user: req.userId,
      text: req.body.cmText,
      code: req.body.cmCode,
      username: user.name,
      avatar: user.avatar,
    };

    post.comments.unshift(newComment);

    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
});

// Reply to comment
router.post("/comments/reply/:id", VerifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    const comment = await Post.updateOne(
      {
        "comments._id": req.body.commentId,
      },
      {
        $push: {
          "comments.$.replies": {
            user: req.userId,
            text: req.body.replyText,
            code: req.body.replyCode,
            username: user.name,
            avatar: user.avatar,
          },
        },
      }
    );

    const post = await Post.findById(req.params.id);
    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
});

// Delete a post by ID
router.delete("/:id", VerifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400).json({ msg: "Post not found" });
    }

    if (post.user.toString() !== req.userId) {
      return res.status(401).json({ msg: "User not authorized!" });
    }

    await post.remove();

    res.json({ msg: "Post Removed!" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "Post not found" }); // Solve: downgrade mongoose version
    }
    res.status(500).send("Server Error!");
  }
});

// Get all posts count
router.get("/count/all", async (req, res) => {
  try {
    const allPostsCount = await Post.countDocuments();
    res.json(allPostsCount);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
});

// Get all user posts count
router.get("/count/:id", async (req, res) => {
  try {
    const userPostsCount = await Post.find({
      user: req.params.id,
    }).countDocuments();
    res.json(userPostsCount);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
});

// Get all posts with a tag
router.get("/tags/:tag/:page", async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const PAGE_SIZE = 5;
    const skip = (page - 1) * PAGE_SIZE;
    const posts = await Post.find({ "tags.label": req.params.tag })
      .skip(skip)
      .limit(PAGE_SIZE)
      .sort({ date: -1 })
      .select("-content -comments");
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
});

// Count all posts with a tag
router.get("/tag/count/:tag", async (req, res) => {
  try {
    const posts = await Post.find({
      "tags.label": req.params.tag,
    }).countDocuments();
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
});

// Search posts
// ** it is case sensitive, fix it
router.get("/search/:text", async (req, res) => {
  try {
    const searchedPosts = await Post.find({
      title: { $regex: req.params.text },
    })
      .sort({ date: -1 })
      .select("-content -comments");
    res.json(searchedPosts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
