const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  website: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
    default: "",
  },
  socials: {
    instagram: {
      type: String,
      default: "",
    },
    facebook: {
      type: String,
      default: "",
    },
    linkedin: {
      type: String,
      default: "",
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Profile = mongoose.model("Profile", profileSchema, "Profiles");

module.exports = Profile;
