import type { Book } from "@/types";

// Mock data for books
export const mockBooks: Book[] = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    published_year: 2008,
    genre: "Programming",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    title: "The Pragmatic Programmer",
    author: "David Thomas, Andrew Hunt",
    published_year: 2019,
    genre: "Programming",
    created_at: "2024-01-16T14:20:00Z",
    updated_at: "2024-01-16T14:20:00Z",
  },
  {
    id: 3,
    title: "Design Patterns",
    author: "Gang of Four",
    published_year: 1994,
    genre: "Software Engineering",
    created_at: "2024-01-17T09:15:00Z",
    updated_at: "2024-01-17T09:15:00Z",
  },
  {
    id: 4,
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    published_year: 2008,
    genre: "Programming",
    created_at: "2024-01-18T11:45:00Z",
    updated_at: "2024-01-18T11:45:00Z",
  },
  {
    id: 5,
    title: "Refactoring",
    author: "Martin Fowler",
    published_year: 2018,
    genre: "Software Engineering",
    created_at: "2024-01-19T08:00:00Z",
    updated_at: "2024-01-19T08:00:00Z",
  },
  {
    id: 6,
    title: "Vue.js 3 Cookbook",
    author: "Heitor Ramon Ribeiro",
    published_year: 2020,
    genre: "Web Development",
    created_at: "2024-01-20T16:30:00Z",
    updated_at: "2024-01-20T16:30:00Z",
  },
  {
    id: 7,
    title: "TypeScript Handbook",
    author: "Microsoft",
    published_year: 2021,
    genre: "Programming",
    created_at: "2024-01-21T13:00:00Z",
    updated_at: "2024-01-21T13:00:00Z",
  },
  {
    id: 8,
    title: "Node.js Design Patterns",
    author: "Mario Casciaro",
    published_year: 2020,
    genre: "Backend Development",
    created_at: "2024-01-22T10:20:00Z",
    updated_at: "2024-01-22T10:20:00Z",
  },
    {
    id: 8,
    title: "Node.js Design Patterns",
    author: "Mario Casciaro",
    published_year: 2020,
    genre: "Backend Development",
    created_at: "2024-01-22T10:20:00Z",
    updated_at: "2024-01-22T10:20:00Z",
  },
    {
    id: 8,
    title: "Node.js Design Patterns",
    author: "Mario Casciaro",
    published_year: 2020,
    genre: "Backend Development",
    created_at: "2024-01-22T10:20:00Z",
    updated_at: "2024-01-22T10:20:00Z",
  },
    {
    id: 8,
    title: "Node.js Design Patterns",
    author: "Mario Casciaro",
    published_year: 2020,
    genre: "Backend Development",
    created_at: "2024-01-22T10:20:00Z",
    updated_at: "2024-01-22T10:20:00Z",
  },
];

// Generate next book id 
export const getNextBookId = (books: Book[]): number => {
  if (books.length === 0) return 1;
  return Math.max(...books.map((book) => book.id)) + 1;
};
