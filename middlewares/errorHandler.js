import createError from "http-errors";

const notFound = (req, res, next) => {
  next(createError(404, "URL not found"));
};

const errorStack = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

export { notFound, errorStack };
