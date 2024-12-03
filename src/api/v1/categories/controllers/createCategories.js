const categoriesByProperty = require('../../../../services/categories/categoriesByProperty');
const createCategoriesService = require('../../../../services/categories/createCategories');

const createCategories = async (req, res, next) => {
  try {
    const { user } = req;
    const { name, description, parentCategoriesId, type } = req.body;
    if (user.role !== 'admin' && user.role !== 'superadmin') {
      return res.status(403).json({ status: 403, error: 'Forbidden access' });
    }

    const isExistCategories = await categoriesByProperty('name', name);
    if (isExistCategories) {
      return res.status(400).json({ status: 400, error: 'Category already exist' });
    }

    const categories = await createCategoriesService({ name, description, type });

    if (parentCategoriesId) {
      const parentCategories = await categoriesByProperty('_id', parentCategoriesId, false);
      if (!parentCategories) {
        return res.status(404).json({ status: 404, error: 'Parent category not found' });
      }
      if (parentCategories.subcategories.includes(categories._id)) {
        return res.status(400).json({ status: 400, error: 'Subcategory already exist' });
      }
      parentCategories.subcategories.push(categories._id);
      await parentCategories.save();
      return res.status(201).json({ status: 201, message: 'Subcategory created successfully', data: parentCategories });
    }

    res.status(201).json({ status: 201, message: 'Category created successfully', data: categories });
  } catch (error) {
    next(error);
  }
};

module.exports = createCategories;
