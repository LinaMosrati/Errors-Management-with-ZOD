import { z } from "zod";

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Le titre est obligatoire" }).min(3, "Le titre est trop court"),
    description: z.string().optional(),
  }),
});

export const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Le titre est trop court").optional(),
    description: z.string().optional(),
  }),
});