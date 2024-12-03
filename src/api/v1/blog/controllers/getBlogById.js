const getBlogByIdService = require('../../../../services/blog/getBlogById');

const getBlogById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await getBlogByIdService(id);
    if (!blog) {
      return res.status(404).json({ status: 404, message: 'Blog not found' });
    }
    res.status(200).json({ status: 200, error: 'Blog fetched successfully', data: blog });
  } catch (error) {
    next(error);
  }
};

module.exports = getBlogById;
