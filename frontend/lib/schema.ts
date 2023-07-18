import { z } from "zod";

export const CATEGORY_CHOICES = [
  "General Knowledge",
  "Sports",
  "Science",
  "Others",
] as const;

export const lessonSchema = z.object({
  title: z
    .string({ required_error: "Title is required." })
    .min(8, "Title should at least be 8 characters long.")
    .max(128, "Title should not exceed 128 characters."),
  category: z.enum(CATEGORY_CHOICES),
  isPublic: z.boolean(),
});
