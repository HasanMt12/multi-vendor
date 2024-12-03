const bcrypt = require('bcrypt');
const customerByProperty = require('../../../../services/customer/customerByProperty');
const createToken = require('../../../../utils/createToken');

const customerLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const customer = await customerByProperty('email', email);
    if (!customer) {
      return res.status(404).json({ status: 404, error: 'Customer not found' });
    }
    // compare password
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(401).json({ status: 401, error: 'Invalid password' });
    }
    // remove sensitive data & unwanted fields
    delete customer.password;
    delete customer.verifiedEmail;
    delete customer.address;
    delete customer.lastOrderId;
    delete customer.orderCount;
    delete customer.tags;
    delete customer.notes;
    delete customer.totalSpent;
    delete customer.points;
    delete customer.pointsAmount;
    delete customer.createdAt;
    delete customer.updatedAt;
    delete customer.__v;

    // create token
    const token = await createToken({ email: customer.email });

    // set token in cookie
    res
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: process.env.JWT_EXPIRES_IN,
      })
      .json({ status: 200, message: 'Customer logged in successfully', data: customer });
  } catch (error) {
    next(error);
  }
};

module.exports = customerLogin;
