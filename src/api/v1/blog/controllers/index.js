const getBlogs = require('./getBlogs');
const createBlog = require('./createBlog');
const getBlogById = require('./getBlogById');
const updateBlogById = require('./updateBlogById');
const deleteBlogById = require('./deleteBlogById');
const deleteBlogsByIds = require('./deleteBlogsByIds');

module.exports = {
  getBlogs,
  createBlog,
  getBlogById,
  updateBlogById,
  deleteBlogById,
  deleteBlogsByIds,
};
