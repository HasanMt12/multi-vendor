const { model, Schema } = require('mongoose');

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'superadmin'],
      default: 'admin',
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'disabled'],
      default: 'active',
    },
    lastLogin: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Admin = model('Admin', adminSchema);

module.exports = Admin;
