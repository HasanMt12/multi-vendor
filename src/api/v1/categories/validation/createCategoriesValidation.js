const { z } = require('zod');
const formatZodErrors = require('../../../../utils/formatZodErrors');

const schema = z.object({
  name: z.string().max(255),
  description: z.string().max(255),
  type: z.string().max(255).optional(),
  parentCategoriesId: z.string().max(255).optional(),
});

const createCategoriesValidation = (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    const result = schema.safeParse(req.body);
    res.status(400).json({ status: 400, errors: formatZodErrors(result.error) });
  }
};

module.exports = createCategoriesValidation;
