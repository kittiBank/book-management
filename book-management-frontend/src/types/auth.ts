// define type for authn
export interface User {
  id: number;
  username: string;
  email: string;
}

// define type login
export interface LoginCredentials {
  username: string;
  password: string;
}

// define type login response
export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}

// define type for auth state
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}
