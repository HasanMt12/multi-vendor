const deleteMerchantByIdService = require('../../../../services/merchant/deleteMerchantById');
const merchantByProperty = require('../../../../services/merchant/merchantByProperty');

const deleteMerchant = async (req, res, next) => {
  try {
    const { user } = req;
    if (user.role !== 'merchant') {
      return res.status(403).json({ status: 403, error: 'Forbidden access' });
    }
    const merchant = await merchantByProperty('_id', user._id);
    if (!merchant) {
      return res.status(404).json({ status: 404, error: 'Merchant not found' });
    }
    const deletedMerchant = await deleteMerchantByIdService(merchant._id);
    if (deletedMerchant.deletedCount === 0) {
      return res.status(400).json({ status: 400, error: 'Merchant not deleted' });
    }
    res.status(200).json({ status: 200, message: 'Merchant deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteMerchant;
