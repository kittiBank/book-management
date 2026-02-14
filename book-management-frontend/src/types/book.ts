// type definitions for Book entity
export interface Book {
  id: number;
  title: string;
  author: string;
  published_year: number | null;
  genre: string | null;
  created_at: string;
  updated_at: string;
}

// form data for create, update book
export interface BookFormData {
  title: string;
  author: string;
  published_year: number | null;
  genre: string | null;
}

// API response format
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
