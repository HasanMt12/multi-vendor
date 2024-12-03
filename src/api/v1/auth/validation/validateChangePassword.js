const { z } = require('zod');
const { alphanumericRegex } = require('../../../../constant');
const formatZodErrors = require('../../../../utils/formatZodErrors');

const validateChangePassword = (req, res, next) => {
  const schema = z.object({
    oldPassword: z.string(),
    newPassword: z.string().min(6, 'Password must be at least 6 characters').regex(alphanumericRegex, 'Password must be alphanumeric and contain at least one letter and one number'),
  });

  try {
    req.body = schema.parse(req.body);
    next();
  } catch (e) {
    const result = schema.safeParse(req.body);
    res.status(400).json({ status: 400, errors: formatZodErrors(result.error) });
  }
};

module.exports = validateChangePassword;
