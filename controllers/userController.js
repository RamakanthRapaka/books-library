const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
//@desc Get all books
//@route GET /api/books
//@access public
const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();
  res.status(200).json(books);
});

//@desc Create new book
//@route POST /api/books
//@access public
const createBook = asyncHandler(async (req, res) => {
  const { name, author, status } = req.body;
  if (!name || !author || !status) {
    res.status(400);
    throw new Error("All fields are required!");
  }
  const book = await Book.create({
    name,
    author,
    status,
  });
  res.status(201).json(book);
});

//@desc Get book
//@route GET /api/books/:id
//@access public
const getBook = asyncHandler(async (req, res) => {
  const book = await Book.findOne({ _id: req.params.id });
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  res.status(200).json(book);
});

//@desc Update book
//@route PUT /api/books/:id
//@access public
const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findOne({ _id: req.params.id });
  if (!book) {
    res.status(404);
    throw new Error("Book is not available");
  }

  const updateBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updateBook);
});

//@desc Delete book
//@route DELETE /api/books/:id
//@access public
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findOne({ _id: req.params.id });
  if (!book) {
    res.status(404);
    throw new Error("Book Not Found");
  }
  await Book.deleteOne({ _id: req.params.id });
  res.status(200).json(book);
});

module.exports = {
  getBooks,
  getBook,
  createBook,
  getBook,
  updateBook,
  deleteBook,
};
