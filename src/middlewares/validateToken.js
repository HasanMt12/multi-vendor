const jwt = require('jsonwebtoken');
const adminByProperty = require('../services/admin/adminByProperty');
const merchantByProperty = require('../services/merchant/merchantByProperty');
const customerByProperty = require('../services/customer/customerByProperty');

const validateToken = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized, please login',
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = (await adminByProperty('email', decoded.email)) || (await merchantByProperty('email', decoded.email)) || (await customerByProperty('email', decoded.email));

    if (!user) {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized, Invalid token',
      });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateToken;
