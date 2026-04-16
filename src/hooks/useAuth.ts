import { useAuthStore } from "@/store/store";
import { LoginCredentials } from "@/types";

export const useAuth = () => {
    const { user, token, setAuth, clearAuth } = useAuthStore();

    const login = async (credentials : LoginCredentials) => {
        try {
            const response = await fetch("", {
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

            setAuth(data.user, data.token);
        } catch (error) {
            console.error("Error en el login:", error);
        }
    }

    const logout = () => {
        clearAuth(); // Limpia la sesión del usuario en el store
    };

    return { user, token, login, logout };
}