const logger = (req, res, next) => {
  const { method, url, headers, body } = req;
  const { statusCode } = res;
  const log = {
    headers,
    body,
    method,
    url,
    statusCode,
  };
  console.log(log);
  next();
};

module.exports = logger;
