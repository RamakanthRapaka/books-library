const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please add the user name"],
    },
    name: {
      type: String,
      required: [true, "Please add the name"],
    },
    email: {
      type: String,
      required: [true, "Please add the email"],
    },
    contactNumber: {
      type: String,
      required: [true, "Please add the contact number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
