const blukDeleteMerchantByIdsService = require('../../../../services/merchant/blukDeleteMerchantByIds');

const blukDeleteMerchantByIds = async (req, res, next) => {
  try {
    const { user } = req;
    const { ids } = req.body;
    if (user.role !== 'admin' && user.role !== 'superadmin') {
      return res.status(403).json({ status: 403, error: 'Forbidden access' });
    }

    if (Array.isArray(ids) === false || ids.length === 0) {
      return res.status(400).json({ status: 400, error: 'Invalid ids' });
    }

    const deletedMerchants = await blukDeleteMerchantByIdsService(ids);

    if (deletedMerchants.deletedCount > 0) {
      return res.status(200).json({ status: 200, message: `Merchants deleted successfully - ${deletedMerchants.deletedCount}` });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = blukDeleteMerchantByIds;
