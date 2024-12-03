const router = require('express').Router();
const validateToken = require('../middlewares/validateToken');
const authRoutes = require('./auth');
const superAdminRoutes = require('./superAdmin');
const adminRoutes = require('./admin');
const blogRoutes = require('./blog');
const commentRoutes = require('./comment');
const categoriesRoutes = require('./category');
const collectionRoutes = require('./collection');
const customerRoutes = require('./customer');
const merchantRoutes = require('./merchant');
const couponRoutes = require('./coupon');

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/superadmin', validateToken, superAdminRoutes);
router.use('/api/v1/admin', validateToken, adminRoutes);
router.use('/api/v1/blogs', blogRoutes);
router.use('/api/v1/comments', commentRoutes);
router.use('/api/v1/categories', validateToken, categoriesRoutes);
router.use('/api/v1/collections', validateToken, collectionRoutes);
router.use('/api/v1/customers', validateToken, customerRoutes);
router.use('/api/v1/merchants', validateToken, merchantRoutes);
router.use('/api/v1/coupons', validateToken, couponRoutes);

module.exports = router;
