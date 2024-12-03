const { z } = require('zod');
const formatZodErrors = require('../../../../utils/formatZodErrors');

const schema = z.object({
  title: z.string().optional(),
  bodyHtml: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z
    .string()
    .refine((val) => val === 'draft' || val === 'published' || val === 'deleted')
    .optional(),
  videos: z.array(z.string()).optional(),
});

const updateBlogByIdValidation = (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    const result = schema.safeParse(req.body);
    res.status(400).json({ status: 400, errors: formatZodErrors(result.error) });
  }
};

module.exports = updateBlogByIdValidation;
