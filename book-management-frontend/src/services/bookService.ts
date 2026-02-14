import axios from "axios";
import type {
  Book,
  BookFormData,
  ApiResponse,
  PaginatedResponse,
  BookQueryParams,
} from "@/types";
import { mockBooks, getNextBookId } from "@/mocks";
import { authService } from "./authService";

// Flag use mock data or API
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

// API Base URL from .env
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

let localBooks = [...mockBooks];

// Delay for mock api calls
const simulateDelay = (ms: number = 500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Create axios instance with auth header
const getAuthHeaders = () => {
  const token = authService.getToken();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// Mapping form data to API payload
const toApiPayload = (bookData: BookFormData) => ({
  title: bookData.title,
  author: bookData.author,
  publishedYear: bookData.published_year,
  genre: bookData.genre,
});

// Transform backend API response to frontend Book type
const fromApiBook = (apiBook: any): Book => ({
  id: apiBook.id,
  title: apiBook.title,
  author: apiBook.author,
  published_year: apiBook.publishedYear ?? apiBook.published_year ?? null,
  genre: apiBook.genre ?? null,
  created_at: apiBook.createdAt,
  updated_at: apiBook.updatedAt,
});

// Book Service
export const bookService = {
  // fetch all books (with pagination)
  async getAllBooks(
    params: BookQueryParams = {},
  ): Promise<PaginatedResponse<Book>> {
    if (USE_MOCK) {
      await simulateDelay();
      const page = params.page || 1;
      const limit = params.limit || localBooks.length;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedBooks = localBooks.slice(startIndex, endIndex);

      return {
        success: true,
        data: paginatedBooks,
        pagination: {
          page,
          limit,
          total: localBooks.length,
          totalPages: Math.ceil(localBooks.length / limit),
        },
      };
    }

    // Fetch books from api
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append("page", params.page.toString());
      if (params.limit) queryParams.append("limit", params.limit.toString());

      const url = `${API_BASE_URL}/books${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
      const response = await axios.get(url, {
        headers: getAuthHeaders(),
      });

      const booksRaw = response.data.data || response.data;
      return {
        success: true,
        data: Array.isArray(booksRaw) ? booksRaw.map(fromApiBook) : [],
        pagination: response.data.pagination,
      };
    } catch (error: unknown) {
      console.error("Get all books error:", error);
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data?.message || "Failed to fetch books",
        };
      }
      return { success: false, error: "Failed to fetch books" };
    }
  },
  // fetch book by id
  async getBookById(id: number): Promise<ApiResponse<Book>> {
    if (USE_MOCK) {
      await simulateDelay();
      const book = localBooks.find((b) => b.id === id);

      if (book) {
        return { success: true, data: book };
      }
      return { success: false, error: "Book not found" };
    }

    // Real API call
    try {
      const response = await axios.get(`${API_BASE_URL}/books/${id}`, {
        headers: getAuthHeaders(),
      });

      const bookRaw = response.data.data || response.data;
      return {
        success: true,
        data: fromApiBook(bookRaw),
      };
    } catch (error: unknown) {
      console.error("Get book by id error:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return { success: false, error: "Book not found" };
        }
        return {
          success: false,
          error: error.response?.data?.message || "Failed to fetch book",
        };
      }
      return { success: false, error: "Failed to fetch book" };
    }
  },

  // create a new book
  async createBook(bookData: BookFormData): Promise<ApiResponse<Book>> {
    if (USE_MOCK) {
      await simulateDelay();
      const now = new Date().toISOString();
      const newBook: Book = {
        id: getNextBookId(localBooks),
        ...bookData,
        created_at: now,
        updated_at: now,
      };
      localBooks.push(newBook);
      return {
        success: true,
        data: newBook,
        message: "Book created successfully",
      };
    }

    // Call API to create book
    try {
      const payload = toApiPayload(bookData);
      const response = await axios.post(`${API_BASE_URL}/books`, payload, {
        headers: getAuthHeaders(),
      });

      const bookRaw = response.data.data || response.data;
      return {
        success: true,
        data: fromApiBook(bookRaw),
        message: "Book created successfully",
      };
    } catch (error: unknown) {
      console.error("Create book error:", error);
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data?.message || "Failed to create book",
        };
      }
      return { success: false, error: "Failed to create book" };
    }
  },

  // update an existing book
  async updateBook(
    id: number,
    bookData: BookFormData,
  ): Promise<ApiResponse<Book>> {
    if (USE_MOCK) {
      await simulateDelay();
      const index = localBooks.findIndex((b) => b.id === id);

      if (index === -1) {
        return { success: false, error: "Book not found" };
      }

      const existingBook = localBooks[index]!;
      const updatedBook: Book = {
        id: existingBook.id,
        title: bookData.title,
        author: bookData.author,
        published_year: bookData.published_year,
        genre: bookData.genre,
        created_at: existingBook.created_at,
        updated_at: new Date().toISOString(),
      };
      localBooks[index] = updatedBook;
      return {
        success: true,
        data: updatedBook,
        message: "Book updated successfully",
      };
    }

    // Real API call
    try {
      const payload = toApiPayload(bookData);
      const response = await axios.put(`${API_BASE_URL}/books/${id}`, payload, {
        headers: getAuthHeaders(),
      });

      const bookRaw = response.data.data || response.data;
      return {
        success: true,
        data: fromApiBook(bookRaw),
        message: "Book updated successfully",
      };
    } catch (error: unknown) {
      console.error("Update book error:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return { success: false, error: "Book not found" };
        }
        return {
          success: false,
          error: error.response?.data?.message || "Failed to update book",
        };
      }
      return { success: false, error: "Failed to update book" };
    }
  },

  // delete a book
  async deleteBook(id: number): Promise<ApiResponse<null>> {
    if (USE_MOCK) {
      await simulateDelay();
      const index = localBooks.findIndex((b) => b.id === id);

      if (index === -1) {
        return { success: false, error: "Book not found" };
      }

      localBooks.splice(index, 1);
      return { success: true, message: "Book deleted successfully" };
    }

    // Real API call
    try {
      await axios.delete(`${API_BASE_URL}/books/${id}`, {
        headers: getAuthHeaders(),
      });

      return { success: true, message: "Book deleted successfully" };
    } catch (error: unknown) {
      console.error("Delete book error:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return { success: false, error: "Book not found" };
        }
        return {
          success: false,
          error: error.response?.data?.message || "Failed to delete book",
        };
      }
      return { success: false, error: "Failed to delete book" };
    }
  },

  resetMockData(): void {
    localBooks = [...mockBooks];
  },
};
