const Merchant = require('../../models/Merchant');

const createMerchant = async ({ merchantId, name, email, password, phone, logo }) => {
  const newMerchant = new Merchant({ merchantId, name, email, password, phone, status: 'disabled', logo });

  const merchant = await newMerchant.save();
  if (!merchant) return null;
  return merchant._doc;
};

module.exports = createMerchant;
