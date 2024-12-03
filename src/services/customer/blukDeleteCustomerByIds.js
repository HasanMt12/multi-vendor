const Customer = require('../../models/Customer');
const createError = require('../../utils/createError');

const blukDeleteCustomerByIds = async (ids) => {
  try {
    const deletedCustomers = await Customer.deleteMany({ _id: { $in: ids } });
    return deletedCustomers;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = blukDeleteCustomerByIds;
