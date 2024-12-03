const adminByProperty = require('../../../../services/admin/adminByProperty');

const getAdminById = async (req, res, next) => {
  try {
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

    // remove sensitive data & unwanted fields
    delete admin.password;
    delete admin.createdAt;
    delete admin.updatedAt;
    delete admin.__v;

    res.status(200).json({
      status: 200,
      message: 'Admin retrieved successfully',
      data: admin,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAdminById;
