const updateCouponsService = require('../../../../services/coupon/updateCoupons');
const couponByProperty = require('../../../../services/coupon/couponByProperty');

const updateCoupons = async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const { description, code, discount, startAt, endAt, usageLimit, status } = req.body;
    if (user.role !== 'admin' && user.role !== 'superadmin') {
      return res.status(403).json({
        status: 403,
        error: 'Forbidden access',
      });
    }

    const coupon = await couponByProperty('_id', id);
    if (!coupon) {
      return res.status(404).json({
        status: 404,
        error: 'Coupon not found',
      });
    }

    const updatedCoupons = await updateCouponsService({ id: coupon._id, description, code, discount, startAt, endAt, usageLimit, status });

    if (updatedCoupons.modifiedCount === 0) {
      return res.status(400).json({
        status: 400,
        error: 'Coupon could not be updated',
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Coupon updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateCoupons;
