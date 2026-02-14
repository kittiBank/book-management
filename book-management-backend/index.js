const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const bookRoutes = require("./routes/book.routes");
const authRoutes = require("./routes/auth.routes");
const loggerMiddleware = require("./middlewares/logger.middleware");
const errorMiddleware = require("./middlewares/error.middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware.logRequests);

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Swagger setup
const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book Management API",
      version: "1.0.0",
      description: "API for managing books",
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./docs/*.js"],
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use("/books", bookRoutes);
app.use("/auth", authRoutes);

// Error handling middleware
app.use(errorMiddleware.errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
