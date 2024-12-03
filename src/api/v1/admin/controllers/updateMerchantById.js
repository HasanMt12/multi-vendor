const bcrypt = require('bcrypt');
const merchantByProperty = require('../../../../services/merchant/merchantByProperty');
const updateMerchantByIdServices = require('../../../../services/merchant/updateMerchantById');

const updateMerchantById = async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const { name, email, password, phone, status, rating, products, website, description, logo, tags, notes, verificationInfo, address, reviews } = req.body;

    if (user.role !== 'admin' && user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const merchant = await merchantByProperty('_id', id);

    if (!merchant) {
      return res.status(404).json({ status: 404, message: 'Merchant not found' });
    }

    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedMerchant = await updateMerchantByIdServices({ id, name, email, password: hashedPassword, phone, status, rating, products, website, description, logo, tags, notes, verificationInfo, address, reviews });

    res.status(200).json({
      status: 200,
      message: 'Merchant updated successfully',
      data: updatedMerchant,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateMerchantById;
