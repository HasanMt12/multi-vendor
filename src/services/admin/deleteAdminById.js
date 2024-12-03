const Admin = require('../../models/Admin');
const createError = require('../../utils/createError');

const deleteAdminById = async (id) => {
  try {
    const deletedAdmin = await Admin.deleteOne({ _id: id });
    return deletedAdmin;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = deleteAdminById;
