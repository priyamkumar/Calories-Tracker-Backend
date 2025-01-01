const asyncHandler = require("express-async-handler");
const Details = require("../models/userDetailsModel");

const addOrUpdateDetails = asyncHandler(async (req, res) => {
  const { age, gender, height, weight, activity_level, goal, caloriesGoal } =
    req.body;
  if (
    (!age || !gender || !height || !weight || !activity_level,
    !goal || !caloriesGoal)
  ) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  user_id = req.user;

  let details = await Details.findOneAndUpdate(
    {
      user: user_id,
    },
    {
      age,
      gender,
      height,
      weight,
      activity_level,
      goal,
      caloriesGoal,
    },
    {
      new: true,
      upsert: true,
    }
  );
  if (details) {
    res.status(201).json({
      success: true,
      message: "Details added successfully.",
    });
  }
});

module.exports = { addOrUpdateDetails };
