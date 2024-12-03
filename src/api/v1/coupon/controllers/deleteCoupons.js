const deleteCouponsService = require('../../../../services/coupon/deleteCoupons');
const couponByProperty = require('../../../../services/coupon/couponByProperty');

const deleteCoupons = async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;
    if (user.role !== 'admin' && user.role !== 'superadmin') {
      return res.status(403).json({
        status: 403,
        error: 'Forbidden access',
      });
    }
    const isExistCoupon = await couponByProperty('_id', id);
    if (!isExistCoupon) {
      return res.status(404).json({
        status: 404,
        error: 'Coupon not found',
      });
    }
    const deletedCoupons = await deleteCouponsService(id);
    if (deletedCoupons.deletedCount === 0) {
      return res.status(400).json({
        status: 400,
        error: 'Coupon could not be deleted',
      });
    }
    res.status(200).json({
      status: 200,
      message: 'Coupon deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteCoupons;
