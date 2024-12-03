const customerByProperty = require('../../../../services/customer/customerByProperty');
const deleteCustomerByIdService = require('../../../../services/customer/deleteCustomerById');

const deleteCustomerById = async (req, res, next) => {
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

    const deletedCustomer = await deleteCustomerByIdService(id);

    if (deletedCustomer.deletedCount > 0) {
      return res.status(200).json({ status: 200, message: 'Customer deleted successfully' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = deleteCustomerById;
