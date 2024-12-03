const Merchant = require('../../models/Merchant');
const createError = require('../../utils/createError');

const updateMerchant = async ({ merchantId, name, email, password, phone, role, status, rating, products, website, description, logo, tags, notes, verificationInfo, socialMedia, address, reviews }) => {
  try {
    const merchant = await Merchant.findOne({ email });

    merchant.merchantId = merchantId ?? merchant.merchantId;
    merchant.name = name ?? merchant.name;
    merchant.email = merchant.email ?? merchant.email;
    merchant.password = password ?? merchant.password;
    merchant.phone = phone ?? merchant.phone;
    merchant.role = role ?? merchant.role;
    merchant.status = status ?? merchant.status;
    merchant.rating = rating ?? merchant.rating;
    merchant.products = products ?? merchant.products;
    merchant.website = website ?? merchant.website;
    merchant.description = description ?? merchant.description;
    merchant.logo = logo ?? merchant.logo;
    merchant.tags = tags ?? merchant.tags;
    merchant.notes = notes ?? merchant.notes;
    merchant.verificationInfo = verificationInfo ?? merchant.verificationInfo;
    merchant.socialMedia = socialMedia ?? merchant.socialMedia;
    merchant.address = address ?? merchant.address;
    merchant.reviews = reviews ?? merchant.reviews;
    merchant.updatedAt = Date.now();
    const updateMerchantResult = await merchant.save();
    return updateMerchantResult._doc;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = updateMerchant;
