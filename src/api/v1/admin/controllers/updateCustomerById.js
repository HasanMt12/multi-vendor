const bcrypt = require('bcrypt');
const customerByProperty = require('../../../../services/customer/customerByProperty');
const updateCustomerByIdService = require('../../../../services/customer/updateCustomerById');

const updateCustomerById = async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const { name, password, verifiedEmail, phone, photo, status, address, lastOrderId, orderCount, tags, notes, totalSpent, points, pointsAmount } = req.body;
    if (user.role !== 'admin' && user.role !== 'superadmin') {
      return res.status(403).json({ status: 403, error: 'Forbidden access' });
    }

    const customer = await customerByProperty('_id', id);
    if (!customer) {
      return res.status(404).json({ status: 404, error: 'Customer not found' });
    }

    let hashedPassword;
    if (password) hashedPassword = await bcrypt.hash(password, 10);

    const updatedCustomer = await updateCustomerByIdService({ id, name, password: hashedPassword, verifiedEmail, phone, photo, status, address, lastOrderId, orderCount, tags, notes, totalSpent, points, pointsAmount });

    // delete sensitive data & unwanted fields
    delete updatedCustomer.password;
    delete updatedCustomer.createdAt;
    delete updatedCustomer.updatedAt;
    delete updatedCustomer.__v;

    if (updatedCustomer) {
      return res.status(200).json({ status: 200, message: 'Customer updated successfully', data: updatedCustomer });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = updateCustomerById;
