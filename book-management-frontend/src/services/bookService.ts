import type { Book, BookFormData, ApiResponse } from "@/types";
import { mockBooks, getNextBookId } from "@/mocks";

// Flag use mock data or real API
const USE_MOCK = true;

// const API_BASE_URL = "/api/books";

let localBooks = [...mockBooks];

// Delay for mock api calls
const simulateDelay = (ms: number = 500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Book Service
export const bookService = {
  // fetch all books
  async getAllBooks(): Promise<ApiResponse<Book[]>> {
    if (USE_MOCK) {
      await simulateDelay();
      return {
        success: true,
        data: [...localBooks],
      };
    }

    // TODO: Implement real API call
    // const response = await axios.get(API_BASE_URL, {
    //   headers: { Authorization: `Bearer ${getToken()}` }
    // });
    // return response.data;

    return { success: false, error: "API not implemented" };
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

    // TODO: Implement real API call
    // const response = await axios.get(`${API_BASE_URL}/${id}`, {
    //   headers: { Authorization: `Bearer ${getToken()}` }
    // });
    // return response.data;

    return { success: false, error: "API not implemented" };
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

    // TODO: Implement real API call
    // const response = await axios.post(API_BASE_URL, bookData, {
    //   headers: { Authorization: `Bearer ${getToken()}` }
    // });
    // return response.data;

    return { success: false, error: "API not implemented" };
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

    // TODO: Implement real API call
    // const response = await axios.put(`${API_BASE_URL}/${id}`, bookData, {
    //   headers: { Authorization: `Bearer ${getToken()}` }
    // });
    // return response.data;

    return { success: false, error: "API not implemented" };
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

    // TODO: Implement real API call
    // const response = await axios.delete(`${API_BASE_URL}/${id}`, {
    //   headers: { Authorization: `Bearer ${getToken()}` }
    // });
    // return response.data;

    return { success: false, error: "API not implemented" };
  },

  resetMockData(): void {
    localBooks = [...mockBooks];
  },
};
