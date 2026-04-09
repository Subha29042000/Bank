const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

// Register
// routes/auth.js
router.post("/register", async (req, res) => {
  const username = req.body?.username?.trim();
  const email = req.body?.email?.trim().toLowerCase();
  const password = req.body?.password;

  if (!username || username.length < 3) {
    return res.status(400).json({ msg: "Username must be at least 3 characters" });
  }
  if (!emailRegex.test(email || "")) {
    return res.status(400).json({ msg: "Please enter a valid email" });
  }
  if (!passwordRegex.test(password || "")) {
    return res.status(400).json({ msg: "Password must be 6+ chars with letters and numbers" });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ msg: "User with email or username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const email = req.body?.email?.trim().toLowerCase();
  const password = req.body?.password;
  if (!emailRegex.test(email || "") || !password) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Logout (stateless confirmation endpoint)
router.post("/logout", auth, async (req, res) => {
  return res.json({ msg: "Logout successful" });
});

// Read profile
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ msg: "Server error" });
  }
});

// Update profile
router.put("/me", auth, async (req, res) => {
  try {
    const updates = {};
    const username = req.body?.username?.trim();
    const email = req.body?.email?.trim().toLowerCase();
    const password = req.body?.password;

    if (username) {
      if (username.length < 3) return res.status(400).json({ msg: "Username must be at least 3 characters" });
      const exists = await User.findOne({ username, _id: { $ne: req.user.id } });
      if (exists) return res.status(400).json({ msg: "Username already taken" });
      updates.username = username;
    }

    if (email) {
      if (!emailRegex.test(email)) return res.status(400).json({ msg: "Please enter a valid email" });
      const exists = await User.findOne({ email, _id: { $ne: req.user.id } });
      if (exists) return res.status(400).json({ msg: "Email already in use" });
      updates.email = email;
    }

    if (password) {
      if (!passwordRegex.test(password)) {
        return res.status(400).json({ msg: "Password must be 6+ chars with letters and numbers" });
      }
      updates.password = await bcrypt.hash(password, 10);
    }

    const updated = await User.findByIdAndUpdate(req.user.id, { $set: updates }, { new: true }).select("-password");
    return res.json({ msg: "Profile updated", user: updated });
  } catch (err) {
    return res.status(500).json({ msg: "Server error" });
  }
});

// Delete profile
router.delete("/me", auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    return res.json({ msg: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
