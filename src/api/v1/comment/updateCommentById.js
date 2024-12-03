const commentByproperty = require('../../../services/comment/commentByProperty');
const updateCommentByIdService = require('../../../services/comment/updateCommentById');

const updateCommentById = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { user } = req;
    const { body, status } = req.body;

    if (!commentId || commentId.length !== 24) {
      return res.status(400).json({ status: 400, error: 'Wrong Comment ID' });
    }

    if (!body || body.length < 1 || (status && status !== 'active' && status !== 'deleted')) {
      return res.status(400).json({ status: 400, error: 'body required & status will be active or deleted' });
    }

    const comment = await commentByproperty('_id', commentId);
    if (!comment) {
      return res.status(404).json({ status: 404, error: 'Comment not found' });
    }

    if (comment.authorId === user._id || user.role === 'admin' || user.role === 'superadmin') {
      const updatedComment = await updateCommentByIdService({ id: commentId, body, status });
      return res.status(200).json({ status: 200, message: 'Comment updated successfully', data: updatedComment });
    }

    return res.status(403).json({ status: 403, error: 'Forbidden Access' });
  } catch (error) {
    next(error);
  }
};

module.exports = updateCommentById;
