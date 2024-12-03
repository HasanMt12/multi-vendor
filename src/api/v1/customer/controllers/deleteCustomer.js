const customerByProperty = require('../../../../services/customer/customerByProperty');
const deleteCustomerByIdService = require('../../../../services/customer/deleteCustomerById');

const deleteCustomer = async (req, res, next) => {
  try {
    const { user } = req;
    if (user.role !== 'customer') {
      return res.status(403).json({ message: 'Forbidden access' });
    }
    const customer = await customerByProperty('_id', user._id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    const deletedCustomer = await deleteCustomerByIdService(user._id);
    if (deletedCustomer.deletedCount === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json({
      status: 200,
      message: 'Customer deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteCustomer;
