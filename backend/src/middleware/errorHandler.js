const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // If headers already sent, delegate to default Express error handler
  if (res.headersSent) {
    return next(err);
  }

  // Handle AppError instances
  if (err.isOperational) {
    return res.status(err.statusCode || 500).json({
      status: 'error',
      message: err.message
    });
  }

  // Handle other errors
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};

module.exports = errorHandler; 