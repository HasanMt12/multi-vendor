const router = require('express').Router();
const { getCategories, createCategories, deleteCategories, updateCategoriesById } = require('../api/v1/categories/controllers');
const { createCategoriesValidation, updateCategoriesByIdValidation } = require('../api/v1/categories/validation');

router.get('/', getCategories);
router.post('/', createCategoriesValidation, createCategories);
router.put('/:id', updateCategoriesByIdValidation, updateCategoriesById);
router.delete('/:id', deleteCategories);

module.exports = router;
