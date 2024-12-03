const deleteCategoriesByIdService = require('../../../../services/categories/deleteCategoriesById');
const categoriesByProperty = require('../../../../services/categories/categoriesByProperty');

const deleteCategoriesById = async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;
    if (user.role !== 'admin' && user.role !== 'superadmin') {
      return res.status(403).json({ status: 403, error: 'Forbidden access' });
    }

    const isExistCategories = await categoriesByProperty('_id', id);
    if (!isExistCategories) {
      return res.status(404).json({ status: 404, error: 'Category not found' });
    }

    const deletedCategories = await deleteCategoriesByIdService(id);
    if (deletedCategories.deletedCount > 0) {
      return res.status(200).json({ status: 200, message: 'Delete category success' });
    }
    return res.status(400).json({ status: 400, error: 'Delete category failed' });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteCategoriesById;
