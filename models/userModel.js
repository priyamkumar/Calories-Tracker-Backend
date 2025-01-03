const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the user name."],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please enter the user email."],
    },
    password: {
      type: String,
      required: [true, "Please enter the user password."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
