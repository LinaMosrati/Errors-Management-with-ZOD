export const localeMiddleware = (req, res, next) => {
  const xLang = req.headers['x-language'];
  const acceptLang = req.headers['accept-language'];

  let lang = 'en'; // Par défaut

  if (xLang) {
    lang = xLang.substring(0, 2).toLowerCase();
  } else if (acceptLang) {
    lang = acceptLang.substring(0, 2).toLowerCase();
  }

  const supportedLanguages = ['en', 'fr', 'ar'];
  req.language = supportedLanguages.includes(lang) ? lang : 'en';

  next();
};