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

const getDetails = asyncHandler(async (req, res) => {
  user_id = req.user;
  if (
    (!user_id)
  ) {
    res.status(400);
    throw new Error("Please add your details in settings.");
  }

  let details = await Details.findOne(
    {
      user: user_id,
    },
  );
  if (details) {
    res.status(201).json({
      success: true,
      details: details,
    });
  }
});

module.exports = { addOrUpdateDetails, getDetails };
