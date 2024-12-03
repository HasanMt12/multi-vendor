const bcrypt = require('bcrypt');
const updateAdminByIdService = require('../../../../services/admin/updateAdminById');
const adminByProperty = require('../../../../services/admin/adminByProperty');

const updateAdminById = async (req, res, next) => {
  try {
    const { name, email, password, photo, status } = req.body;
    const { id } = req.params;
    const { user } = req;
    if (user.role !== 'superadmin') {
      return res.status(403).json({
        status: 403,
        error: 'Forbidden access',
      });
    }
    const admin = await adminByProperty('_id', id);
    if (!admin) {
      return res.status(404).json({
        status: 404,
        error: 'Admin not found',
      });
    }

    // hash password
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedAdmin = await updateAdminByIdService({ id, name, email, password: hashedPassword, photo, status });

    // remove sensitive data & unwanted fields
    delete updatedAdmin.password;
    delete updatedAdmin.createdAt;
    delete updatedAdmin.updatedAt;
    delete updatedAdmin.__v;

    res.status(200).json({
      status: 200,
      message: 'Admin updated successfully',
      data: updatedAdmin,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateAdminById;
