const { z } = require('zod');
const formatZodErrors = require('../../../../utils/formatZodErrors');
const { gmailRegex, alphanumericRegex } = require('../../../../constant');

const registrationSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(30, 'Name must be at most 30 characters'),
  email: z.string().email('Enter a valid email').regex(gmailRegex, 'Only gmail allowed'),
  photo: z.string().url('Enter a valid URL'),
  password: z.string().min(6, 'Password must be at least 6 characters').regex(alphanumericRegex, 'Password must be alphanumeric and contain at least one letter and one number'),
});

// admin login validation middleware
const adminRegistrationValidation = (req, res, next) => {
  try {
    req.body = registrationSchema.parse(req.body);
    next();
  } catch (error) {
    const result = registrationSchema.safeParse(req.body);
    res.status(400).json({ status: 400, errors: formatZodErrors(result.error) });
  }
};

module.exports = adminRegistrationValidation;
