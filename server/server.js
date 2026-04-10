// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err));

// app.use("/api/auth", require("./routes/auth"));

// app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));

// app.get("/api/test", async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// });
















import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import paymentRoutes from "./routes/payment.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();

function parseCorsOrigins() {
  const fromEnv = process.env.CORS_ORIGINS;
  if (fromEnv) {
    return fromEnv.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://subha29042000.github.io",
  ];
}

// Middleware — allow GitHub Pages + local Vite; extend with CORS_ORIGINS in .env
app.use(
  cors({
    origin(origin, callback) {
      const allowed = parseCorsOrigins();
      if (!origin || allowed.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
  })
);
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);       // Authentication (register/login)
app.use("/api/payment", paymentRoutes); // Razorpay sandbox payments



// Example test route
app.get("/api/test", async (req, res) => {
  try {
    // Import your User model at the top if you want to query users
    // const users = await User.find();
    res.json({ msg: "Test route working!" });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching test data" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
