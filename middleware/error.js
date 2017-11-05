module.exports = (err, req, res, next) => {
  res.json({
    success: false,
    error: err.message || 'Internal server error',
  });

  next();
};
