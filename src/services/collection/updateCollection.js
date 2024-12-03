const Collection = require('../../models/Collection');
const createError = require('../../utils/createError');

const updateCollection = async ({ id, name, description, products, status, theme }) => {
  try {
    const collection = await Collection.findOneAndUpdate({ _id: id }, { name, description, products, status, theme });
    return collection;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = updateCollection;
