const Admin = require('../../models/Admin');
const createError = require('../../utils/createError');

const getAdminsService = async (property, value) => {
  try {
    const admins = await Admin.find({ [property]: value });
    return admins;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = getAdminsService;
