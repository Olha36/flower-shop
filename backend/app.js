require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const flowersRouter = require("./routes/flowers");

const app = express();

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL);
    isConnected = true;
    console.log("Connected to database");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}

app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    res.status(500).json({ message: "Database connection failed" });
  }
});

app.get("/", (_req, res) => {
  res.json({ message: "Flower shop backend is running" });
});

app.use("/flowers", flowersRouter);

module.exports = app;
