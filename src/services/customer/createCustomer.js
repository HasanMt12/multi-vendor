const Customer = require('../../models/Customer');

const createCustomer = async ({ name, email, password, phone, photo, role = 'customer', status = 'disabled' }) => {
  const newCustomerDoc = new Customer({
    name,
    email,
    password,
    phone,
    photo,
    role,
    status,
  });
  const newCustomer = await newCustomerDoc.save();
  if (!newCustomer) return null;
  return newCustomer._doc;
};

module.exports = createCustomer;
