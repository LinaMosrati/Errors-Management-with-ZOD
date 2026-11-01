export class AppError extends Error {
  constructor(code, statusCode, message, details = null) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true; // Permet de distinguer les erreurs gérées des bugs inattendus
    
    Error.captureStackTrace(this, this.constructor);
  }
}