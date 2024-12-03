const Comment = require('../../models/Comment');
const createError = require('../../utils/createError');

const createComment = async ({ blogId, authorId, authorModel, body }) => {
  try {
    const comment = new Comment({ blogId, authorId, authorModel, body });
    return await comment.save();
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = createComment;
