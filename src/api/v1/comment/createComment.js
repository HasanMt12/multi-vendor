const blogByProperty = require('../../../services/blog/blogByProperty');
const createCommentService = require('../../../services/comment/createComment');

const createComment = async (req, res, next) => {
  try {
    const { user } = req;
    const { blogId, body } = req.body;

    if (!body || body.length < 1) {
      return res.status(400).json({ status: 400, error: 'Comment body is required' });
    }

    const blog = await blogByProperty('_id', blogId);
    if (!blog) {
      return res.status(404).json({ status: 404, error: 'Blog not found' });
    }

    let authorModel;
    switch (user.role) {
      case 'admin':
        authorModel = 'Admin';
        break;
      case 'customer':
        authorModel = 'Customer';
        break;
      case 'merchant':
        authorModel = 'Merchant';
        break;
      case 'superadmin':
        authorModel = 'Admin';
        break;
      default:
    }

    const comment = await createCommentService({ blogId, authorId: user._id, authorModel, body });

    return res.status(201).json({ status: 201, message: 'Comment created successfully', data: comment });
  } catch (error) {
    next(error);
  }
};

module.exports = createComment;
