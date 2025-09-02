import { z } from "zod";
export const tripPlanSchema = z.object({
    title: z.string().min(1, "Title is required"),
    destination: z.string().min(1, "Destination is required"),
    days: z.coerce.number().int().positive("Days must be a positive integer"),
    budget: z.coerce.number().nonnegative("Budget must be >= 0")
});
export const paginationQuerySchema = z.object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
    destination: z.string().optional(),
    minBudget: z.coerce.number().nonnegative().optional(),
    maxBudget: z.coerce.number().nonnegative().optional()
});
