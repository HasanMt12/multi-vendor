const createError = require('../../utils/createError');
const Blog = require('../../models/Blog');

const getBlogs = async () => {
  try {
    const blogs = await Blog.find({}).populate('authorId', 'name email').exec();
    return blogs;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = getBlogs;
