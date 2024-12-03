const Collection = require('../../models/Collection');
const createError = require('../../utils/createError');

const collectionByProperty = async (property, value, isDoc = true) => {
  try {
    const collection = await Collection.findOne({ [property]: value });
    if (isDoc && collection) return collection._doc;
    return collection;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = collectionByProperty;
