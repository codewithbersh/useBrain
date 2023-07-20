import { Question } from "@/types";
import { create } from "zustand";

interface DeleteQuestionModal {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  question: Question | null;
  setQuestion: (Question: Question) => void;
}

export const useDeleteQuestionModal = create<DeleteQuestionModal>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  question: null,
  setQuestion: (question: Question) => set({ question }),
}));
