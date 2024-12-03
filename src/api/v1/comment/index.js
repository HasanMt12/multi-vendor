const createComment = require('./createComment');
const getCommentByBlogId = require('./getCommentByBlogId');
const updateCommentById = require('./updateCommentById');
const deleteCommentById = require('./deleteCommentById');

module.exports = {
  createComment,
  getCommentByBlogId,
  updateCommentById,
  deleteCommentById,
};
