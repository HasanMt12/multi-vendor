const { z } = require('zod');
const formatZodErrors = require('../../../../utils/formatZodErrors');

const schema = z.object({
  description: z.string().min(5).max(255).optional(),
  code: z.string().min(5).max(255).optional(),
  discount: z.number().min(1).max(100).optional(),
  startAt: z.string().optional(),
  endAt: z.string().optional(),
  usageLimit: z.number().min(1).optional(),
  status: z
    .string()
    .refine((data) => data === 'active' || data === 'disabled', {
      message: 'status must be active or disabled',
    })
    .optional(),
});

const updateCouponsValidation = async (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    const result = schema.safeParse(req.body);
    res.status(400).json({ status: 400, errors: formatZodErrors(result.error) });
  }
};

module.exports = updateCouponsValidation;
