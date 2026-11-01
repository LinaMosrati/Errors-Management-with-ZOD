import { AppError } from '../core/AppError.js';
import { errorCodes } from '../core/errorCodes.js';

export const validateRequest = (schema) => {
  return async (req, res, next) => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      req.body = parsed.body;
      req.query = parsed.query;
      req.params = parsed.params;
      next();
    } catch (error) {
      const details = error.errors ? error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      })) : null;

      next(new AppError(errorCodes.VALIDATION_ERROR, 400, "Validation failed", details));
    }
  };
};