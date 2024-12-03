const { model, Schema } = require('mongoose');

const reelsSchema = new Schema(
  {
    merchantId: {
      type: Schema.Types.ObjectId,
      ref: 'Merchant',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    reelLink: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'disabled'],
      default: 'active',
    },
  },
  { timestamps: true }
);

module.exports = model('Reels', reelsSchema);
