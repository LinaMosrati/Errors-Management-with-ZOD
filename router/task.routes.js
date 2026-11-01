import { Router } from "express";
import { getAllTasks, getTaskById, createTask, updateTask, deleteTask } from "../controllers/tasks.controllers.js";
import { requireAuth } from "../middleware/auth.js";
import { validateRequest } from "../errors/index.js";
import { createTaskSchema, updateTaskSchema } from "../validations/task.schema.js";

const router = Router();

router.use(requireAuth); // Appliquer le middleware requireAuth à toutes les routes

// GET - Récupérer toutes les tâches
router.get("/", getAllTasks);

// GET - Récupérer une tâche par ID
router.get("/:id", getTaskById);

// POST - Créer une tâche (avec validation Zod)
router.post("/", validateRequest(createTaskSchema), createTask);

// PATCH - Mettre à jour une tâche (avec validation Zod optionnelle)
router.patch("/:id", validateRequest(updateTaskSchema), updateTask);

// DELETE - Supprimer une tâche
router.delete("/:id", deleteTask);

export default router;