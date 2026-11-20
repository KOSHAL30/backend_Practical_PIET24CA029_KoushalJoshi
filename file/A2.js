// Task 2 : Student Portal with Login and Protected Routes
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORTAL_PORT || 5000;

// basic security
app.use(helmet());
app.use(cors());

// 100 requests per 15 min from one IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: "Too many requests, please try again after 15 minutes" },
});
app.use(limiter);

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.send("Student Portal API is running");
});

app.use("/", authRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

mongoose
  .connect(process.env.PORTAL_MONGO_URL)
  .then(() => {
    console.log("MongoDB connected (student portal)");
    app.listen(PORT, () => {
      console.log(`Student portal running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed:", err.message);
  });
