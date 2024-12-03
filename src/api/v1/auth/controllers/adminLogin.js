const bcrypt = require('bcrypt');
const adminByProperty = require('../../../../services/admin/adminByProperty');
const createToken = require('../../../../utils/createToken');
const updateAdminById = require('../../../../services/admin/updateAdminById');

const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await adminByProperty('email', email);
    if (!admin) {
      return res.status(404).json({ status: 404, error: 'Admin not found' });
    }
    // compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ status: 401, error: 'Invalid password' });
    }
    // remove sensitive data
    delete admin.password;
    delete admin.createdAt;
    delete admin.updatedAt;
    delete admin.__v;

    const updateAdminResult = await updateAdminById({ id: admin._id, lastLogin: Date.now() });

    // create token
    const token = await createToken({ email: admin.email });

    // set token in cookie
    res
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: process.env.JWT_EXPIRES_IN,
      })
      .json({ status: 200, message: `${admin.role === 'admin' ? 'Admin' : 'Super Admin'} logged in successfully`, data: { ...admin, lastLogin: updateAdminResult.lastLogin } });
  } catch (error) {
    next(error);
  }
};

module.exports = adminLogin;
