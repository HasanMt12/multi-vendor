const couponByProperty = require('../../../../services/coupon/couponByProperty');
const createCouponService = require('../../../../services/coupon/createCoupon');

const createCoupons = async (req, res, next) => {
  try {
    const { user } = req;
    const { description, code, discount, startAt, endAt, usageLimit, status } = req.body;
    if (user.role !== 'admin' && user.role !== 'superadmin') {
      return res.status(403).json({
        status: 403,
        error: 'Forbidden access',
      });
    }

    const isExistCoupon = await couponByProperty('code', code);
    if (isExistCoupon) {
      return res.status(400).json({
        status: 400,
        error: 'Coupon code already exists',
      });
    }

    const createdCoupon = await createCouponService({ description, code, discount, startAt, endAt, usageLimit, status });

    // delete unnecessary feilds
    delete createdCoupon.updatedAt;
    delete createdCoupon.createdAt;
    delete createdCoupon.__v;

    if (!createdCoupon) {
      return res.status(400).json({
        status: 400,
        error: 'Coupon could not be created',
      });
    }

    res.status(201).json({
      status: 201,
      message: 'Coupon created successfully',
      data: createdCoupon,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createCoupons;
