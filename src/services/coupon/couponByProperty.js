const Coupon = require('../../models/Coupon');
const createError = require('../../utils/createError');

const couponByProperty = async (property, value, isDoc = true) => {
  try {
    const coupon = await Coupon.findOne({ [property]: value });
    if (isDoc && coupon) return coupon._doc;
    return coupon;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = couponByProperty;
