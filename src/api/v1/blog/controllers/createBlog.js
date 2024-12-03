const createBlogService = require('../../../../services/blog/createBlog');

const createBlog = async (req, res, next) => {
  try {
    const { user } = req;
    const { title, bodyHtml, tags, videos } = req.body;
    if (user.role !== 'admin' && user.role !== 'merchant' && user.role !== 'customer' && user.role !== 'superadmin') {
      return res.status(403).json({ status: 403, message: 'Forbidden access' });
    }
    let authorModel;
    switch (user.role) {
      case 'admin':
        authorModel = 'Admin';
        break;
      case 'merchant':
        authorModel = 'Merchant';
        break;
      case 'customer':
        authorModel = 'Customer';
        break;
      case 'superadmin':
        authorModel = 'Admin';
        break;
      default:
    }
    const createdBlog = await createBlogService({ title, bodyHtml, authorId: user._id, authorModel, tags, videos });

    res.status(201).json({ status: 201, message: 'Blog created successfully', data: createdBlog });
  } catch (error) {
    next(error);
  }
};

module.exports = createBlog;
