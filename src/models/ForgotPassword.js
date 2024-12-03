const { model, Schema } = require('mongoose');

const forgotPasswordSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  verificationCode: {
    type: Number,
    required: true,
  },
  userCode: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ForgotPassword = model('ForgotPassword', forgotPasswordSchema);
module.exports = ForgotPassword;
