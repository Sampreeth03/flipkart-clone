// Global error handler — mounted last in app.js
// Catches any error passed via next(err) from controllers

const { sendError } = require("../utils/response");

const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.url} →`, err.message);

  // MySQL duplicate entry
  if (err.code === "ER_DUP_ENTRY") {
    return sendError(res, "Duplicate entry — resource already exists.", 409);
  }

  // MySQL foreign key violation
  if (err.code === "ER_NO_REFERENCED_ROW_2") {
    return sendError(res, "Referenced record does not exist.", 400);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return sendError(res, message, statusCode);
};

module.exports = errorHandler;