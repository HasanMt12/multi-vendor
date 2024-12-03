const router = require('express').Router();
const { createCollection, deleteCollection, getCollection, updateCollection } = require('../api/v1/collection/controllers');
const updateCollectionValidation = require('../api/v1/collection/validation/updateCollectionValidation');

router.get('/', getCollection);
router.post('/', createCollection);
router.put('/:id', updateCollectionValidation, updateCollection);
router.delete('/:id', deleteCollection);

module.exports = router;
