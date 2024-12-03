const Category = require('../../models/Category');
const createError = require('../../utils/createError');

const createCategories = async ({ name, description, type }) => {
  try {
    const category = new Category({ name, description, type });
    await category.save();
    return category._doc;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = createCategories;
