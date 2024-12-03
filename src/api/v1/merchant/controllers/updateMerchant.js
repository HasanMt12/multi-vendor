const bcrypt = require('bcrypt');
const merchantByProperty = require('../../../../services/merchant/merchantByProperty');
const updateMerchantService = require('../../../../services/merchant/updateMerchantById');

const updateMerchant = async (req, res, next) => {
  try {
    const { user } = req;
    const { name, password, phone, products, website, description, logo, verificationInfo, socialMedia, address } = req.body;
    if (user.role !== 'merchant') {
      return res.status(403).json({ status: 403, error: 'Forbidden access' });
    }
    const merchant = await merchantByProperty('_id', user._id);
    if (!merchant) {
      return res.status(404).json({ status: 404, error: 'Merchant not found' });
    }
    let hashPassword;
    if (password) hashPassword = await bcrypt.hash(password, 10);
    const updatedMerchant = await updateMerchantService({ id: user._id, name, password: hashPassword, phone, products, website, description, logo, verificationInfo, socialMedia, address });

    if (!updatedMerchant) {
      return res.status(400).json({ status: 400, error: 'Merchant not updated' });
    }
    res.status(200).json({ status: 200, message: 'Merchant updated' });
  } catch (error) {
    next(error);
  }
};

module.exports = updateMerchant;
