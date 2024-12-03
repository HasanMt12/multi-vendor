const Admin = require('../../models/Admin');

const adminByProperty = async (property, value, isDoc = true) => {
  const admin = await Admin.findOne({ [property]: value });
  if (!admin) return null;
  if (isDoc && admin) return admin._doc;
  return admin;
};

module.exports = adminByProperty;
