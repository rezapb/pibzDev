const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("./../keys/config");
const { validationResult } = require("express-validator");

// Validation
const userRegisterValidation = require("./../validations/register");
const userLoginValidation = require("./../validations/login");

// Middlewares
const VerifyToken = require("./../middlewares/auth");

// Model
const User = require("./../models/User");

// Register User
router.post("/register", userRegisterValidation(), async (req, res) => {
  try {
    // check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(400)
        .json({ errors: errors.array(), severity: "error" });

    // check if user exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        errors: [{ msg: "کاربری با این ایمیل وجود دارد", severity: "error" }],
      });
    } else {
      // gravatar
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "robohash",
      });

      // make the new user
      const { name, username, email, password } = req.body;
      const verified = false;
      const newUser = new User({
        name,
        username,
        email,
        password,
        avatar,
        verified,
      });

      await newUser.save();

      // generate jwt token
      const token = jwt.sign({ id: newUser.id }, config.jwtSecretKey, {
        expiresIn: 86400, // expires in 24h
      });

      res.status(200).send({ auth: true, token });
    }
  } catch (err) {
    console.log(err);
  }
});

// Login User
router.post("/login", userLoginValidation(), async (req, res) => {
  try {
    // check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    // check for errors and if user exists
    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.status(404).json({
        errors: [
          { msg: "کاربری با این ایمیل وجود ندارد", severity: "warning" },
        ],
      });

    // check for password validation
    const passwordIsValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordIsValid)
      return res.status(401).send({
        auth: false,
        token: null,
        errors: [{ msg: "رمز عبور اشتباه است", severity: "error" }],
      });

    // generate jwt token and payload
    const token = jwt.sign({ id: user.id }, config.jwtSecretKey, {
      expiresIn: "7d", // expires in 7days
    });
    res.status(200).send({ auth: true, token, verified: user.verified });
  } catch (err) {
    console.log(err);
  }
});

// Get Current User
router.get("/current", VerifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId, { password: 0 });
    res.status(200).json(user);
  } catch (error) {
    console.log(error.msg);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
