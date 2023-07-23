import { create } from "zustand";

interface PlayState {
  playState: "initial" | "playing" | "gameOver";
  setPlayState: (playState: "initial" | "playing" | "gameOver") => void;
}

export const usePlayState = create<PlayState>()((set) => ({
  playState: "initial",
  setPlayState: (playState: "initial" | "playing" | "gameOver") =>
    set({ playState }),
}));
