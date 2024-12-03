const createCollectionService = require('../../../../services/collection/createCollection');

const createCollection = async (req, res, next) => {
  try {
    const { user } = req;
    const { name, description } = req.body;
    if (user.role !== 'merchant' && user.role !== 'admin') {
      return res.status(403).json({ status: 403, error: 'Forbidden Access' });
    }
    if (!name || !description) {
      return res.status(400).json({ status: 400, error: 'Name and Description are required' });
    }
    const ownerType = user.role === 'admin' ? 'Admin' : 'Merchant';
    const collection = await createCollectionService({ name, description, ownerId: user._id, ownerType });
    if (!collection) {
      return res.status(400).json({ status: 400, error: 'Collection not created' });
    }
    // delete unnecessary fields
    delete collection.createdAt;
    delete collection.updatedAt;
    delete collection.__v;
    return res.status(201).json({ status: 201, message: 'Collection created successfully', data: collection });
  } catch (error) {
    next(error);
  }
};

module.exports = createCollection;
