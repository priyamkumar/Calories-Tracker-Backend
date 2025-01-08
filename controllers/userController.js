const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Details = require("../models/userDetailsModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Track = require("../models/trackingModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  let user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error("User already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      success: true,
      message: "User created.",
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid.");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(user.id, process.env.ACCESS_TOKEN_SECRET);
    res
      .status(200)
      .cookie("token", accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        success: true,
        message: "User Logged in.",
      });
  } else {
    res.status(401);
    throw new Error("Invalid email or password.");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "User Logged out.",
    });
});

const getUser = asyncHandler(async (req, res) => {
  var start = new Date(req.body.date);
  start.setHours(0, 0, 0, 0);
  var end = new Date(req.body.date);
  end.setHours(23, 59, 59, 999);
  user_id = req.user;
  if (!user_id) {
    res.status(400);
    throw new Error("Please add your details in settings.");
  }

  let details = await Details.findOne({
    user: user_id,
  });

  let meals = await Track.find({
    user: user_id,
    createdAt: {$gte: start, $lt: end}
  });

  res.status(201).json({
    success: true,
    user: req.user,
    details,
    meals,
  });
});

module.exports = { registerUser, loginUser, logoutUser, getUser };
