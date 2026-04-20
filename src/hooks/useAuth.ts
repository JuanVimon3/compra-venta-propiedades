"use client";

import { useAuthStore } from "@/store/store";
import { LoginCredentials } from "@/types";

export const useAuth = () => {
    const { user, token, setAuth, clearAuth } = useAuthStore();

    const login = async (credentials : LoginCredentials) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/usuarios/login`, {
                method: "POST",
                body: JSON.stringify(credentials),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if(!response.ok){
                throw new Error("Credenciales incorrectas");
            };

            const data = await response.json();

            setAuth(data, ""); // Guarda el token y la información del usuario en el store

            return { success: true };
        } catch (error) {
            console.error("Error en el login:", error);
            return { success: false, msg: "Error de conexión con el servidor" };
        }
    }

    const logout = () => {
        clearAuth(); // Limpia la sesión del usuario en el store
    };

    return { user, token, login, logout };
}