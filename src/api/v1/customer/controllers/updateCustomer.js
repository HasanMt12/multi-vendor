const bcrypt = require('bcrypt');
const updateCustomerService = require('../../../../services/customer/updateCustomer');

const updateCustomer = async (req, res, next) => {
  try {
    const { user } = req;
    const { name, password, phone, photo, address } = req.body;
    if (user.role !== 'customer') {
      return res.status(403).json({ message: 'Forbidden access' });
    }
    let hashedPassword;
    if (password) hashedPassword = await bcrypt.hash(password, 10);
    const updatedCustomer = await updateCustomerService({ email: user.email, name, password: hashedPassword, phone, photo, address });
    // delete sensitive information & unnecessary fields
    delete updatedCustomer.password;
    delete updatedCustomer.createdAt;
    delete updatedCustomer.updatedAt;
    delete updatedCustomer.__v;

    return res.status(200).json({
      status: 200,
      message: 'Customer updated successfully',
      data: updatedCustomer,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateCustomer;
