const Coupon = require('../../models/Coupon');
const createError = require('../../utils/createError');

const deleteCoupons = async (id) => {
  try {
    const deletedCoupons = await Coupon.deleteOne({ _id: id });
    return deletedCoupons;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = deleteCoupons;
