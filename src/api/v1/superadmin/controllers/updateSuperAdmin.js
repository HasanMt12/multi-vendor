const bcrypt = require('bcrypt');
const updateSuperAdminService = require('../../../../services/superadmin/updateSuperAdmin');

const updateSuperAdmin = async (req, res, next) => {
  try {
    const { _id, name, email, password, photo } = req.body;
    const { user } = req;
    if (user.role !== 'superadmin') {
      return res.status(403).json({
        status: 403,
        error: 'Forbidden access',
      });
    }
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    const updateSuperAdminResult = await updateSuperAdminService({ _id, name, email, password: hashedPassword, photo });

    // remove sensitive data & unwanted fields
    delete updateSuperAdminResult.password;
    delete updateSuperAdminResult.createdAt;
    delete updateSuperAdminResult.updatedAt;
    delete updateSuperAdminResult.__v;

    res.status(200).json({ status: 200, message: 'Super Admin updated successfully', data: updateSuperAdminResult });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSuperAdmin;
