const { model, Schema } = require('mongoose');

const discountSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        'fixed',
        'percentage',
        'free-shipping',
        'buy-one-get-one',
        'coupon',
      ],
    },
    discount: {
      type: Number,
      required: true,
    },
    startAt: {
      type: Date,
      required: true,
    },
    endAt: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'disabled'],
      default: 'active',
    },
    usageLimit: {
      type: Number,
      required: true,
    },
    minPurchase: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model('Discount', discountSchema);
