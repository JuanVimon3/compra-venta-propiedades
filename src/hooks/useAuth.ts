"use client";

import { useAuthStore } from "@/store/store";
import { LoginCredentials, User } from "@/types";


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
                if(response.status === 401 || response.status === 403){
                    return { success: false, msg: "Correo o contraseña incorrectos" };
                }
                return { success: false, msg: "Error del servidor, por favor intenta más tarde" };
            };

            const data = await response.json();

            const tokenFromResponse = data.token || ""; // Aseguramos que token sea una cadena, incluso si no viene en la respuesta

            const loggedInUser = data.usuario as User;

            setAuth(loggedInUser, tokenFromResponse); // Guarda el token y la información del usuario en el store

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