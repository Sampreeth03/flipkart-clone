// Sends a consistent JSON response shape across all endpoints
// Usage: sendSuccess(res, data, "Products fetched", 200)
//        sendError(res, "Not found", 404)

const sendSuccess = (res, data = null, message = "Success", statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const sendError = (res, message = "Something went wrong", statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
  });
};

module.exports = { sendSuccess, sendError };