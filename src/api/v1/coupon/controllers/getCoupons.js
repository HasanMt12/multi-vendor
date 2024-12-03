const getCouponsService = require('../../../../services/coupon/getCoupons');

const getCoupons = async (req, res, next) => {
  try {
    const { user } = req;
    if (user.role !== 'admin' && user.role !== 'superadmin') {
      return res.status(403).json({
        status: 403,
        error: 'Forbidden access',
      });
    }
    const coupons = await getCouponsService();
    return res.status(200).json({
      status: 200,
      message: 'Coupons retrieved successfully',
      data: coupons,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCoupons;
