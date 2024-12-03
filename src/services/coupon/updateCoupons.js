const Coupon = require('../../models/Coupon');
const createError = require('../../utils/createError');

const updateCoupons = async ({ id, description, code, discount, startAt, endAt, usageLimit, status }) => {
  try {
    const updatedCoupons = await Coupon.updateOne({ _id: id }, { description, code, discount, startAt, endAt, usageLimit, status });
    return updatedCoupons;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = updateCoupons;
