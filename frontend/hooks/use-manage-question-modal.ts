import { Question } from "@/types";
import { create } from "zustand";

interface ManageQuestionModal {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  question: Question | null;
  setQuestion: (question: Question | null) => void;
}

export const useManageQuestionModal = create<ManageQuestionModal>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  question: null,
  setQuestion: (question: Question | null) => set({ question }),
}));
