import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import swaggerUi from "swagger-ui-express";
import YAML from "yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function setupSwagger(app) {
  const spec = YAML.parse(
    fs.readFileSync(path.join(__dirname, "openapi.yaml"), "utf8")
  );
  app.get("/api-docs.json", (req, res) => res.json(spec));
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));
}