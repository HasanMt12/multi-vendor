const Blog = require('../../models/Blog');
const createError = require('../../utils/createError');

const blogByProperty = async (property, value, isDoc = true) => {
  try {
    const blog = await Blog.findOne({ [property]: value })
      .populate('authorId', 'name email')
      .exec();
    if (isDoc && blog) return blog._doc;
    return blog;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = blogByProperty;
