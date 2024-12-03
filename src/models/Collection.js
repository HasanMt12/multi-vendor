const { model, Schema } = require('mongoose');

const collectionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'ownerType',
    },
    ownerType: {
      type: String,
      required: true,
      enum: ['Merchant', 'Admin'],
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
    ],
    status: {
      type: String,
      required: true,
      enum: ['active', 'disabled', 'deleted'],
      default: 'active',
    },
    theme: {
      type: String,
      required: true,
      enum: ['grid', 'list'],
      default: 'grid',
    },
  },
  { timestamps: true }
);

const Collection = model('Collection', collectionSchema);
module.exports = Collection;
