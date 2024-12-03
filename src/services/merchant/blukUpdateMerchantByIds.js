const Merchant = require('../../models/Merchant');
const createError = require('../../utils/createError');

const blukUpdateMerchantByIds = async (ids, status) => {
  try {
    const updatedMerchants = await Merchant.updateMany({ _id: { $in: ids } }, { status });
    return updatedMerchants;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = blukUpdateMerchantByIds;
