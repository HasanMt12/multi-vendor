const Collection = require('../../models/Collection');
const createError = require('../../utils/createError');

const deleteCollection = async (collectionId) => {
  try {
    const collection = await Collection.deleteOne({ _id: collectionId });
    return collection;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = deleteCollection;
