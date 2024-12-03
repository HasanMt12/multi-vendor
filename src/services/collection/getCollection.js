const Collection = require('../../models/Collection');
const createError = require('../../utils/createError');

const getCollection = async (ownerId) => {
  try {
    const collection = ownerId ? await Collection.find({ ownerId }) : await Collection.find();
    return collection;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = getCollection;
