const express = require("express");
const bcryptjs = require("bcryptjs");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require("../../models/User");

userRouter.post("/signup", async (req, res) => {
  try {
    const { email, password, confirmPassword, username } = req.body;
    if (!email || !password || !username || !confirmPassword) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    if (password.length < 6) throw new Error("Password too short");

    if (confirmPassword !== password) {
      return res.status(400).json({ msg: "Both the passwords dont match" });
    }

    if (!validateEmail(email)) throw new Error("Please enter valid email");
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "email already taken" });
    }

    const hashedPassword = await bcryptjs.hash(password, 8);
    const newUser = new User({ email, password: hashedPassword, username });

    const savedUser = await newUser.save();
    console.log(savedUser.username);
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exist" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ msg: "Incorrect password" });
    }
    const token = jwt.sign({ id: user._id }, "passwordKey");
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

userRouter.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, "passwordKey");
    if (!verified) return res.json(false);
    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    return res.json(true);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

userRouter.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    username: user.username,
    id: user._id,
  });
});

module.exports = userRouter;

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
