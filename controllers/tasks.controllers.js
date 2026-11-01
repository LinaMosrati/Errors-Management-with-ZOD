import Task from "../models/Task.js";
import { asyncHandler, errorFactory, sendSuccess } from "../errors/index.js";

// Récupérer toutes les tâches
export const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();
  sendSuccess(res, tasks);
});

// Récupérer une tâche par ID
export const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  
  if (!task) {
    throw errorFactory.notFound("Tâche introuvable");
  }

  sendSuccess(res, task);
});

// Créer une tâche
export const createTask = asyncHandler(async (req, res) => {
  const newTask = await Task.create(req.body);
  sendSuccess(res, newTask, "Tâche créée avec succès", 201);
});

// Mettre à jour une tâche
export const updateTask = asyncHandler(async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedTask) {
    throw errorFactory.notFound("Tâche introuvable");
  }

  sendSuccess(res, updatedTask);
});

// Supprimer une tâche
export const deleteTask = asyncHandler(async (req, res) => {
  const deletedTask = await Task.findByIdAndDelete(req.params.id);

  if (!deletedTask) {
    throw errorFactory.notFound("Tâche introuvable");
  }

  res.status(204).send();
});