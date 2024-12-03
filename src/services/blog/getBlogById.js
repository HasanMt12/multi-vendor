const { Types } = require('mongoose');
const createError = require('../../utils/createError');
const Blog = require('../../models/Blog');

const getBlogById = async (id) => {
  try {
    const objectId = new Types.ObjectId(id);
    const blog = await Blog.findById(objectId).populate('authorId', 'name email').exec();
    return blog;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = getBlogById;
