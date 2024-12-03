const router = require('express').Router();
const { updateCustomerByIdValidation } = require('../api/v1/admin/validation');
const { getCustomer, deleteCustomer, updateCustomer } = require('../api/v1/customer/controllers');

router.get('/', getCustomer);
router.put('/', updateCustomerByIdValidation, updateCustomer);
router.delete('/', deleteCustomer);

module.exports = router;
