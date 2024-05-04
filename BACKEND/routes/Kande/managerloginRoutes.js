const express = require("express");
const User = require("../../models/Kande/managerlogin.js");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(200).json({ message: "User created successfully." });
  } catch (error) {
    res.status(400).json({ message: "Error creating user." });
  }
});

router.post("/Mlogin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    res.status(200).json({ message: "Login successful." });
  } catch (error) {
    res.status(400).json({ message: "Error logging in." });
  }
});


module.exports = router;