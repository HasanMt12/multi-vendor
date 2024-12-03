const getCategoriesService = require('../../../../services/categories/getCategories');

const getCategories = async (req, res, next) => {
  try {
    const categories = await getCategoriesService();
    categories.forEach((category) => {
      const categoryDoc = category._doc;
      delete categoryDoc.__v;
      delete categoryDoc.createdAt;
      delete categoryDoc.updatedAt;
      delete categoryDoc.type;
      delete categoryDoc.status;
      return categoryDoc;
    });
    res.status(200).json({ status: 200, message: 'Get categories success', data: categories });
  } catch (error) {
    next(error);
  }
};

module.exports = getCategories;
