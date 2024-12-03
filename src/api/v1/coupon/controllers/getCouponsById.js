const couponByProperty = require('../../../../services/coupon/couponByProperty');

const getCouponsById = async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;
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
    // delete unnecessary feilds
    delete coupon.updatedAt;
    delete coupon.createdAt;
    delete coupon.__v;
    res.status(200).json({
      status: 200,
      message: 'Coupon retrieved successfully',
      data: coupon,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCouponsById;
