const express = require("express");
const app = express();
const bookRoutes = require("./routes/book.routes");

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

// API Routes
app.use("/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
