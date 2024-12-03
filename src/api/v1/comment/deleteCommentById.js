const deleteCommentByIdService = require('../../../services/comment/deleteCommentById');
const commentByproperty = require('../../../services/comment/commentByProperty');

const deleteCommentById = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { user } = req;

    if (!commentId || commentId.length !== 24) {
      return res.status(400).json({ status: 400, error: 'Wrong Comment ID' });
    }

    const comment = await commentByproperty('_id', commentId);
    if (!comment) {
      return res.status(404).json({ status: 404, error: 'Comment not found' });
    }

    if (comment.authorId === user._id || user.role === 'admin' || user.role === 'superadmin') {
      const updatedComment = await deleteCommentByIdService(commentId);
      if (updatedComment.deletedCount === 1) {
        return res.status(200).json({ status: 200, message: 'Comment deleted successfully' });
      }
    }

    return res.status(403).json({ status: 403, error: 'Forbidden Access' });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteCommentById;
