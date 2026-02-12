const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");

// GET /books - get all books
router.get("/", bookController.getAllBooks);

// GET /books/:id - get book by ID
router.get("/:id", bookController.getBookById);

// POST /books - create new book
router.post("/", bookController.createBook);

// PUT /books/:id - update book
router.put("/:id", bookController.updateBook);

// DELETE /books/:id - delete book
router.delete("/:id", bookController.deleteBook);

module.exports = router;
