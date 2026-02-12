const prisma = require("../prisma/client");

// Validate book id is number
const parseId = (id) => {
  const parsed = Number.parseInt(id, 10);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    const error = new Error("Invalid book id");
    error.statusCode = 400;
    throw error;
  }
  return parsed;
};

// Validate data for create book
const validateCreatePayload = (data) => {
  const title = data?.title;
  const author = data?.author;
  const genre = data?.genre;
  const publishedYear =
    data?.publishedYear === "" || data?.publishedYear === undefined
      ? null
      : data?.publishedYear;
  if (!title) {
    const error = new Error("Title is required");
    error.statusCode = 400;
    throw error;
  }
  if (!author) {
    const error = new Error("Author is required");
    error.statusCode = 400;
    throw error;
  }
  if (!genre) {
    const error = new Error("Genre is required");
    error.statusCode = 400;
    throw error;
  }
  if (publishedYear === null) {
    const error = new Error("Published year is required");
    error.statusCode = 400;
    throw error;
  }
  return {
    title,
    author,
    genre: genre || null,
    publishedYear,
  };
};

// Validate data for update book
const validateUpdatePayload = (data) => {
  const payload = {};
  if ("title" in data) {
    payload.title = data?.title;
  }
  if ("author" in data) {
    payload.author = data?.author;
  }
  if ("genre" in data) {
    payload.genre = data?.genre || null;
  }
  if ("publishedYear" in data) {
    payload.publishedYear =
      data?.publishedYear === "" || data?.publishedYear === undefined
        ? null
        : data?.publishedYear;
  }
  if (Object.keys(payload).length === 0) {
    const error = new Error("No valid fields to update");
    error.statusCode = 400;
    throw error;
  }
  return payload;
};

// To find active book
const findActiveBookOrThrow = async (id) => {
  const book = await prisma.book.findFirst({
    where: { id, isDelete: false },
  });
  if (!book) {
    const error = new Error("Book not found");
    error.statusCode = 404;
    throw error;
  }
  return book;
};

// To get all books
const getAllBooks = async () => {
  const books = await prisma.book.findMany({
    where: { isDelete: false },
    orderBy: { id: "desc" },
  });
  return books;
};

// To get book by ID
const getBookById = async (id) => {
  const bookId = parseId(id);
  return findActiveBookOrThrow(bookId);
};

// To create new book
const createBook = async (bookData) => {
  const data = validateCreatePayload(bookData);
  const book = await prisma.book.create({ data });
  return book;
};

// To update book
const updateBook = async (id, bookData) => {
  const bookId = parseId(id);
  await findActiveBookOrThrow(bookId);
  const data = validateUpdatePayload(bookData || {});
  const book = await prisma.book.update({
    where: { id: bookId },
    data,
  });
  return book;
};

// To delete book
const deleteBook = async (id) => {
  const bookId = parseId(id);
  await findActiveBookOrThrow(bookId);
  const deleted = await prisma.book.update({
    where: { id: bookId },
    data: { isDelete: true, deletedAt: new Date() },
  });
  return { message: "Book deleted", bookId: deleted.id };
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
