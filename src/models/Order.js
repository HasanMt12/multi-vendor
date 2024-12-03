const { model, Schema } = require('mongoose');

const orderSchema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    billingAddress: {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      address1: {
        type: String,
        required: true,
      },
      address2: {
        type: String,
      },
      city: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      zip: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
        default: 'billing',
      },
    },
    shippingAddress: {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      address1: {
        type: String,
        required: true,
      },
      address2: {
        type: String,
      },
      city: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      zip: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
        default: 'shipping',
      },
    },
    lineItems: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quentity: {
          type: Number,
          required: true,
        },
        total: {
          type: Number,
          required: true,
        },
        discount: {
          type: Number,
          required: true,
        },
        size: {
          type: String,
          required: true,
        },
        color: {
          type: String,
          required: true,
        },
        sku: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
      },
    ],
    totalPrices: {
      type: Number,
      required: true,
    },
    totalDiscount: {
      type: Number,
      required: true,
    },
    paymentGateway: {
      type: String,
      required: true,
    },
    cancelReason: {
      type: String,
    },
    merchantId: {
      type: Schema.Types.ObjectId,
      ref: 'Merchant',
    },
    fullfillmentBy: {
      type: String,
      required: true,
      enum: ['gsmartbd', 'merchant'],
    },
    tags: {
      type: [String],
    },
    notes: {
      type: [String],
    },
    status: {
      type: String,
      required: true,
      enum: [
        'pending',
        'confirmed',
        'shipped',
        'delivered',
        'cancelled',
        'refunded',
        'returned',
        'disputed',
        'onhold',
      ],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = model('Order', orderSchema);
