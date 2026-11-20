import { z } from "zod";
import {
  extendZodWithOpenApi,
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import { createTaskSchema, updateTaskSchema } from "../validations/task.schema.js";

extendZodWithOpenApi(z);

const registry = new OpenAPIRegistry();

registry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

/* ---------- Schémas ---------- */

// Auth : pas encore de schéma Zod dans ton projet, on le définit ici.
// Idéalement, déplace-les dans validations/auth.schema.js et utilise-les dans les routes.
const credentialsSchema = z
  .object({
    email: z.string().email().openapi({ example: "user@example.com" }),
    password: z.string().min(6).openapi({ example: "Secret123" }),
  })
  .openapi("Credentials");

const userSchema = z
  .object({ id: z.string(), email: z.string().email() })
  .openapi("User");

const taskSchema = z
  .object({
    _id: z.string().openapi({ example: "665f1c2a9b1e8a0012a4b7c3" }),
    title: z.string(),
    done: z.boolean(),
    duration: z.number(),
  })
  .openapi("Task");

const errorSchema = z
  .object({
    success: z.literal(false),
    error: z.object({
      code: z.string().openapi({ example: "VALIDATION_ERROR" }),
      message: z.string(),
      details: z
        .array(z.object({ field: z.string(), message: z.string() }))
        .nullable(),
    }),
  })
  .openapi("ErrorResponse");

const success = (data) =>
  z.object({ success: z.literal(true), data, message: z.string() });

const json = (schema) => ({ "application/json": { schema } });
const idParams = z.object({
  id: z.string().openapi({ example: "665f1c2a9b1e8a0012a4b7c3" }),
});
const security = [{ bearerAuth: [] }];

const err = (description) => ({ description, content: json(errorSchema) });

/* ---------- Auth ---------- */

registry.registerPath({
  method: "post",
  path: "/api/auth/signup",
  tags: ["Auth"],
  summary: "Créer un compte",
  request: { body: { required: true, content: json(credentialsSchema) } },
  responses: {
    201: { description: "Utilisateur créé", content: json(success(userSchema)) },
    400: err("Données invalides"),
  },
});

registry.registerPath({
  method: "post",
  path: "/api/auth/login",
  tags: ["Auth"],
  summary: "Se connecter et obtenir un JWT",
  request: { body: { required: true, content: json(credentialsSchema) } },
  responses: {
    200: {
      description: "Connexion réussie",
      content: json(success(z.object({ token: z.string() }))),
    },
    401: err("Identifiants invalides"),
  },
});

/* ---------- Tasks (les corps viennent directement de tes schémas Zod) ---------- */

registry.registerPath({
  method: "get",
  path: "/api/tasks",
  tags: ["Tasks"],
  summary: "Lister toutes les tâches",
  security,
  responses: {
    200: { description: "Liste des tâches", content: json(success(z.array(taskSchema))) },
    401: err("Non authentifié"),
  },
});

registry.registerPath({
  method: "post",
  path: "/api/tasks",
  tags: ["Tasks"],
  summary: "Créer une tâche",
  security,
  request: { body: { required: true, content: json(createTaskSchema.shape.body) } },
  responses: {
    201: { description: "Tâche créée", content: json(success(taskSchema)) },
    400: err("Données invalides"),
    401: err("Non authentifié"),
  },
});

registry.registerPath({
  method: "get",
  path: "/api/tasks/{id}",
  tags: ["Tasks"],
  summary: "Récupérer une tâche par ID",
  security,
  request: { params: idParams },
  responses: {
    200: { description: "La tâche", content: json(success(taskSchema)) },
    401: err("Non authentifié"),
    404: err("Tâche introuvable"),
  },
});

registry.registerPath({
  method: "patch",
  path: "/api/tasks/{id}",
  tags: ["Tasks"],
  summary: "Mettre à jour une tâche",
  security,
  request: {
    params: idParams,
    body: { required: true, content: json(updateTaskSchema.shape.body) },
  },
  responses: {
    200: { description: "Tâche mise à jour", content: json(success(taskSchema)) },
    400: err("Données invalides"),
    401: err("Non authentifié"),
    404: err("Tâche introuvable"),
  },
});

registry.registerPath({
  method: "delete",
  path: "/api/tasks/{id}",
  tags: ["Tasks"],
  summary: "Supprimer une tâche",
  security,
  request: { params: idParams },
  responses: {
    204: { description: "Tâche supprimée" },
    401: err("Non authentifié"),
    404: err("Tâche introuvable"),
  },
});

/* ---------- Génération ---------- */

export function generateAutoSpec() {
  const generator = new OpenApiGeneratorV3(registry.definitions);
  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      title: "Task Manager API (auto-généré)",
      version: "1.0.0",
      description: "Spécification générée depuis les schémas Zod.",
    },
    servers: [{ url: "http://localhost:5000" }],
  });
}
