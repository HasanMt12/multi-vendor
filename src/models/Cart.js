const { model, Schema } = require('mongoose');

const cartSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Customer',
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        total: {
          type: Number,
          required: true,
          default: 0,
        },
        varient: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = model('Cart', cartSchema);
