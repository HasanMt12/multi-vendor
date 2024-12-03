const blukUpdateMerchantByIdsService = require('../../../../services/merchant/blukUpdateMerchantByIds');

const blukUpdateMerchantByIds = async (req, res, next) => {
  try {
    const { user } = req;
    const { ids, status } = req.body;
    if (user.role !== 'admin' && user.role !== 'superadmin') {
      return res.status(403).json({ status: 403, error: 'Forbidden access' });
    }

    const updatedMerchants = await blukUpdateMerchantByIdsService(ids, status);

    if (updatedMerchants.modifiedCount > 0) {
      return res.status(200).json({ status: 200, message: `Merchants updated successfully - ${updatedMerchants.modifiedCount}` });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = blukUpdateMerchantByIds;
