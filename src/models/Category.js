const { model, Schema } = require('mongoose');

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
    },
    subcategories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
      },
    ],
    status: {
      type: String,
      required: true,
      enum: ['active', 'disabled', 'deleted'],
      default: 'active',
    },
    type: {
      type: String,
      required: true,
      enum: ['main', 'sub'],
      default: 'main',
    },
  },
  { timestamps: true }
);

const Category = model('Category', categorySchema);
module.exports = Category;
