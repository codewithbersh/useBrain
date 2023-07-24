import { History } from "@/types";
import { create } from "zustand";

interface NewHistory {
  history: History | string;
  setHistory: (history: History | string) => void;
}

export const useNewHistory = create<NewHistory>()((set) => ({
  history: "",
  setHistory: (history: History | string) => set({ history }),
}));
