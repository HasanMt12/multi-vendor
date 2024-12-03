const jwt = require('jsonwebtoken');
const createError = require('./createError');

const createToken = (payload) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    return token;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = createToken;
