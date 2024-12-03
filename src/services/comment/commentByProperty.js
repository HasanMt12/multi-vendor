const Comment = require('../../models/Comment');
const createError = require('../../utils/createError');

const commentByproperty = async (property, value, isDoc = true) => {
  try {
    const comment = await Comment.findOne({ [property]: value });
    if (isDoc && comment) return comment._doc;
    return comment;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = commentByproperty;
