const { z } = require('zod');
const formatZodErrors = require('../../../../utils/formatZodErrors');

const schema = z.object({
  name: z.string().max(255).optional(),
  description: z.string().max(255).optional(),
  products: z.array(z.string()).optional(),
  status: z.enum(['active', 'disabled', 'deleted']).optional(),
  theme: z.enum(['grid', 'list']).optional(),
});

const updateCollectionValidation = (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    const result = schema.safeParse(req.body);
    res.status(400).json({ status: 400, errors: formatZodErrors(result.error) });
  }
};

module.exports = updateCollectionValidation;
