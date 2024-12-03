const blogByProperty = require('../../../../services/blog/blogByProperty');
const deleteBlogByIdService = require('../../../../services/blog/deleteBlogById');

const deleteBlogById = async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const isExistBlog = await blogByProperty('_id', id);
    if (!isExistBlog) {
      return res.status(404).json({ status: 404, message: 'Blog not found' });
    }
    if (user.role === 'admin' || user.role === 'superadmin' || user.role === isExistBlog.authorModel.toLowerCase()) {
      const deletedBlog = await deleteBlogByIdService(id);
      if (deletedBlog.deletedCount > 0) {
        return res.status(200).json({ status: 200, message: 'Blog deleted successfully' });
      }
    }
    return res.status(403).json({ status: 403, error: 'Forbidden access' });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteBlogById;
