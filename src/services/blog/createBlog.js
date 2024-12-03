const Blog = require('../../models/Blog');

const createBlog = async ({ title, bodyHtml, authorId, authorModel, tags, videos }) => {
  const blogDoc = new Blog({
    title,
    bodyHtml,
    authorId,
    authorModel,
    tags,
    status: 'draft',
    videos,
  });
  const createdBlog = await blogDoc.save();
  return createdBlog._doc;
};

module.exports = createBlog;
