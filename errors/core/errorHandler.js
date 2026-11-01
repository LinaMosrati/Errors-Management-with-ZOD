import { logger } from '../logging/logger.js';
import { getTranslation } from '../localization/translation.js';

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorCode = err.code || 'INTERNAL_ERROR';
  const lang = req.language || 'en';

  const message = err.isOperational 
    ? getTranslation(lang, errorCode) 
    : (process.env.NODE_ENV === 'production' ? getTranslation(lang, 'INTERNAL_ERROR') : err.message);

  if (statusCode >= 500) {
    logger.error({ err, req }, err.message);
  } else {
    logger.warn({ errCode: errorCode, path: req.originalUrl }, err.message);
  }

  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message,
      details: err.details || null
    }
  });
};