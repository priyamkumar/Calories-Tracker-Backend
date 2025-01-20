const asyncHandler = require("express-async-handler");
const Track = require("../models/trackingModel");
const mongoose = require("mongoose");

const getUserItems = asyncHandler(async (req, res) => {
  userId = req.user;
  if (!userId) {
    res.status(400);
    throw new Error("Please login first.");
  }
  let meals = await Track.find({
    user: userId,
  });
  res.status(201).json({
    success: true,
    meals: meals,
  });
});

const newItem = asyncHandler(async (req, res) => {
  const {
    mealName,
    mealType,
    quantity,
    calories,
    mealDate,
    carbs,
    protein,
    fats,
  } = req.body;
  if (!mealName || !mealType || !quantity) {
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
    carbs,
    protein,
    fats,
    createdAt: mealDate,
  });
  res.status(201).json({
    success: true,
    message: `Meal added. ${meal}`,
    id: meal._id,
  });
});

const updateItem = asyncHandler(async (req, res) => {
  const {
    mealId,
    mealName,
    mealType,
    quantity,
    calories,
    carbs,
    protein,
    fats,
  } = req.body;
  if (!mealId || !mealName || !mealType || !quantity) {
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
      carbs,
      protein,
      fats,
    }
  );

  if (!meal) {
    res.status(404);
    throw new Error("Meal not found.");
  }

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
  let meal = await Track.findByIdAndDelete({
    _id: mealId,
    user: userId,
  });

  res.status(200).json({
    success: true,
    message: `Meal deleted. ${meal}`,
  });
});

const getCaloriesData = asyncHandler(async (req, res) => {
  userId = req.user;
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const userObjectId = new mongoose.Types.ObjectId(userId);

  const pipeline = [
    {
      $match: {
        user: userObjectId,
        createdAt: { $gte: sevenDaysAgo, $lte: today },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        totalCalories: { $sum: { $ifNull: ['$calories', 0] } },
        totalCarbs: { $sum: { $ifNull: ['$carbs', 0] } },
        totalProtein: { $sum: { $ifNull: ['$protein', 0] } },
        totalFats: { $sum: { $ifNull: ['$fats', 0] } },
      },
    },
    { $sort: { _id: 1 } },
  ];

  const result = await Track.aggregate(pipeline);
  res.status(200).json(result);
});

module.exports = {
  getUserItems,
  newItem,
  updateItem,
  deleteItem,
  getCaloriesData,
};