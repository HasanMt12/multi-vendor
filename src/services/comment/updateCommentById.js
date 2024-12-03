const { Types } = require('mongoose');
const Comment = require('../../models/Comment');
const createError = require('../../utils/createError');

const updateCommentById = async ({ id, body, status }) => {
  try {
    const objectId = new Types.ObjectId(id);
    const comment = await Comment.findById(objectId);
    comment.body = body ?? comment.body;
    comment.status = status ?? comment.status;
    return await comment.save();
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = updateCommentById;
