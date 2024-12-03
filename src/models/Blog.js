const { model, Schema } = require('mongoose');

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    bodyHtml: {
      type: String,
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      refPath: 'authorModel',
    },
    authorModel: {
      type: String,
      required: true,
      enum: ['Admin', 'Merchant', 'Customer'],
    },
    tags: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['draft', 'published', 'deleted'],
      default: 'draft',
    },
    videos: {
      type: [String],
    },
    publishedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Blog = model('Blog', blogSchema);
module.exports = Blog;
