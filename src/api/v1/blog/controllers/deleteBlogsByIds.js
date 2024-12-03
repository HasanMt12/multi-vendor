const deleteBlogsByIdsService = require('../../../../services/blog/deleteBlogsByIds');

const deleteBlogsByIds = async (req, res, next) => {
  try {
    const { user } = req;
    const { ids } = req.body;
    if (user.role !== 'admin' && user.role !== 'super-admin') {
      return res.status(403).json({
        status: 403,
        error: 'Forbidden access',
      });
    }
    if (!Array.isArray(ids) || (Array.isArray(ids) && ids.length === 0)) {
      return res.status(400).json({
        status: 400,
        error: 'Expected an array of ids',
      });
    }
    const deletedBlogs = await deleteBlogsByIdsService(ids);

    if (deletedBlogs.deletedCount > 0) {
      return res.status(200).json({
        status: 200,
        message: 'Blogs deleted successfully',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = deleteBlogsByIds;
