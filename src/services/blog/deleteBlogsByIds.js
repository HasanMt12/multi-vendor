const Blog = require('../../models/Blog');
const createError = require('../../utils/createError');

const deleteBlogsByIds = async (ids) => {
  try {
    const deletedBlogs = await Blog.deleteMany({ _id: { $in: ids } });
    return deletedBlogs;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = deleteBlogsByIds;
