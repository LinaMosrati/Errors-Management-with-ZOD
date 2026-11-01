const translations = {
  en: {
    VALIDATION_ERROR: "Validation failed",
    RESOURCE_NOT_FOUND: "Resource not found",
    UNAUTHORIZED: "Unauthorized access",
    FORBIDDEN: "Forbidden access",
    INTERNAL_ERROR: "Internal server error"
  },
  fr: {
    VALIDATION_ERROR: "Les données envoyées sont invalides",
    RESOURCE_NOT_FOUND: "Ressource introuvable",
    UNAUTHORIZED: "Non authentifié",
    FORBIDDEN: "Accès refusé",
    INTERNAL_ERROR: "Erreur interne du serveur"
  },
  ar: {
    VALIDATION_ERROR: "البيانات المرسلة غير صالحة",
    RESOURCE_NOT_FOUND: "المورد غير موجود",
    UNAUTHORIZED: "غير مصرح بالوصول",
    FORBIDDEN: "الوصول مرفوض",
    INTERNAL_ERROR: "خطأ داخلي في الخادم"
  }
};

export const getTranslation = (lang, code) => {
  const supportedLang = translations[lang] ? lang : 'en';
  return translations[supportedLang][code] || translations['en'][code] || code;
};