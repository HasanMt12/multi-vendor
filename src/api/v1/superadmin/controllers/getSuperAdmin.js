const getSuperAdmin = async (req, res, next) => {
  try {
    const superAdmin = req.user;
    if (superAdmin.role !== 'superadmin') {
      return res.status(403).json({
        status: 403,
        error: 'Forbidden access',
      });
    }
    // delete sensitive data & unwanted fields
    delete superAdmin.password;
    delete superAdmin.createdAt;
    delete superAdmin.updatedAt;
    delete superAdmin.__v;

    return res.status(200).json({
      status: 200,
      message: 'Super Admin retrieved successfully',
      data: superAdmin,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getSuperAdmin;
