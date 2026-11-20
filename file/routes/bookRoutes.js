const express = require("express");
const Book = require("../models/Book");

const router = express.Router();

// POST /books - add a book
router.post("/", async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
});

// GET /books - get all books
router.get("/", async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
});

// GET /books/:id - get one book
router.get("/:id", async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
});

// PUT /books/:id - update a book
router.put("/:id", async (req, res, next) => {
  try {
    // runValidators so that price min 1 is checked on update also
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
});

// DELETE /books/:id - delete a book
router.delete("/:id", async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
