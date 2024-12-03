const adminLoginValidation = require('./adminLoginValidation');
const adminRegistrationValidation = require('./adminRegistrationValidation');
const customerRegistrationValidation = require('./customerRegistrationValidation');
const merchantRegistrationValidation = require('./merchantRegistrationValidation');
const validateChangePassword = require('./validateChangePassword');

module.exports = {
  adminLoginValidation,
  adminRegistrationValidation,
  customerRegistrationValidation,
  merchantRegistrationValidation,
  validateChangePassword,
};
