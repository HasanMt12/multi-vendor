const updateCollectionService = require('../../../../services/collection/updateCollection');
const collectionByProperty = require('../../../../services/collection/collectionByProperty');

const updateCollection = async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const { name, description, products, status, theme } = req.body;
    const isExistCollection = await collectionByProperty('_id', id);
    if (!isExistCollection) {
      return res.status(404).json({ status: 404, error: 'Collection not found' });
    }
    if ((user.role !== 'merchant' && user.role !== 'admin') || isExistCollection.ownerId.toString() !== user._id.toString()) {
      return res.status(403).json({ status: 403, error: 'Forbidden Access' });
    }

    await updateCollectionService({ id, name, description, products, status, theme });
    res.status(200).json({ status: 200, message: 'Collection updated successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = updateCollection;
