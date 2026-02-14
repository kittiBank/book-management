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

// Validate data for creating a book.
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

// Validate data for updating a book.
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

// Find active book by id
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

// Normalize pagination parameters with defaults.
const parsePagination = (query = {}) => {
  const parsedPage = Number.parseInt(query.page, 10);
  const parsedLimit = Number.parseInt(query.limit, 10);
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const limit =
    Number.isInteger(parsedLimit) && parsedLimit > 0
      ? Math.min(parsedLimit, 100)
      : 10;
  return { page, limit, skip: (page - 1) * limit };
};

// Get all active books with pagination, or all if no page/limit specified.
const getAllBooks = async (query = {}) => {
  const hasPagination = query.page !== undefined || query.limit !== undefined;
  const where = { isDelete: false };
  if (!hasPagination) {
    const books = await prisma.book.findMany({
      where,
      orderBy: { id: "desc" },
    });
    return {
      data: books,
      meta: {
        total: books.length,
        page: 1,
        limit: books.length,
        totalPages: 1,
      },
    };
  }

  // specify pagination parameters with defaults
  const { page, limit, skip } = parsePagination(query);
  const [books, total] = await Promise.all([
    prisma.book.findMany({
      where,
      orderBy: { id: "desc" },
      skip,
      take: limit,
    }),
    prisma.book.count({ where }),
  ]);
  const totalPages = Math.ceil(total / limit);
  return {
    data: books,
    meta: { page, limit, total, totalPages },
  };
};

// Get book by id.
const getBookById = async (id) => {
  const bookId = parseId(id);
  return findActiveBookOrThrow(bookId);
};

// Create a new book.
const createBook = async (bookData) => {
  const data = validateCreatePayload(bookData);
  const book = await prisma.book.create({ data });
  return book;
};

// Update book by id.
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

// Soft delete book by id.
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
