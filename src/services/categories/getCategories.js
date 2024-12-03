const Category = require('../../models/Category');
const createError = require('../../utils/createError');

const populateSubcategories = (depth) => {
  if (depth === 0) return '';

  return {
    path: 'subcategories',
    select: 'name description subcategories products',
    populate: [
      {
        path: 'subcategories',
        select: 'name description subcategories products',
        populate: populateSubcategories(depth - 1),
      },
      {
        path: 'products',
        select: 'title',
      },
    ],
  };
};

const getCategories = async () => {
  try {
    const categories = await Category.find({ type: 'main', status: 'active' }).populate('products', 'title').populate(populateSubcategories(8));
    return categories;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = getCategories;
