// Task 1 : Library Book Management API
// (this file is the server.js for task 1)
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.send("Library Book Management API is running");
});

app.use("/books", bookRoutes);

// for any route that does not exist
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed:", err.message);
  });
