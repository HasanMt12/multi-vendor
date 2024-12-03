const Category = require('../../models/Category');
const createError = require('../../utils/createError');

const categoriesByProperty = async (property, value, isDoc = true) => {
  try {
    const categories = await Category.findOne({ [property]: value });
    if (isDoc && categories) return categories._doc;
    return categories;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = categoriesByProperty;
