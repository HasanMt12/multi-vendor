const Category = require('../../models/Category');
const createError = require('../../utils/createError');

const deleteCategoriesById = async (id) => {
  try {
    const category = await Category.deleteOne({ _id: id });
    return category;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = deleteCategoriesById;
