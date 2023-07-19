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
  choices: Choice[];
  created: Date;
  lesson: string;
  question_text: string;
  type: "Multiple Choice" | "True or False";
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
};

export type NewLesson = Omit<
  Lesson,
  "id" | "total_questions" | "created" | "is_public" | "questions"
> & { isPublic: boolean };
