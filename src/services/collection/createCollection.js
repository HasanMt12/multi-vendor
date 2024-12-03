const Collection = require('../../models/Collection');
const createError = require('../../utils/createError');

const createCollection = async ({ name, description, ownerId, ownerType }) => {
  try {
    const newCollection = new Collection({ name, description, ownerId, ownerType, products: [] });
    const collection = await newCollection.save();
    return collection._doc;
  } catch (error) {
    createError(error.message, error.status);
  }
};

module.exports = createCollection;
