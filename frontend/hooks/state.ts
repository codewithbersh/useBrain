import { create } from "zustand";

interface QuizGameModalState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useQuizGameModalState = create<QuizGameModalState>()((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));
