const { Types } = require('mongoose');
const createError = require('../../utils/createError');
const Admin = require('../../models/Admin');

const updateAdminById = async ({ id, name, email, password, photo, status, lastLogin }) => {
  try {
    const objectId = new Types.ObjectId(id);
    const admin = await Admin.findById(objectId);
    admin.name = name ?? admin.name;
    admin.email = email ?? admin.email;
    admin.password = password ?? admin.password;
    admin.photo = photo ?? admin.photo;
    admin.lastLogin = admin.lastLogin ?? admin.lastLogin;
    admin.status = status ?? admin.status;
    admin.lastLogin = lastLogin ?? admin.lastLogin;
    admin.updatedAt = Date.now();
    const updateAdminByIdResult = await admin.save();
    return updateAdminByIdResult._doc;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = updateAdminById;
