const Customer = require('../../models/Customer');
const createError = require('../../utils/createError');

const deleteCustomerById = async (id) => {
  try {
    const deletedCustomer = await Customer.deleteOne({ _id: id });
    return deletedCustomer;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = deleteCustomerById;
