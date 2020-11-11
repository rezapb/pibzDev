const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../keys/config");
const { validationResult } = require("express-validator");

// Middlewares
const VerifyToken = require("./../middlewares/auth");

// Validation
const profileValidation = require("./../validations/profile");

// Model
const Profile = require("./../models/Profile");
const User = require("./../models/User");

// here have 2 verifyToken , edit them
const verifyToken = require("./../middlewares/auth");

// Get Current User Profile
router.get("/current", VerifyToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.userId,
    }).populate("User", ["username", "avatar"]);

    if (!profile) {
      return res.status(400).json({
        errors: [
          {
            msg: "پروفایلی برای این کاربر وجود ندارد",
          },
        ],
      });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
});

// Create or Update User Profile
router.post("/", [profileValidation(), verifyToken], async (req, res) => {
  // check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const {
    website,
    location,
    status,
    skills,
    bio,
    instagram,
    facebook,
    linkedin,
  } = req.body;

  // build profile object
  const profileFields = {};
  profileFields.user = req.userId;

  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (status) profileFields.status = status;
  if (bio) profileFields.bio = bio;
  if (skills) {
    profileFields.skills = skills.split(",").map((skill) => skill.trim());
  }

  // build social object
  profileFields.socials = {};
  if (instagram) profileFields.socials.instagram = instagram;
  if (facebook) profileFields.socials.facebook = facebook;
  if (linkedin) profileFields.socials.linkedin = linkedin;

  try {
    let profile = await Profile.findOne({ user: req.userId });

    if (profile) {
      // update profile if exists
      profile = await Profile.findOneAndUpdate(
        { user: req.userId },
        { $set: profileFields },
        { new: true }
      );

      return res.json(profile);
    }

    // create profile if it doesn't exists
    profile = new Profile(profileFields);

    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
});

// Get all profiles
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
});

// Get profile by user ID
router.get("/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile)
      return res.status(400).json({ msg: "No profile for this user!" });
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "No profile for this user!" }); // Solve: downgrade mongoose version
    }
    res.status(500).send("Server Error!");
  }
});

// Delete profile user and posts
router.delete("/", VerifyToken, async (req, res) => {
  try {
    // Remove Posts

    // Remove profile
    await Profile.findByIdAndRemove({
      user: req.userId,
    });
    // Remove user
    await Profile.findByIdAndRemove({
      _id: req.userId,
    });
    res.json({ msg: "User deleted!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
});
module.exports = router;
