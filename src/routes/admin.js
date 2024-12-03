const router = require('express').Router();
const { getMerchants, getMerchantById, updateMerchantById, deleteMerchantById, getCustomerById, deleteCustomerById, updateCustomerById, blukUpdateMerchantByIds, blukDeleteMerchantByIds, blukUpdateCustomerByIds, blukDeleteCustomerByIds } = require('../api/v1/admin/controllers');
const { getCustomers } = require('../api/v1/admin/controllers');
const { updateMerchantByIdValidation, updateCustomerByIdValidation, blukUpdateMerchantByIdsValidation } = require('../api/v1/admin/validation');

router.get('/merchants', getMerchants);
router.get('/merchants/:id', getMerchantById);
router.put('/merchants/:id', updateMerchantByIdValidation, updateMerchantById);
router.delete('/merchants/:id', deleteMerchantById);
// admin routes for customer management
router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomerById);
router.put('/customers/:id', updateCustomerByIdValidation, updateCustomerById);
router.delete('/customers/:id', deleteCustomerById);
// admin bluk actions routes
router.put('/bluk-action/merchants', blukUpdateMerchantByIdsValidation, blukUpdateMerchantByIds);
router.delete('/bluk-action/merchants', blukDeleteMerchantByIds);
router.put('/bluk-action/customers', blukUpdateMerchantByIdsValidation, blukUpdateCustomerByIds);
router.delete('/bluk-action/customers', blukDeleteCustomerByIds);

module.exports = router;
