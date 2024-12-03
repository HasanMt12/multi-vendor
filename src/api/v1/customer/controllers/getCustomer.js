const customerByProperty = require('../../../../services/customer/customerByProperty');

const getCustomer = async (req, res, next) => {
  try {
    const { user } = req;
    if (user.role !== 'customer') {
      return res.status(403).json({ status: 403, error: 'Forbidden access' });
    }
    const customer = await customerByProperty('_id', user._id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    // deleted sensitive information & unnecessary fields
    delete customer.password;
    delete customer.createdAt;
    delete customer.updatedAt;
    delete customer.__v;
    return res.status(200).json({
      status: 200,
      message: 'Customer retrieved successfully',
      data: customer,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCustomer;
