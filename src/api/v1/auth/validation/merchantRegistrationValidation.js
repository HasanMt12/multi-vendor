const { z } = require('zod');
const { gmailRegex, bdPhoneRegex, alphanumericRegex } = require('../../../../constant');
const formatZodErrors = require('../../../../utils/formatZodErrors');

const merchantRegistrationSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email().regex(gmailRegex, 'Only gmail accounts are allowed'),
  password: z.string().min(6).regex(alphanumericRegex, 'Password must contain at least one letter and one number'),
  phone: z.string().regex(bdPhoneRegex, 'Bangladeshi phone number required'),
  logo: z.string().url(),
});

const merchantRegistrationValidation = async (req, res, next) => {
  try {
    req.body = merchantRegistrationSchema.parse(req.body);
    next();
  } catch (error) {
    const result = merchantRegistrationSchema.safeParse(req.body);
    res.status(400).json({ status: 400, errors: formatZodErrors(result.error) });
  }
};

module.exports = merchantRegistrationValidation;
