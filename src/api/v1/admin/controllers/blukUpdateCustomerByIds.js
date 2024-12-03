const blukUpdateCustomerByIdsService = require('../../../../services/customer/blukUpdateCustomerByIds');

const blukUpdateCustomerByIds = async (req, res, next) => {
  try {
    const { user } = req;
    const { ids, status } = req.body;
    if (user.role !== 'admin' && user.role !== 'superadmin') {
      return res.status(403).json({ status: 403, error: 'Forbidden access' });
    }

    const updatedCustomers = await blukUpdateCustomerByIdsService(ids, status);

    if (updatedCustomers.modifiedCount > 0) {
      return res.status(200).json({ status: 200, message: `Customers updated successfully - ${updatedCustomers.modifiedCount}` });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = blukUpdateCustomerByIds;
