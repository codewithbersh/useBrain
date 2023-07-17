import { create } from "zustand";
import { Session } from "next-auth";

interface AuthState {
  session: Session | null;
}

export const useAuthState = create<AuthState>()((set) => ({
  session: null,
}));
