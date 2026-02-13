// Console log for request, status code, and response time
const logRequests = (req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const durationMs = Date.now() - start;
    const message = `${req.method} ${req.originalUrl} ${res.statusCode} ${durationMs}ms`;
    console.log(message);
  });
  next();
};

module.exports = {
  logRequests,
};
