const bcrypt = require('bcrypt');
const updateMerchant = require('../../../../services/merchant/updateMerchant');
const updateCustomer = require('../../../../services/customer/updateCustomer');
const adminByProperty = require('../../../../services/admin/adminByProperty');
const updateAdminById = require('../../../../services/admin/updateAdminById');

const changePassword = async (req, res, next) => {
  try {
    const { user } = req;
    const { oldPassword, newPassword } = req.body;
    const isOldPassMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPassMatch) {
      return res.status(400).json({
        status: 400,
        error: 'Old password is incorrect',
      });
    }

    const admin = await adminByProperty('email', user.email);

    const hashNewPassword = await bcrypt.hash(newPassword, 10);

    if (user.role === 'admin') {
      await updateAdminById({ id: admin._id, password: hashNewPassword });
      res.status(200).json({
        status: 200,
        message: 'Admin Password changed successfully',
      });
    }
    if (user.role === 'merchant') {
      await updateMerchant({ email: user.email, password: hashNewPassword });
      res.status(200).json({
        status: 200,
        message: 'Merchant Password changed successfully',
      });
    }
    if (user.role === 'customer') {
      await updateCustomer({ email: user.email, password: hashNewPassword });
      res.status(200).json({
        status: 200,
        message: 'Customer Password changed successfully',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = changePassword;
