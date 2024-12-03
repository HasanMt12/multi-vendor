const Comment = require('../../models/Comment');
const createError = require('../../utils/createError');

const getCommentByBlogId = async (blogId) => {
  try {
    const comments = await Comment.find({ blogId }).populate('authorId', 'username email');
    return comments;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = getCommentByBlogId;
