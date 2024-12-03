const router = require('express').Router();
const { getSuperAdmin, updateSuperAdmin, getAdminById, updateAdminById, deleteAdminById, getAdmins } = require('../api/v1/superadmin/controllers');
const { updateSuperAdminValidation, updateAdminByIdValidation } = require('../api/v1/superadmin/validation');

router.get('/', getSuperAdmin);
router.put('/', updateSuperAdminValidation, updateSuperAdmin);
router.get('/admins', getAdmins);
router.get('/admins/:id', getAdminById);
router.put('/admins/:id', updateAdminByIdValidation, updateAdminById);
router.delete('/admins/:id', deleteAdminById);

module.exports = router;
