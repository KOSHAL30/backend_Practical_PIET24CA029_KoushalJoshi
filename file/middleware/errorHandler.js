// common error handler (has to be added after all routes)
const errorHandler = (err, req, res, next) => {
  console.log("Error:", err.message);

  // mongoose validation error (required field missing, price < 1 etc)
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  // wrong id format like /books/123
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid id" });
  }

  // invalid json in body
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Invalid JSON" });
  }

  res.status(err.status || 500).json({ message: err.message || "Server error" });
};

module.exports = errorHandler;
