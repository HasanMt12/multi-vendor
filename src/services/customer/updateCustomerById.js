const { Types } = require('mongoose');
const Customer = require('../../models/Customer');
const createError = require('../../utils/createError');

const updateCustomerById = async ({ id, name, email, password, verifiedEmail, phone, photo, role, status, address, lastOrderId, orderCount, tags, notes, totalSpent, points, pointsAmount }) => {
  try {
    const objectId = new Types.ObjectId(id);
    const customer = await Customer.findById(objectId);

    customer.name = name ?? customer.name;
    customer.email = email ?? customer.email;
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

    const updatedCustomer = await customer.save();
    return updatedCustomer._doc;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = updateCustomerById;
