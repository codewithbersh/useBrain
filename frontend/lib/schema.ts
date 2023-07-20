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

export const deleteLessonSchema = z.object({
  verification: z
    .string()
    .refine((value) => value.toLowerCase() === "delete lesson", {
      message: "Please enter 'delete lesson' to continue.",
    }),
});

const ChoiceSchema = z.object({
  choice_text: z.string().nonempty("Required").trim().min(1),
  is_correct: z.coerce.boolean().optional(),
});

export const QuestionSchema = z.object({
  lesson: z.coerce.string(),
  question_text: z
    .string()
    .min(8, "Question should have at least 8 characters")
    .max(80, "Question too long.")
    .nonempty(),
  choices: z.tuple([ChoiceSchema, ChoiceSchema, ChoiceSchema, ChoiceSchema]),
});
