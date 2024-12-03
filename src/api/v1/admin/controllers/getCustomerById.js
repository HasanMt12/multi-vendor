const customerByProperty = require('../../../../services/customer/customerByProperty');

const getCustomerById = async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;
    if (user.role !== 'admin' && user.role !== 'superadmin') {
      return res.status(403).json({ status: 403, error: 'Forbidden access' });
    }
    const customer = await customerByProperty('_id', id);
    if (!customer) {
      return res.status(404).json({ status: 404, error: 'Customer not found' });
    }
    // remove sensitive information & unnecessary fields
    delete customer.password;
    delete customer.createdAt;
    delete customer.updatedAt;
    delete customer.__v;

    res.status(200).json({ status: 200, message: 'Customer retrieved successfully', data: customer });
  } catch (error) {
    next(error);
  }
};

module.exports = getCustomerById;
