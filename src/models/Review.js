const { model, Schema } = require('mongoose');

const reviewSchema = new Schema(
  {
    reviewType: {
      type: String,
      required: true,
      enum: ['product', 'merchant'],
    },
    typeId: {
      type: Schema.Types.ObjectId,
      refPath: 'typeModel',
      required: true,
    },
    typeModel: {
      type: String,
      required: true,
      enum: ['Product', 'Merchant'],
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    reviewText: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model('Review', reviewSchema);
