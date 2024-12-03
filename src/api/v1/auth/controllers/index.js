const adminRegister = require('./adminRegister');
const adminLogin = require('./adminLogin');
const changePassword = require('./changePassword');
const customerLogin = require('./customerLogin');
const customerRegister = require('./customerRegister');
const { sendVerificationCode, verifyCode, resetPassword } = require('./forgotPassword');
const logoutUser = require('./logoutUser');
const merchantLogin = require('./merchantLogin');
const merchantRegister = require('./merchantRegister');

module.exports = {
  adminRegister,
  adminLogin,
  changePassword,
  customerLogin,
  customerRegister,
  sendVerificationCode,
  verifyCode,
  resetPassword,
  logoutUser,
  merchantLogin,
  merchantRegister,
};
