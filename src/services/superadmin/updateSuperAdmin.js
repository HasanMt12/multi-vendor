const mongoose = require('mongoose');
const Admin = require('../../models/Admin');
const createError = require('../../utils/createError');

const updateSuperAdmin = async ({ _id, name, email, password, photo }) => {
  try {
    const objectId = new mongoose.Types.ObjectId(_id);
    const superAdmin = await Admin.findById(objectId);
    superAdmin.name = name ?? superAdmin.name;
    superAdmin.email = email ?? superAdmin.email;
    superAdmin.password = password ?? superAdmin.password;
    superAdmin.photo = photo ?? superAdmin.photo;
    superAdmin.updatedAt = Date.now();
    const updateSuperAdminResult = await superAdmin.save();
    return updateSuperAdminResult._doc;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = updateSuperAdmin;
