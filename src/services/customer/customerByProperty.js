const Customer = require('../../models/Customer');

const customerByProperty = async (property, value, isDoc = true) => {
  const customer = await Customer.findOne({ [property]: value });
  if (!customer) return null;
  if (isDoc && customer) return customer._doc;
  return customer;
};

module.exports = customerByProperty;
