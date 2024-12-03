const { Types } = require('mongoose');
const Merchant = require('../../models/Merchant');

const updateMerchantById = async ({ id, name, email, password, phone, status, rating, products, website, description, logo, tags, notes, verificationInfo, address, reviews }) => {
  const objectId = new Types.ObjectId(id);
  const merchant = await Merchant.findById(objectId);

  merchant.name = name ?? merchant.name;
  merchant.email = email ?? merchant.email;
  merchant.password = password ?? merchant.password;
  merchant.phone = phone ?? merchant.phone;
  merchant.status = status ?? merchant.status;
  merchant.rating = rating ?? merchant.rating;
  merchant.products = products ?? merchant.products;
  merchant.website = website ?? merchant.website;
  merchant.description = description ?? merchant.description;
  merchant.logo = logo ?? merchant.logo;
  merchant.tags = tags ?? merchant.tags;
  merchant.notes = notes ?? merchant.notes;
  merchant.verificationInfo = verificationInfo ?? merchant.verificationInfo;
  merchant.address = address ?? merchant.address;
  merchant.reviews = reviews ?? merchant.reviews;

  const updatedMerchant = await merchant.save();
  return updatedMerchant._doc;
};

module.exports = updateMerchantById;
