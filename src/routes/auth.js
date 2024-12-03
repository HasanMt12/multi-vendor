const router = require('express').Router();
const { adminRegister, adminLogin, changePassword, customerLogin, customerRegister, logoutUser, merchantLogin, merchantRegister, resetPassword, sendVerificationCode, verifyCode } = require('../api/v1/auth/controllers');
const { adminLoginValidation, adminRegistrationValidation, customerRegistrationValidation, merchantRegistrationValidation, validateChangePassword } = require('../api/v1/auth/validation');
const validateToken = require('../middlewares/validateToken');

router.post('/superadmin/register', adminRegistrationValidation, adminRegister);
router.post('/admin/login', adminLoginValidation, adminLogin);
// merchant regsister and login
router.post('/merchant/register', merchantRegistrationValidation, merchantRegister);
router.post('/merchant/login', adminLoginValidation, merchantLogin);
// customer regsister and login
router.post('/customer/register', customerRegistrationValidation, customerRegister);
router.post('/customer/login', adminLoginValidation, customerLogin);
// logout route
router.post('/logout', logoutUser);
// change password
router.patch('/change-password', validateToken, validateChangePassword, changePassword);
// forgot password
router.post('/forgot-password/send-verification-code', sendVerificationCode);
router.post('/forgot-password/verify-code', verifyCode);
router.post('/forgot-password/reset-password', resetPassword);

module.exports = router;
