const bcrypt = require('bcrypt');
const createCustomer = require('../../../../services/customer/createCustomer');
const customerByProperty = require('../../../../services/customer/customerByProperty');

const customerRegister = async (req, res, next) => {
  try {
    const { name, email, password, phone, photo } = req.body;

    const isExistsCustomer = await customerByProperty('email', email);

    if (isExistsCustomer) {
      return res.status(400).json({ status: 400, error: 'Email already exists' });
    }

    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);
    // create customer
    const newCustomer = await createCustomer({ name, email, password: hashedPassword, phone, photo });
    // remove sensitive data & unwanted fields
    delete newCustomer.password;
    delete newCustomer.verifiedEmail;
    delete newCustomer.address;
    delete newCustomer.lastOrderId;
    delete newCustomer.orderCount;
    delete newCustomer.tags;
    delete newCustomer.notes;
    delete newCustomer.totalSpent;
    delete newCustomer.points;
    delete newCustomer.pointsAmount;
    delete newCustomer.createdAt;
    delete newCustomer.updatedAt;
    delete newCustomer.__v;
    res.status(201).json({
      status: 201,
      message: 'Customer registered successfully',
      data: newCustomer,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = customerRegister;
