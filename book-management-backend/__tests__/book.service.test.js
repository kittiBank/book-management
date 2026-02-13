const prisma = require("../prisma/client");
const bookService = require("../services/book.service");

// Use mock data client
jest.mock("../prisma/client", () => ({
  book: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    count: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

// To test book service CRUD functions
describe("book.service CRUD", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllBooks", () => {
    it("returns active books", async () => {
      const books = [{ id: 2 }, { id: 1 }];
      prisma.book.findMany.mockResolvedValue(books);
      prisma.book.count.mockResolvedValue(2);

      const result = await bookService.getAllBooks({ page: "1", limit: "10" });

      expect(prisma.book.findMany).toHaveBeenCalledWith({
        where: { isDelete: false },
        orderBy: { id: "desc" },
        skip: 0,
        take: 10,
      });
      expect(prisma.book.count).toHaveBeenCalledWith({
        where: { isDelete: false },
      });
      expect(result).toEqual({
        data: books,
        meta: { page: 1, limit: 10, total: 2, totalPages: 1 },
      });
    });
  });

  describe("getBookById", () => {
    it("throws on invalid id", async () => {
      await expect(bookService.getBookById("abc")).rejects.toMatchObject({
        message: "Invalid book id",
        statusCode: 400,
      });
    });

    it("throws when book not found", async () => {
      prisma.book.findFirst.mockResolvedValue(null);

      await expect(bookService.getBookById("10")).rejects.toMatchObject({
        message: "Book not found",
        statusCode: 404,
      });
    });

    it("returns book when found", async () => {
      const book = { id: 10, title: "Book" };
      prisma.book.findFirst.mockResolvedValue(book);

      const result = await bookService.getBookById("10");

      expect(prisma.book.findFirst).toHaveBeenCalledWith({
        where: { id: 10, isDelete: false },
      });
      expect(result).toEqual(book);
    });
  });

  describe("createBook", () => {
    it("validates required fields", async () => {
      await expect(bookService.createBook({})).rejects.toMatchObject({
        message: "Title is required",
        statusCode: 400,
      });

      await expect(
        bookService.createBook({ title: "T" }),
      ).rejects.toMatchObject({
        message: "Author is required",
        statusCode: 400,
      });

      await expect(
        bookService.createBook({ title: "T", author: "A" }),
      ).rejects.toMatchObject({
        message: "Genre is required",
        statusCode: 400,
      });

      await expect(
        bookService.createBook({
          title: "T",
          author: "A",
          genre: "G",
          publishedYear: "",
        }),
      ).rejects.toMatchObject({
        message: "Published year is required",
        statusCode: 400,
      });
    });

    it("creates a book", async () => {
      const payload = {
        title: "T",
        author: "A",
        genre: "G",
        publishedYear: 2024,
      };
      const created = { id: 1, ...payload };
      prisma.book.create.mockResolvedValue(created);

      const result = await bookService.createBook(payload);

      expect(prisma.book.create).toHaveBeenCalledWith({ data: payload });
      expect(result).toEqual(created);
    });
  });

  describe("updateBook", () => {
    it("throws on invalid id", async () => {
      await expect(bookService.updateBook("0", {})).rejects.toMatchObject({
        message: "Invalid book id",
        statusCode: 400,
      });
    });

    it("throws when no fields to update", async () => {
      prisma.book.findFirst.mockResolvedValue({ id: 1 });

      await expect(bookService.updateBook("1", {})).rejects.toMatchObject({
        message: "No valid fields to update",
        statusCode: 400,
      });
    });

    it("throws when book not found", async () => {
      prisma.book.findFirst.mockResolvedValue(null);

      await expect(
        bookService.updateBook("2", { title: "New" }),
      ).rejects.toMatchObject({
        message: "Book not found",
        statusCode: 404,
      });
    });

    it("updates a book", async () => {
      prisma.book.findFirst.mockResolvedValue({ id: 3 });
      prisma.book.update.mockResolvedValue({ id: 3, title: "New" });

      const result = await bookService.updateBook("3", { title: "New" });

      expect(prisma.book.update).toHaveBeenCalledWith({
        where: { id: 3 },
        data: { title: "New" },
      });
      expect(result).toEqual({ id: 3, title: "New" });
    });
  });

  describe("deleteBook", () => {
    it("throws on invalid id", async () => {
      await expect(bookService.deleteBook("-1")).rejects.toMatchObject({
        message: "Invalid book id",
        statusCode: 400,
      });
    });

    it("throws when book not found", async () => {
      prisma.book.findFirst.mockResolvedValue(null);

      await expect(bookService.deleteBook("5")).rejects.toMatchObject({
        message: "Book not found",
        statusCode: 404,
      });
    });

    it("soft-deletes a book", async () => {
      prisma.book.findFirst.mockResolvedValue({ id: 6 });
      prisma.book.update.mockResolvedValue({ id: 6 });

      const result = await bookService.deleteBook("6");

      expect(prisma.book.update).toHaveBeenCalledWith({
        where: { id: 6 },
        data: { isDelete: true, deletedAt: expect.any(Date) },
      });
      expect(result).toEqual({ message: "Book deleted", bookId: 6 });
    });
  });
});
