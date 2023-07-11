export type NavItem = {
  title: string;
  href: string;
};

export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  nickname: string;
};

export type Quiz = {
  id: string;
  owner: User;
  category: { name: string };
  title: string;
  difficulty: "easy" | "medium" | "hard";
  privacy: "PRI" | "PUB" | "LIN" | "COD";
  time_limit?: number;
  created: Date;
  updated: Date;
  times_played: number;
  code?: string;
  questions_count: number;
};

export type Choice = {
  id: string;
  choice_text: string;
  is_correct: boolean;
  question: string;
  owner: string;
};

export type Question = {
  id: string;
  choices: Choice[];
  question_text: string;
  created: Date;
  updated: Date;
  owner: string;
  quiz: Quiz;
};
