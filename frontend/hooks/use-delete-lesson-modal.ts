import { Lesson } from "@/types";
import { create } from "zustand";

interface DeleteLessonModal {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  lesson: Lesson | null;
  setLesson: (lesson: Lesson) => void;
}

export const useDeleteLessonModal = create<DeleteLessonModal>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  lesson: null,
  setLesson: (lesson: Lesson) => set({ lesson }),
}));
