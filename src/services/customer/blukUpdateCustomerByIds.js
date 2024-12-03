const Customer = require('../../models/Customer');
const createError = require('../../utils/createError');

const blukUpdateCustomerByIds = async (ids, status) => {
  try {
    const updatedCustomers = await Customer.updateMany({ _id: { $in: ids } }, { status });
    return updatedCustomers;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = blukUpdateCustomerByIds;
