const { z } = require('zod');
const formatZodErrors = require('../../../../utils/formatZodErrors');
const { gmailRegex, alphanumericRegex } = require('../../../../constant');

// admin login validation schema
const loginSchema = z.object({
  email: z.string().email('Enter a valid email').regex(gmailRegex, 'Only gmail allowed'),
  password: z.string().min(6, 'Password must be at least 6 characters').regex(alphanumericRegex, 'Password must be alphanumeric and contain at least one letter and one number'),
});

// admin login validation middleware
const loginValidation = (req, res, next) => {
  try {
    req.body = loginSchema.parse(req.body);
    next();
  } catch (error) {
    const result = loginSchema.safeParse(req.body);
    res.status(400).json({ status: 400, errors: formatZodErrors(result.error) });
  }
};

module.exports = loginValidation;
