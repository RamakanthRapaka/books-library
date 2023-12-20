const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the book name"],
    },
    author: {
      type: String,
      required: [true, "Please add the author name"],
    },
    status: {
      type: Boolean,
      required: [true, "Please add the book status"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);
