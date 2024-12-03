const merchantByProperty = require('../../../../services/merchant/merchantByProperty');

const getMerchant = async (req, res, next) => {
  try {
    const { user } = req;
    if (user.role !== 'merchant') {
      return res.status(403).json({ status: 403, error: 'Forbidden access' });
    }
    const merchant = await merchantByProperty('_id', user._id);
    if (!merchant) {
      return res.status(404).json({ status: 404, error: 'Merchant not found' });
    }
    // deleted sensitive data & unwanted fields
    delete merchant.password;
    delete merchant.createdAt;
    delete merchant.updatedAt;
    delete merchant.__v;
    res.status(200).json({ status: 200, message: 'Merchant retrieved', data: merchant });
  } catch (error) {
    next(error);
  }
};

module.exports = getMerchant;
