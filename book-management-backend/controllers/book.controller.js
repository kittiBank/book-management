// Manage requests and responses without business logic
const bookService = require("../services/book.service");

const getAllBooks = async (req, res) => {
  try {
    const result = await bookService.getAllBooks();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const result = await bookService.getBookById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    const result = await bookService.createBook(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const result = await bookService.updateBook(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const result = await bookService.deleteBook(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
