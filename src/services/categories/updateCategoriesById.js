const Category = require('../../models/Category');
const createError = require('../../utils/createError');

const updateCategoriesById = async ({ id, name, description, status, products }) => {
  try {
    const updatedCategories = await Category.updateOne(
      {
        _id: id,
      },
      {
        name,
        description,
        status,
        products,
      }
    );
    return updatedCategories;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = updateCategoriesById;
