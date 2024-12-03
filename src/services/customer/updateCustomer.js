const Customer = require('../../models/Customer');
const createError = require('../../utils/createError');

const updateCustomer = async ({ name, email, password, verifiedEmail, phone, photo, role, status, address, lastOrderId, orderCount, tags, notes, totalSpent, points, pointsAmount }) => {
  try {
    const customer = await Customer.findOne({ email });
    customer.name = name ?? customer.name;
    customer.email = customer.email ?? customer.email;
    customer.password = password ?? customer.password;
    customer.verifiedEmail = verifiedEmail ?? customer.verifiedEmail;
    customer.phone = phone ?? customer.phone;
    customer.photo = photo ?? customer.photo;
    customer.role = role ?? customer.role;
    customer.status = status ?? customer.status;
    customer.address = address ?? customer.address;
    customer.lastOrderId = lastOrderId ?? customer.lastOrderId;
    customer.orderCount = orderCount ?? customer.orderCount;
    customer.tags = tags ?? customer.tags;
    customer.notes = notes ?? customer.notes;
    customer.totalSpent = totalSpent ?? customer.totalSpent;
    customer.points = points ?? customer.points;
    customer.pointsAmount = pointsAmount ?? customer.pointsAmount;
    customer.updatedAt = Date.now();
    const updateCustomerResult = await customer.save();
    return updateCustomerResult._doc;
  } catch (error) {
    createError(error.messsage, error.status);
  }
};

module.exports = updateCustomer;
