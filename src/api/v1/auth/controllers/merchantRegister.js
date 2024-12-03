const bcrypt = require('bcrypt');
const createMerchant = require('../../../../services/merchant/createMerchant');
const merchantByProperty = require('../../../../services/merchant/merchantByProperty');

const merchantRegister = async (req, res, next) => {
  try {
    const { name, email, password, phone, logo } = req.body;
    const isExistsmerchant = await merchantByProperty('email', email);

    if (isExistsmerchant) {
      return res.status(400).json({ status: 400, error: 'Email already exists' });
    }

    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);
    // create merchantId
    const merchantId = `GSMART-${Date.now().toString().slice(-6)}`;
    const merchant = await createMerchant({ merchantId, name, email, password: hashedPassword, phone, logo });

    delete merchant.password;
    delete merchant.rating;
    delete merchant.products;
    delete merchant.website;
    delete merchant.tags;
    delete merchant.notes;
    delete merchant.description;
    delete merchant.reviews;
    delete merchant.createdAt;
    delete merchant.updatedAt;
    delete merchant.__v;

    res.status(201).json({ status: 201, message: 'Merchant created successfully', data: merchant });
  } catch (error) {
    next(error);
  }
};

module.exports = merchantRegister;
