const router = require('express').Router();
const { getCoupons, createCoupons, getCouponsById, deleteCoupons, updateCoupons } = require('../api/v1/coupon/controllers');
const createCouponsValidation = require('../api/v1/coupon/validation/createCouponsValidation');
const updateCouponsValidation = require('../api/v1/coupon/validation/updateCouponsValidation');

router.get('/', getCoupons);
router.get('/:id', getCouponsById);
router.post('/', createCouponsValidation, createCoupons);
router.put('/:id', updateCouponsValidation, updateCoupons);
router.delete('/:id', deleteCoupons);

module.exports = router;
