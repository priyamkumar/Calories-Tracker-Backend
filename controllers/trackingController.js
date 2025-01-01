const asyncHandler = require("express-async-handler");
const Track = require("../models/trackingModel");

const getUserItems = asyncHandler(async (req, res) => {
  userId = req.user;
  if (!userId) {
    res.status(400);
    throw new Error("Please login first.");
  }
  let meals = await Track.find({
    user: userId,
  });
  console.log(meals)
  res.status(201).json({
    success: true,
    message: `Meals fetched. ${meals}`,
  });
});

const newItem = asyncHandler(async (req, res) => {
  const { mealName, mealType, quantity, calories } = req.body;
  if (!mealName || !mealType || !quantity || !calories) {
    res.status(400);
    throw new Error("All fields are mandatory.");
  }
  userId = req.user;
  let meal = await Track.create({
    mealName,
    mealType,
    quantity,
    user: userId,
    calories,
  });
  res.status(201).json({
    success: true,
    message: `Meal added. ${meal}`,
  });
});

const updateItem = asyncHandler(async (req, res) => {
  const { mealId, mealName, mealType, quantity, calories } = req.body;
  if (!mealId || !mealName || !mealType || !quantity || !calories) {
    res.status(400);
    throw new Error("All fields are mandatory.");
  }
  userId = req.user;
  let meal = await Track.findByIdAndUpdate(
    {
      _id: mealId,
      user: userId,
    },
    {
      mealName,
      mealType,
      quantity,
      calories,
    }
  );

  res.status(200).json({
    success: true,
    message: `Meal updated. ${meal}`,
  });
});

const deleteItem = asyncHandler(async (req, res) => {
  const { mealId } = req.body;
  if (!mealId) {
    res.status(400);
    throw new Error("Meal not found.");
  }
  userId = req.user;
  let meal = await Track.findByIdAndDelete(
    {
      _id: mealId,
      user: userId,
    }
  );

  res.status(200).json({
    success: true,
    message: `Meal deleted. ${meal}`,
  });
});

module.exports = { getUserItems, newItem, updateItem, deleteItem };
