const Merchant = require('../../models/Merchant');
const createError = require('../../utils/createError');

const deleteMerchantById = async (id) => {
  try {
    const deletedMerchant = await Merchant.deleteOne({ _id: id });
    return deletedMerchant;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = deleteMerchantById;
