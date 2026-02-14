import type { LoginCredentials, LoginResponse, User } from "@/types";
import { mockUser, mockCredentials, mockToken } from "@/mocks";

// Flag use mock data
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

// API Base URL from .env
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// local storage keys
const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

// Delay for mock api calls
const simulateDelay = (ms: number = 500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Auth Service
export const authService = {
  // login user
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    if (USE_MOCK) {
      await simulateDelay();

      // Validate username and password
      if (
        credentials.username === mockCredentials.username &&
        credentials.password === mockCredentials.password
      ) {
        // Store token in localStorage
        localStorage.setItem(TOKEN_KEY, mockToken);
        localStorage.setItem(USER_KEY, JSON.stringify(mockUser));

        return {
          success: true,
          token: mockToken,
          user: mockUser,
        };
      }

      return {
        success: false,
        message: "Invalid username or password",
      };
    }

    // call auth api
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Store token in localStorage
        localStorage.setItem(TOKEN_KEY, data.token);
        if (data.user) {
          localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        }

        return {
          success: true,
          token: data.token,
          user: data.user,
        };
      }

      return {
        success: false,
        message: data.message || "Login failed",
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: "Network error. Please try again.",
      };
    }
  },

  // logout user
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  getUser(): User | null {
    const userStr = localStorage.getItem(USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr) as User;
      } catch {
        return null;
      }
    }
    return null;
  },

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  },
};
