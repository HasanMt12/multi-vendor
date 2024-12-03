const Coupon = require('../../models/Coupon');
const createError = require('../../utils/createError');

const createCoupon = async ({ description, code, discount, startAt, endAt, usageLimit, status }) => {
  try {
    const coupon = await Coupon({
      description,
      code,
      discount,
      startAt,
      endAt,
      usageLimit,
      status,
    });
    const createdCoupon = await coupon.save();
    if (createdCoupon) return createdCoupon._doc;
    return createdCoupon;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = createCoupon;
