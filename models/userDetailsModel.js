const mongoose = require("mongoose");

const detailsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    age: {
      type: Number,
      required: [true, "Please enter user age."],
    },
    gender: {
      type: String,
      required: [true, "Please enter user gender."],
    },
    height: {
      type: Number,
      required: [true, "Please enter user height."],
    },
    weight: {
      type: Number,
      required: [true, "Please enter user weight."],
    },
    activity_level: {
      type: String,
      required: [true, "Please enter user activity level."],
    },
    goal: {
      type: String,
      required: [true, "Please enter user goal."],
    },
    caloriesGoal: {
      type: Number,
      required: [true, "Please enter user calories goal."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Details", detailsSchema);
