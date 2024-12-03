const Customer = require('../../models/Customer');
const createError = require('../../utils/createError');

const getCustomers = async () => {
  try {
    const customers = await Customer.find({});
    return customers;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = getCustomers;
