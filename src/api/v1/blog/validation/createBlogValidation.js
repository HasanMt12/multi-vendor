const { z } = require('zod');
const formatZodErrors = require('../../../../utils/formatZodErrors');

const schema = z.object({
  title: z.string(),
  bodyHtml: z.string(),
  tags: z.array(z.string()),
  videos: z.array(z.string()),
});

const createBlogValidation = (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    const result = schema.safeParse(req.body);
    res.status(400).json({ status: 400, errors: formatZodErrors(result.error) });
  }
};

module.exports = createBlogValidation;
