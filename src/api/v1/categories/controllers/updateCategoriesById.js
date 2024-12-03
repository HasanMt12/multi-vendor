const categoriesByProperty = require('../../../../services/categories/categoriesByProperty');
const updateCategoriesByIdService = require('../../../../services/categories/updateCategoriesById');

const updateCategoriesById = async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const { name, description, status, products } = req.body;

    if (user.role !== 'admin' && user.role !== 'superadmin') {
      return res.status(403).json({ status: 403, error: 'Forbidden access' });
    }

    const isExistCategories = await categoriesByProperty('_id', id);
    if (!isExistCategories) {
      return res.status(404).json({ status: 404, error: 'Category not found' });
    }

    const updatedCategories = await updateCategoriesByIdService({ id, name, description, status, products });

    if (updatedCategories.modifiedCount > 0) {
      return res.status(200).json({ status: 200, message: 'Update category success' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = updateCategoriesById;
