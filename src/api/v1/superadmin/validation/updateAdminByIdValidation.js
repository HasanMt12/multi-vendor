const { z } = require('zod');
const formatZodErrors = require('../../../../utils/formatZodErrors');
const { alphanumericRegex, gmailRegex } = require('../../../../constant');

const schema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  email: z.string().email('Invalid email address').regex(gmailRegex, 'Only gmail allowed'),
  password: z.string().min(6, 'Password must be at least 6 characters long').regex(alphanumericRegex, 'Password must be alphanumeric and contain at least one letter and one number'),
  photo: z.string().url('Invalid URL for photo'),
  status: z.string().refine((data) => data === 'active' || data === 'disabled', { message: 'Status must be either active or disabled' }),
});

const updateAdminByIdValidation = (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    const result = schema.safeParse(req.body);
    const formattedError = formatZodErrors(result.error);
    return res.status(400).json({
      status: 400,
      error: formattedError,
    });
  }
};

module.exports = updateAdminByIdValidation;
