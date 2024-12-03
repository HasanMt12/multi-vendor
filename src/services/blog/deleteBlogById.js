const { Types } = require('mongoose');
const Blog = require('../../models/Blog');
const createError = require('../../utils/createError');

const deleteBlogById = async (id) => {
  try {
    const objectId = new Types.ObjectId(id);
    const blog = await Blog.deleteOne({ _id: objectId });
    return blog;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = deleteBlogById;
