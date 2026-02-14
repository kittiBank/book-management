import type { User } from '@/types';

// Mock data for user authentication
export const mockUser: User = {
  id: 1,
  username: 'admin',
  email: 'admin@bookmanagement.com',
  role: 'admin',
};

export const mockCredentials = {
  username: 'admin',
  password: 'password123'
};

export const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiJ9.mock-token';
