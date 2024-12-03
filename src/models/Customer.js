const { model, Schema } = require('mongoose');

const addressSchema = new Schema({
  address1: { type: String, required: true, default: 'Address1' },
  address2: { type: String },
  phone: { type: String, required: true, default: '0000000000' },
  city: { type: String, required: true, default: 'City' },
  district: { type: String, required: true, default: 'District' },
  zip: { type: String, required: true, default: '0000' },
  type: {
    type: String,
    required: true,
    enum: ['default', 'shipping', 'billing'],
    default: 'default',
  },
});

const customerSchema = new Schema(
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
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verifiedEmail: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['customer'],
      default: 'customer',
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'disabled', 'deleted'],
      default: 'disabled',
    },
    address: {
      type: addressSchema,
    },
    lastOrderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      default: null,
    },
    orderCount: {
      type: Number,
      required: true,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    notes: {
      type: [String],
      default: [],
    },
    totalSpent: {
      type: Number,
      required: true,
      default: 0,
    },
    points: {
      type: Number,
      required: true,
      default: 0,
    },
    pointsAmount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Customer = model('Customer', customerSchema);

module.exports = Customer;
