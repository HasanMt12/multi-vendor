const router = require('express').Router();
const updateMerchantByIdValidation = require('../api/v1/admin/validation/updateMerchantByIdValidation');
const { getMerchant, deleteMerchant, updateMerchant } = require('../api/v1/merchant/controllers');

router.get('/', getMerchant);
router.delete('/', deleteMerchant);
router.put('/', updateMerchantByIdValidation, updateMerchant);

module.exports = router;
