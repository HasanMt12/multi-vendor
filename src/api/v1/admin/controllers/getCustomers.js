const getCustomersService = require('../../../../services/customer/getCustomers');

const getCustomers = async (req, res, next) => {
  try {
    const { user } = req;
    if (user.role !== 'admin' && user.role !== 'superadmin') {
      return res.status(403).json({ status: 403, error: 'Forbidden access' });
    }

    const customers = await getCustomersService();

    const filteredCustomers = customers.map((customer) => {
      const customerDoc = customer._doc;
      delete customerDoc.address;
      delete customerDoc.tags;
      delete customerDoc.notes;
      delete customerDoc.password;
      delete customerDoc.createdAt;
      delete customerDoc.updatedAt;
      delete customerDoc.__v;
      return customerDoc;
    });

    return res.status(200).json({ status: 200, message: 'Customers retrieved successfully', data: filteredCustomers });
  } catch (error) {
    next(error);
  }
};

module.exports = getCustomers;
