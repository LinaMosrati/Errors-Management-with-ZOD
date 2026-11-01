import express from "express";
import cors from "cors";
import router from "./router/task.routes.js";
import authRouter from "./router/auth.routes.js";
// Importe tes middlewares centralisés depuis ton dossier errors
import { localeMiddleware, notFound, errorHandler } from "./errors/index.js"; 

const app = express();

// 1. Middlewares globaux essentiels
app.use(cors());
app.use(express.json());

// 2. Logger de requêtes (Placé en haut pour intercepter toutes les requêtes entrantes)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// 3. Middleware de détection de la langue (X-Language / Accept-Language)
app.use(localeMiddleware);

// 4. Déclaration des routes de l'API
app.use("/api/tasks", router);
app.use("/api/auth", authRouter);

// 5. Gestion des routes introuvables (404) -> Doit être après toutes les routes valides
app.use(notFound);

// 6. Gestionnaire global d'erreurs -> DOIT IMPÉRATIVEMENT ÊTRE EN DERNIER
app.use(errorHandler);

export default app;