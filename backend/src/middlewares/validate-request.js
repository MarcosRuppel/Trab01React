import { ZodError } from 'zod';

export const validateRequest = (schema) => {
  return async (req, res, next) => {
    try {
      // Validate request body against schema
      const validatedData = await schema.parseAsync(req.body);
      
      // Replace request body with validated data
      req.body = validatedData;
      
      next();
    } catch (error) {
      // Handle Zod validation errors
      if (error instanceof ZodError) {
        res.status(400).json({
          message: 'Validation error',
          errors: error.errors.map(err => ({
            path: err.path.join('.'),
            message: err.message
          }))
        });
        return; 
      }
      
      // Handle other errors
      res.status(500).json({ message: 'Internal server error' });
      return; 
    }
  };
};
