import {create} from "zustand";
import {User} from "../types";
import {persist} from "zustand/middleware";

interface authState {
    user: User | null;
    token: string | null;
    setAuth: (user: User, token: string) => void;
    clearAuth: () => void
}

export const useAuthStore = create<authState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      clearAuth: () => set({ user: null, token: null }),
    }),
    { name: 'auth-storage' } // Esto guarda la sesión en localStorage
  )
);

