import { create } from "zustand";

interface ExitGameModal {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  lessonId: string | null;
  setLessonId: (lessonId: string | null) => void;
}

export const useExitGameModal = create<ExitGameModal>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  lessonId: null,
  setLessonId: (lessonId: string | null) => set({ lessonId }),
}));
