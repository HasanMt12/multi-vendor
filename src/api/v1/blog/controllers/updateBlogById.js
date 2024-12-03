const blogByProperty = require('../../../../services/blog/blogByProperty');
const updateBlogByIdService = require('../../../../services/blog/updateBlogById');

const updateBlogById = async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const { title, bodyHtml, tags, status, videos } = req.body;

    const isExistBlog = await blogByProperty('_id', id);
    if (!isExistBlog) {
      return res.status(404).json({ status: 404, message: 'Blog not found' });
    }

    let blog;
    switch (user.role) {
      case 'admin':
        blog = await updateBlogByIdService({ id, title, bodyHtml, tags, status, videos });
        break;
      case 'superadmin':
        blog = await updateBlogByIdService({ id, title, bodyHtml, tags, status, videos });
        break;
      case 'customer':
        blog = await updateBlogByIdService({ id, title, bodyHtml, tags, videos });
        break;
      case 'merchant':
        blog = await updateBlogByIdService({ id, title, bodyHtml, tags, videos });
        break;
      default:
    }
    res.status(200).json({ status: 200, message: 'Blog updated successfully', data: blog });
  } catch (error) {
    next(error);
  }
};

module.exports = updateBlogById;
