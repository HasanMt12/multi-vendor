const getBlogsService = require('../../../../services/blog/getBlogs');

const getBlogs = async (req, res, next) => {
  try {
    const blogs = await getBlogsService();
    res.status(200).json({ status: 200, message: 'Blogs fetched successfully', data: blogs });
  } catch (e) {
    next(e);
  }
};

module.exports = getBlogs;
