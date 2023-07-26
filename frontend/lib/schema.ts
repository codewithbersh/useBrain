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
    .trim()
    .min(8, "Title should at least be 8 characters long.")
    .max(60, "Title should not exceed 60 characters."),
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
  choice_text: z.string().nonempty("Required").trim().min(1).max(48),
  is_correct: z.coerce.boolean(),
});

export const QuestionSchema = z.object({
  lesson: z.coerce.string(),
  question_text: z
    .string()
    .trim()
    .min(8, "Question should have at least 8 characters")
    .max(128, "Question too long."),
  choices: z.tuple([ChoiceSchema, ChoiceSchema, ChoiceSchema, ChoiceSchema]),
});

export const NicknameSchema = z.object({
  nickname: z
    .string()
    .trim()
    .min(4, "Nickname must be at least 4 characters")
    .max(12, "Nickname should not be more than 12 characters")
    .regex(/^[a-z0-9]+$/i, "Nickname should only contain a-z and numbers"),
});

export const DeleteUserSchema = z.object({
  verification: z
    .string()
    .refine((value) => value.toLowerCase() === "delete my account", {
      message: "Please enter 'delete my account' to continue.",
    }),
});
