const Admin = require('../../models/Admin');

const createAdmin = async ({ name, email, password, photo, role = 'admin', status = 'active' }) => {
  const newAdminDoc = new Admin({
    name,
    email,
    password,
    photo,
    role,
    status,
  });
  const newAdmin = await newAdminDoc.save();
  if (!newAdmin) return null;
  return newAdmin._doc;
};

module.exports = createAdmin;
