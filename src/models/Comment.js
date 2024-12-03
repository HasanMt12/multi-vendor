const { model, Schema } = require('mongoose');

const commentSchema = new Schema(
  {
    blogId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Blog',
    },
    authorId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'authorModel',
    },
    authorModel: {
      type: String,
      required: true,
      enum: ['Merchnat', 'Customer', 'Admin'],
    },
    body: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'deleted'],
      default: 'active',
    },
  },
  { timestamps: true }
);

const Comment = model('Comment', commentSchema);
module.exports = Comment;
