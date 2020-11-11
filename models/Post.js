const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  username: {
    type: String,
  },
  avatar: {
    type: String,
  },
  image: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  tags: {
    type: Array,
    required: true,
  },
  content: [
    {
      subtitle: {
        type: String,
      },
      text: {
        type: String,
      },
      code: {
        type: String,
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      text: {
        type: String,
        required: true,
      },
      code: {
        type: String,
      },
      username: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      replies: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
          text: {
            type: String,
            required: true,
          },
          code: {
            type: String,
          },
          username: {
            type: String,
          },
          avatar: {
            type: String,
          },
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema, "Posts");

module.exports = Post;
