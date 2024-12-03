const bcrypt = require('bcrypt');
const createAdmin = require('../../../../services/admin/createAdmin');

const adminRegister = async (req, res, next) => {
  try {
    const { name, email, password, photo } = req.body;
    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);
    // create admin
    const newAdmin = await createAdmin({ name, email, password: hashedPassword, photo });
    // remove sensitive data
    delete newAdmin.password;
    delete newAdmin.createdAt;
    delete newAdmin.updatedAt;
    delete newAdmin.__v;
    res.status(201).json({
      status: 201,
      message: 'Admin registered successfully',
      data: newAdmin,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = adminRegister;
