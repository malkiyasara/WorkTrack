import { z } from "zod";

export const updateProfileSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
    }),
});

export const changePasswordSchema = z.object({
    body: z.object({
        oldPassword: z.string().min(6),
        newPassword: z.string().min(6),
    }),
});
