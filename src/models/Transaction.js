const { model, Schema } = require('mongoose');

const transactionSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'success', 'failed'],
    },
    kind: {
      type: String,
      required: true,
      enum: ['refund', 'payment'],
    },
    paymentGateway: {
      type: String,
      required: true,
      enum: ['bkash', 'rocket', 'nagad'],
    },
    paymentGatewayDetails: {
      type: {
        paymentGatewayNumber: {
          type: String,
          required: true,
        },
        transactionId: {
          type: String,
          required: true,
        },
        transactionTime: {
          type: Date,
          required: true,
        },
      },
      required: true,
    },
  },
  { timestampss: true }
);

module.exports = model('Transaction', transactionSchema);
