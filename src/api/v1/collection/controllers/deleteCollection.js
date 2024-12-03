const collectionByProperty = require('../../../../services/collection/collectionByProperty');
const deleteCollectionService = require('../../../../services/collection/deleteCollection');

const deleteCollection = async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const isExistCollection = await collectionByProperty('_id', id);
    if (!isExistCollection) {
      return res.status(404).json({ status: 404, error: 'Collection not found' });
    }
    if (isExistCollection.ownerId !== user._id) {
      return res.status(403).json({ status: 403, error: 'Forbidden Access' });
    }
    if (!id) {
      return res.status(400).json({ status: 400, error: 'Collection ID is required' });
    }
    const collection = await deleteCollectionService(id);
    if (collection.deletedCount === 0) {
      return res.status(404).json({ status: 404, error: 'Collection not found' });
    }
    res.status(200).json({ status: 200, message: 'Collection deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteCollection;
