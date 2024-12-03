const { Types } = require('mongoose');
const createError = require('../../utils/createError');
const Blog = require('../../models/Blog');

const updateBlogById = async ({ id, title, bodyHtml, tags, status, videos }) => {
  try {
    const objectId = new Types.ObjectId(id);
    const blog = await Blog.findById(objectId);

    blog.title = title ?? blog.title;
    blog.bodyHtml = bodyHtml ?? blog.bodyHtml;
    blog.tags = tags ?? blog.tags;
    blog.status = status ?? blog.status;
    blog.videos = videos ?? blog.videos;
    blog.publishedAt = status === 'published' ? new Date() : blog.publishedAt;
    blog.updatedAt = new Date();

    const updatedBlog = await blog.save();
    return updatedBlog.populate('authorId', 'name email');
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = updateBlogById;
