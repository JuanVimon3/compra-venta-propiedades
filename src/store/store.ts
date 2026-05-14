import {create} from "zustand";
import {User} from "../types";
import {persist} from "zustand/middleware";

interface authState {
    user: User | null;
    token: string | null;
    isLoggedIn: boolean;
    setAuth: (user: User, token: string) => void;
    clearAuth: () => void
}

export const useAuthStore = create<authState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      setAuth: (user, token) => set({ user, token, isLoggedIn: true }),
      clearAuth: () => set({ user: null, token: null }),
    }),
    { name: 'auth-storage' } // Esto guarda la sesión en localStorage
  )
);

