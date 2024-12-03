const getCommentByBlogIdService = require('../../../services/comment/getCommentByBlogId');

const getCommentByBlogId = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    if (!blogId && blogId.length !== 24) {
      return res.status(400).json({ status: 400, error: 'Wrong Blog ID' });
    }
    const comments = await getCommentByBlogIdService(blogId);
    const filterComments = comments.filter((comment) => comment.status === 'active');
    res.status(200).json({ status: 200, message: 'Blog comment found', data: filterComments });
  } catch (error) {
    next(error);
  }
};

module.exports = getCommentByBlogId;
