const getMerchants = require('./getMerchants');
const getMerchantById = require('./getMerchantById');
const updateMerchantById = require('./updateMerchantById');
const deleteMerchantById = require('./deleteMerchantById');
const getCustomers = require('./getCustomers');
const getCustomerById = require('./getCustomerById');
const deleteCustomerById = require('./deleteCustomerById');
const updateCustomerById = require('./updateCustomerById');
const blukUpdateMerchantByIds = require('./blukUpdateMerchantByIds');
const blukDeleteMerchantByIds = require('./blukDeleteMerchantByIds');
const blukUpdateCustomerByIds = require('./blukUpdateCustomerByIds');
const blukDeleteCustomerByIds = require('./blukDeleteCustomerByIds');

module.exports = {
  getMerchants,
  getMerchantById,
  updateMerchantById,
  deleteMerchantById,
  getCustomers,
  getCustomerById,
  deleteCustomerById,
  updateCustomerById,
  blukUpdateMerchantByIds,
  blukDeleteMerchantByIds,
  blukUpdateCustomerByIds,
  blukDeleteCustomerByIds,
};
