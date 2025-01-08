const mongoose = require("mongoose");

const trackingSchema = mongoose.Schema(
  {
    mealName: {
      type: String,
      required: [true, "Please enter meal name"],
    },
    mealType: {
      type: String,
      required: [true, "Please enter meal type"],
    },
    quantity: {
      type: Number,
      required: [true, "Please enter meal quantity"],
    },
    calories: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Track", trackingSchema);
