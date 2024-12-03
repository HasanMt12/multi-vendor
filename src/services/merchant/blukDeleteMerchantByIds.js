const Merchant = require('../../models/Merchant');
const createError = require('../../utils/createError');

const blukDeleteMerchantByIds = async (ids) => {
  try {
    const deletedMerchants = await Merchant.deleteMany({ _id: { $in: ids } });
    return deletedMerchants;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = blukDeleteMerchantByIds;
