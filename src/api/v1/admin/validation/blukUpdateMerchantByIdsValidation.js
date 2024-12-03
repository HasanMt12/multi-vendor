const { z } = require('zod');
const formatZodErrors = require('../../../../utils/formatZodErrors');

const schema = z.object({
  ids: z.array(z.string()),
  status: z.string().refine((status) => status === 'active' || status === 'disabled', {
    message: 'Invalid status',
  }),
});

const blukUpdateMerchantByIdsValidation = async (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    const result = schema.safeParse(req.body);
    const formattedError = formatZodErrors(result.error);
    res.status(400).json({ status: 400, errors: formattedError });
  }
};

module.exports = blukUpdateMerchantByIdsValidation;
