// Function to transform Zod errors into a custom format
const formatZodErrors = (zodError) =>
  zodError.errors.map((err) => ({
    field: err.path.join('.'), // E.g., "email"
    message: err.message, // Error message
  }));

module.exports = formatZodErrors;
