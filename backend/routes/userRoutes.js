const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Register user route
router.post("/register", async (req, res) => {
  const { firstName, lastName, mobileNumber, password, confirmPassword } = req.body;

  if (!firstName || !lastName || !mobileNumber || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required." });

  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  try {
    // Check if the mobile number is already registered
    const existingUser = await User.findOne({ mobileNumber });
    if (existingUser) {
      return res.status(400).json({ message: "Mobile number already registered." });
    }

    // Save new user
    const newUser = new User({ firstName, lastName, mobileNumber, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;