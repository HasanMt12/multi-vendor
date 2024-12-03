const Coupon = require('../../models/Coupon');
const createError = require('../../utils/createError');

const getCoupons = async () => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    return coupons;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = getCoupons;
