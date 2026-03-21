require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// MongoDB Atlas credentials and DB name

// Connect to MongoDB with options for modern drivers
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

// Event listeners
db.on("error", (error) => console.error("Database connection error:", error));
db.once("open", () => console.log("Connected to database"));

app.use(express.json()); // Middleware to parse JSON bodies

const flowersRouter = require("./routes/flowers");

app.use('/flowers', flowersRouter)

// Start Express server
app.listen(3000, () => console.log("Server is running on port 3000"));
