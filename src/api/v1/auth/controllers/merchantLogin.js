const bcrypt = require('bcrypt');
const merchantByProperty = require('../../../../services/merchant/merchantByProperty');
const createToken = require('../../../../utils/createToken');

const merchantLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const merchant = await merchantByProperty('email', email);
    if (!merchant) {
      return res.status(400).json({ status: 400, error: 'Invalid email' });
    }
    // password comparison
    const isPasswordMatch = await bcrypt.compare(password, merchant.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ status: 401, error: 'Invalid password' });
    }

    // delete sensitive data & unwanted fields
    delete merchant.password;
    delete merchant.rating;
    delete merchant.products;
    delete merchant.website;
    delete merchant.tags;
    delete merchant.notes;
    delete merchant.description;
    delete merchant.reviews;
    delete merchant.createdAt;
    delete merchant.updatedAt;
    delete merchant.__v;

    // generate token
    const token = await createToken({ email: merchant.email });

    // set token in cookie
    res
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: process.env.JWT_EXPIRES_IN,
      })
      .json({ status: 200, message: 'Login successful', data: merchant });
  } catch (error) {
    next(error);
  }
};

module.exports = merchantLogin;
