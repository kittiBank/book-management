const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// GET /books - get all books
router.get("/", authMiddleware.authenticate, bookController.getAllBooks);

// GET /books/:id - get book by ID
router.get("/:id", authMiddleware.authenticate, bookController.getBookById);

// POST /books - create new book
router.post("/", authMiddleware.authenticate, bookController.createBook);

// PUT /books/:id - update book
router.put("/:id", authMiddleware.authenticate, bookController.updateBook);

// DELETE /books/:id - delete book
router.delete("/:id", authMiddleware.authenticate, bookController.deleteBook);

module.exports = router;
