const collectionByProperty = require('../../../../services/collection/collectionByProperty');
const getCollectionService = require('../../../../services/collection/getCollection');

const getCollection = async (req, res, next) => {
  try {
    const { id } = req.query;

    if (id) {
      const isExistCollection = await collectionByProperty('ownerId', id);
      if (!isExistCollection) {
        return res.status(404).json({ status: 404, error: 'Collection not found' });
      }
      const collection = await getCollectionService(id);
      return res.status(200).json({ status: 200, message: 'Collection retrieved successfully', data: collection });
    }
    const collection = await getCollectionService();
    return res.status(200).json({ status: 200, message: 'Collection retrieved successfully', data: collection });
  } catch (error) {
    next(error);
  }
};

module.exports = getCollection;
