const Comment = require('../../models/Comment');
const createError = require('../../utils/createError');

const deleteCommentById = async (commentId) => {
  try {
    const deletedComment = await Comment.deleteOne({ _id: commentId });
    return deletedComment;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = deleteCommentById;
