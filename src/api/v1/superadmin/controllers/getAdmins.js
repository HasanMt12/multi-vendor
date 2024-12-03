const getAdminsService = require('../../../../services/admin/getAdmins');

const getAdmins = async (req, res, next) => {
  try {
    const { user } = req;
    const { property = 'role', value = 'admin' } = req.query;
    if (user.role !== 'superadmin') {
      return res.status(403).json({
        status: 403,
        error: 'Forbidden access',
      });
    }
    const admins = await getAdminsService(property, value);
    const filteredAdmins = admins.map((admin) => {
      const filteredAdmin = admin._doc;
      delete filteredAdmin.password;
      delete filteredAdmin.createdAt;
      delete filteredAdmin.updatedAt;
      delete filteredAdmin.__v;
      return filteredAdmin;
    });
    res.status(200).json({ status: 200, message: 'Admins retrieved successfully', data: filteredAdmins });
  } catch (error) {
    next(error);
  }
};

module.exports = getAdmins;
