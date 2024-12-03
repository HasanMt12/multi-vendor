const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { gmailRegex, alphanumericRegex } = require('../../../../constant');
const adminByProperty = require('../../../../services/admin/adminByProperty');
const merchantByProperty = require('../../../../services/merchant/merchantByProperty');
const customerByProperty = require('../../../../services/customer/customerByProperty');
const ForgotPassword = require('../../../../models/ForgotPassword');

const sendVerificationCode = async (req, res, next) => {
  const { email } = req.body;

  if (!gmailRegex.test(email)) {
    return res.status(400).json({ status: 400, errors: 'Invalid email' });
  }

  const verificationCode = crypto.randomInt(100000, 999999);
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send the email with the verification code
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is ${verificationCode}`,
    });

    // Find the user in the database by email or create a new one
    const user = (await adminByProperty('email', email)) || (await merchantByProperty('email', email)) || (await customerByProperty('email', email));
    if (!user) {
      return res.status(404).json({ status: 404, error: 'User not found' });
    }
    await new ForgotPassword({ email, verificationCode }).save();
    return res.status(200).json({ status: 200, message: 'Verification code sent successfully' });
  } catch (error) {
    next(error);
  }
  return null;
};

const verifyCode = async (req, res, next) => {
  const { email, code } = req.body;
  try {
    const dbCode = await ForgotPassword.findOne({ email });
    // TODO: Check if the code is expired
    if (dbCode && dbCode.verificationCode === parseInt(code, 10)) {
      dbCode.userCode = code;
      await dbCode.save();
      return res.status(200).json({ status: 200, message: 'Email verified successfully' });
    }
    return res.status(400).json({ status: 400, message: 'Invalid code' });
  } catch (error) {
    next(error);
  }
  return null;
};

const resetPassword = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!alphanumericRegex.test(password) || password.length < 6) {
      return res.status(400).json({ status: 400, message: 'Password must be alphanumeric 6 length and contain at least one letter and one number' });
    }
    const dbCode = await ForgotPassword.findOne({ email });
    if (!dbCode) {
      return res.status(400).json({ status: 400, message: 'Email not verified for change password' });
    }
    if (dbCode.verificationCode === dbCode.userCode) {
      const user = (await adminByProperty('email', email, false)) || (await merchantByProperty('email', email, false)) || (await customerByProperty('email', email, false));
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();
      await ForgotPassword.deleteOne({ email });
      return res.status(200).json({ status: 200, message: 'Password reset successfully' });
    }
    return res.status(400).json({ status: 400, message: 'You Entered Invalid code' });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendVerificationCode, verifyCode, resetPassword };
