const Merchant = require('../../models/Merchant');
const createError = require('../../utils/createError');

const getMerchants = async () => {
  try {
    const merchants = await Merchant.find({});
    return merchants;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = getMerchants;
