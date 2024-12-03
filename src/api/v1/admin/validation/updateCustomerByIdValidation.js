const { z } = require('zod');
const { bdPhoneRegex, gmailRegex, alphanumericRegex } = require('../../../../constant');
const formatZodErrors = require('../../../../utils/formatZodErrors');

const addressSchema = z.object({
  address1: z.string().optional(),
  address2: z.string().optional(),
  phone: z.string().regex(bdPhoneRegex, 'Only Bangladesh number allowed').optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  zip: z.string().optional(),
  type: z.enum(['default', 'shipping', 'billing']).optional(),
});

const schema = z.object({
  name: z.string().optional(),
  email: z.string().email('Invalid email').regex(gmailRegex, 'Only gmail allowed').optional(),
  password: z.string().min(6, 'Password must be at least 6 characters').regex(alphanumericRegex, 'Password must be one letter & one number').optional(),
  verifiedEmail: z.boolean().optional(),
  phone: z.string().optional(),
  photo: z.string().optional(),
  role: z.enum(['user', 'admin', 'moderator']).optional(),
  status: z.enum(['active', 'inactive']).optional(),
  address: addressSchema.optional(),
  lastOrderId: z.string().optional(),
  orderCount: z.number().int().nonnegative().optional(),
  tags: z.array(z.string()).optional(),
  notes: z.string().optional(),
  totalSpent: z.number().optional(),
  points: z.number().optional(),
  pointsAmount: z.number().optional(),
});

const validateUpdateCustomerById = (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    const result = schema.safeParse(req.body);
    const formattedError = formatZodErrors(result.error);
    res.status(400).json({ status: 400, errors: formattedError });
  }
};

module.exports = validateUpdateCustomerById;
