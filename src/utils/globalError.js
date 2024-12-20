// eslint-disable-next-line no-unused-vars
const globalError = (err, _req, res, _next) => {
  const error = err.message ?? 'Server Internal Error';
  const status = err.status ?? 500;
  res.status(status).json({ status, error });
};

module.exports = globalError;
