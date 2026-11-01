import { AppError } from './AppError.js';
import { errorCodes } from './errorCodes.js';

export const errorFactory = {
  badRequest(message = "Les données envoyées sont invalides", details = null) {
    return new AppError(errorCodes.VALIDATION_ERROR, 400, message, details);
  },

  notFound(message = "Resource not found", details = null) {
    return new AppError(errorCodes.RESOURCE_NOT_FOUND, 404, message, details);
  },

  unauthorized(message = "Non authentifié", details = null) {
    return new AppError(errorCodes.UNAUTHORIZED, 401, message, details);
  },

  forbidden(message = "Accès refusé", details = null) {
    return new AppError(errorCodes.FORBIDDEN, 403, message, details);
  },

  internal(message = "Erreur interne du serveur", details = null) {
    return new AppError(errorCodes.INTERNAL_ERROR, 500, message, details);
  }
};