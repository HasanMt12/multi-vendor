const getMerchantsService = require('../../../../services/merchant/getMerchants');

const getMerchants = async (req, res, next) => {
  try {
    const { user } = req;
    if (user.role !== 'admin' && user.role !== 'superadmin') {
      return res.status(403).json({ status: 403, error: 'Forbidden access' });
    }

    const merchants = await getMerchantsService();

    const filteredMerchants = merchants.map((merchant) => ({
      _id: merchant.id,
      merchantId: merchant.merchantId,
      name: merchant.name,
      email: merchant.email,
      phone: merchant.phone,
      role: merchant.role,
      status: merchant.status,
      products: merchant.products.length,
      logo: merchant.logo,
    }));

    return res.status(200).json({ status: 200, message: 'Merchants retrieved successfully', data: filteredMerchants });
  } catch (error) {
    next(error);
  }
};

module.exports = getMerchants;
