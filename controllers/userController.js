const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
//@desc Get all users
//@route GET /api/users
//@access public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

//@desc Create new user
//@route POST /api/users
//@access public
const createUser = asyncHandler(async (req, res) => {
  const { userName, name, email, contactNumber, password, role } = req.body;
  if (!userName || !name || !email || !contactNumber || !password || !role) {
    res.status(400);
    throw new Error("All fields are required!");
  }
  const userAvailable = await User.findOne({ email });
  console.log(userAvailable, "userAvailable");
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    userName,
    name,
    email,
    contactNumber,
    password: hashedPassword,
    role,
  });
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data not valid");
  }
  res.status(201).json(user);
});

//@desc Get user
//@route GET /api/users/:id
//@access public
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});

//@desc Delete user
//@route GET /api/users/:id
//@access public
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  await User.deleteOne({ _id: req.params.id });
  res.status(200).json(user);
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required!");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign({
        user:{
            username:user.userName,
            email: user.email,
            id: user.id
        }
    });
    res.status(200).json({accessToken}) 
  }
  if (!user) {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
};
