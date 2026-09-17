import { z } from "zod";

export const createTaskSchema = z.object({
    body: z.object({
        title: z.string().min(3),
        description: z.string().optional(),
        dueDate: z.string(),
    }),
});

export const updateTaskSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        status: z.string().optional(),
        dueDate: z.string().optional(),
    }),
});

export const taskIdSchema = z.object({
    params: z.object({
        id: z.string().length(24),
    }),
});

export const updateStatusSchema = z.object({
    params: z.object({
        id: z.string().length(24, "Invalid task ID"),
    }),
    body: z.object({
        status: z.enum(["Pending", "In Progress", "Completed"]),
    }),
});
