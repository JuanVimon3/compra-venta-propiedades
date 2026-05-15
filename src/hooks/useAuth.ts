"use client";

import { useAuthStore } from "@/store/store";
import { LoginCredentials } from "@/types";

export const useAuth = () => {
    const { user, token, setAuth, clearAuth, isLoggedIn } = useAuthStore();

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

             // Actualiza el estado de inicio de sesión

            setAuth(data, data.token || ""); // Guarda el token y la información del usuario en el store

            console.log("Datos del usuario después del login:", data);

            return { success: true };
        } catch (error) {
            console.error("Error en el login:", error);
            return { success: false, msg: "Error de conexión con el servidor" };
        }
    }

    const logout = () => {
        clearAuth(); // Limpia la sesión del usuario en el store y cierra la sesión en el backend si es necesario
    };

    return { user, token, login, logout, isLoggedIn };
}