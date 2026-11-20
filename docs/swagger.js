import swaggerUi from "swagger-ui-express";
import { generateAutoSpec } from "./openapi.auto.js";

export function setupSwagger(app) {
  const spec = generateAutoSpec();
  app.get("/api-docs.json", (req, res) => res.json(spec));
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));
}