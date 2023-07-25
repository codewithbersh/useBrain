import { CATEGORY_CHOICES } from "@/lib/schema";
import { Icon } from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: Icon;
};

export type User = {
  name: string;
  email: string;
  image: string;
  accessToken: string;
  info: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    nickname: string;
  };
};

export type Category = (typeof CATEGORY_CHOICES)[number];

export type Choice = {
  id: string;
  question: string;
  choice_text: string;
  is_correct: boolean;
};

export type Question = {
  id: string;
  created: Date;
  lesson: string;
  question_text: string;
  choices: Choice[];
};

export type Lesson = {
  id: string;
  category: Category;
  title: string;
  is_public: boolean;
  created: Date;
  owner: string;
  total_questions: number;
  questions: Question[];
  total_plays: number;
};

export type NewLesson = Omit<
  Lesson,
  | "id"
  | "total_questions"
  | "created"
  | "is_public"
  | "questions"
  | "total_plays"
> & { isPublic: boolean };

type NewChoice = Omit<Choice, "id" | "question">;

export type NewQuestion = Omit<Question, "id" | "created" | "choices"> & {
  choices: NewChoice[];
};

export type History = {
  id: string;
  player: string;
  lesson: string;
  total_questions: number;
  total_correct_answers: number;
  date_played: Date;
};

export type NewHistory = Omit<History, "id" | "date_played">;

export type MyHistory = Omit<History, "player" | "lesson"> & {
  player: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    nickname: string;
  };
  lesson: {
    id: string;
    category: string;
    title: string;
    is_public: boolean;
    created: string;
    owner: string;
  };
};
