const prisma = require("../prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Get JWT secret from env.
const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    const error = new Error("JWT secret not configured");
    error.statusCode = 500;
    throw error;
  }
  return secret;
};

// Get JWT expiration from env.
const getJwtExpiresIn = () => process.env.JWT_EXPIRES_IN || "1h";

// Validate username and password
const validateCredentials = (data) => {
  const username = (data?.username || "").trim();
  const password = data?.password || "";
  if (!username) {
    const error = new Error("Username is required");
    error.statusCode = 400;
    throw error;
  }
  if (!password) {
    const error = new Error("Password is required");
    error.statusCode = 400;
    throw error;
  }
  return { username, password };
};

// Register a new user with hashed password.
const register = async (payload) => {
  const { username, password } = validateCredentials(payload);
  const existing = await prisma.user.findUnique({
    where: { username },
  });
  if (existing) {
    const error = new Error("Username already exists");
    error.statusCode = 409;
    throw error;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { username, password: hashedPassword },
    select: { id: true, username: true, createdAt: true },
  });
  return user;
};

// Authenticate user and return JWT token.
const login = async (payload) => {
  const { username, password } = validateCredentials(payload);
  const user = await prisma.user.findUnique({
    where: { username },
  });
  if (!user) {
    const error = new Error("Invalid username or password");
    error.statusCode = 401;
    throw error;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid username or password");
    error.statusCode = 401;
    throw error;
  }
  const token = jwt.sign(
    { userId: user.id, username: user.username, role: user.role},
    getJwtSecret(),
    { expiresIn: getJwtExpiresIn() },
  );
  return {
    token,
    user: { id: user.id, username: user.username, role: user.role },
  };
};

module.exports = {
  register,
  login,
};
