import { create } from "zustand";

interface QuizGameModalState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useQuizGameModalState = create<QuizGameModalState>()((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));

interface UserNicknameState {
  nickname: string | null;
  setNickname: (nickname: string) => void;
}

export const useUserNicknameState = create<UserNicknameState>()((set) => ({
  nickname: null,
  setNickname: (nickname: string | null) => set({ nickname }),
}));
