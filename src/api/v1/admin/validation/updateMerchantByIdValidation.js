const { z } = require('zod');
const formatZodErrors = require('../../../../utils/formatZodErrors');
const { alphanumericRegex, gmailRegex, bdPhoneRegex } = require('../../../../constant');

const schema = z.object({
  name: z.string().optional(),
  email: z.string().email('Enter a valid email').regex(gmailRegex, 'Only gmail allowed').optional(),
  password: z.string().min(6, 'Password must be at least 6 characters').regex(alphanumericRegex, 'Password must be alphanumeric and contain at least one letter and one number').optional(),
  phone: z.string().regex(bdPhoneRegex, 'Bangladeshi phone number required').optional(),
  status: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  products: z.array(z.string()).optional(),
  website: z.string().url().optional(),
  description: z.string().optional(),
  logo: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  notes: z.array(z.string()).optional(),
  verificationInfo: z
    .object({
      nationalId: z.string().optional(),
      businessLicense: z.string().optional(),
    })
    .optional(),
  address: z
    .object({
      district: z.string().optional(),
      city: z.string().optional(),
      address1: z.string().optional(),
      address2: z.string().optional(),
    })
    .optional(),
  reviews: z.array(z.string()).optional(),
});

const updateMerchantByIdValidation = (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    const result = schema.safeParse(req.body);
    const formattedError = formatZodErrors(result.error);
    res.status(400).json({ status: 400, errors: formattedError });
  }
};

module.exports = updateMerchantByIdValidation;
