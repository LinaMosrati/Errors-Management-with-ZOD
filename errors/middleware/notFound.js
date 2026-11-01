import { AppError } from '../core/AppError.js';
import { errorCodes } from '../core/errorCodes.js';

export const notFound = (req, res, next) => {
  next(new AppError(errorCodes.RESOURCE_NOT_FOUND, 404, `Route non trouvée : ${req.originalUrl}`));
};