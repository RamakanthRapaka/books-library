const asyncHandler = require("express-async-handler");
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
  const { userName, name, email, contactNumber } = req.body;
  if (!userName || !name || !email || !contactNumber) {
    res.status(400);
    throw new Error("All fields are required!");
  }
  const book = await User.create({
    userName,
    name,
    email,
    contactNumber,
  });
  res.status(201).json(book);
});

//@desc Get book
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

module.exports = {
  getUsers,
  getUser,
  createUser,
};
