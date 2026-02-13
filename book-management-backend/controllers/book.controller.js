// Manage book-related HTTP requests and responses.
const bookService = require("../services/book.service");

const getAllBooks = async (req, res, next) => {
  try {
    const result = await bookService.getAllBooks(req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const result = await bookService.getBookById(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createBook = async (req, res, next) => {
  try {
    const result = await bookService.createBook(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const result = await bookService.updateBook(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const result = await bookService.deleteBook(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
