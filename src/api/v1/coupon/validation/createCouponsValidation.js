const { z } = require('zod');
const formatZodErrors = require('../../../../utils/formatZodErrors');

const schema = z.object({
  description: z.string().min(5).max(255),
  code: z.string().min(5).max(255),
  discount: z.number().min(1).max(100),
  startAt: z.string(),
  endAt: z.string(),
  usageLimit: z.number().min(1),
  status: z.string().optional(),
});

const createCouponsValidation = (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    const result = schema.safeParse(req.body);
    res.status(400).json({ status: 400, errors: formatZodErrors(result.error) });
  }
};

module.exports = createCouponsValidation;
