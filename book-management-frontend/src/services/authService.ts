import type { LoginCredentials, LoginResponse, User } from "@/types";
import { mockUser, mockCredentials, mockToken } from "@/mocks";

// Flag use mock data
const USE_MOCK = true;

// const API_BASE_URL = '/api/auth';

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

    // TODO: Implement real API call
    // const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    // if (response.data.success) {
    //   localStorage.setItem(TOKEN_KEY, response.data.token);
    //   localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
    // }
    // return response.data;

    return { success: false, message: "API not implemented" };
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

  // validate token is valid
  async validateToken(): Promise<boolean> {
    if (USE_MOCK) {
      // In mock mode, just check if token exists
      return this.isAuthenticated();
    }

    // TODO: Implement real API call to validate token
    // try {
    //   const response = await axios.get(`${API_BASE_URL}/validate`, {
    //     headers: { Authorization: `Bearer ${this.getToken()}` }
    //   });
    //   return response.data.valid;
    // } catch {
    //   return false;
    // }

    return false;
  },
};
