const adminByProperty = require('../../../../services/admin/adminByProperty');
const deleteAdminByIdService = require('../../../../services/admin/deleteAdminById');

const deleteAdminById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req;

    if (user.role !== 'superadmin') {
      return res.status(403).json({ status: 403, error: 'Forbidden access' });
    }
    const admin = await adminByProperty('_id', id);
    if (!admin) {
      return res.status(404).json({ status: 404, error: 'Admin not found' });
    }
    const deletedAdmin = await deleteAdminByIdService(id);

    if (deletedAdmin.deletedCount > 0) {
      return res.status(200).json({ status: 200, message: 'Admin deleted successfully' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = deleteAdminById;
