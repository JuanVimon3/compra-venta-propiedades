"use client";

import { useAuth } from "@/hooks/useAuth"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {

  const { login } = useAuth();
  const router = useRouter(); // Hook necesario para la navegación programática

  // Mantenemos el estado unificado para facilitar el envío al backend
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Estado local para capturar y mostrar errores al usuario
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null); // Reseteamos el error antes de cada intento

    // Llamamos a la función asíncrona y esperamos el objeto de respuesta { success, msg }
    const result = await login(formData);

    // Si el login fue exitoso en el Hook y el Store de Zustand tiene los datos:
    if (result && result.success) {
      router.push("/"); // Redirigimos al Home (o dashboard)
    } else {
      // Si falló (401, 500 o error de red), mostramos el mensaje que viene del Hook
      setError(result.msg || "Error desconocido durante el login");
    }
  }

  return (
    <form action="" className="flex flex-col items-center">
      <h1 className="flex flex-col items-center font-bold pt-20 pb-20 text-3xl">Ingresa a tu cuenta</h1>
      <h5 className="text-gray-500">Loguéate ingresando tu correo y contraseña</h5>

      {/* Renderizado condicional del mensaje de error */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 w-80 text-center text-sm">
          {error}
        </div>
      )}

      <div className="relative w-80 mt-2">
        <input
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder="" // Mantenemos el placeholder vacío para que el efecto "peer" de Tailwind funcione
          type="email" 
          id="email" 
          className="peer border border-gray-300 rounded-md px-3 pt-5 pb-2 w-full focus:ring-2 focus:ring-[#840705] focus:outline-none" 
        />
        <label htmlFor="email" className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[#840705] peer-focus:text-sm">
          Dirección de correo
        </label>
      </div>

      <div className="relative w-80 mt-2">
        <input 
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder=""
          type="password" 
          id="password" 
          className="peer border border-gray-300 rounded-md px-3 pt-5 pb-2 w-full focus:ring-2 focus:ring-[#840705] focus:outline-none" 
        />
        <label htmlFor="password" className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[#840705] peer-focus:text-sm">
          Contraseña
        </label>
      </div>

      <h5 className="text-gray-500 text-decoration-line: underline mt-4 cursor-pointer">
        ¿Olvidaste tu contraseña?
      </h5>

      <button 
        onClick={handleLogin}
        type="button" 
        className="flex items-center justify-center bg-[#840705] w-80 border rounded-md mb-10 mt-6 py-2 hover:bg-red-900 transition-colors"
      >
        {/* Cambiamos el h1 por un span para cumplir con la semántica HTML profesional */}
        <span className="text-white font-bold">Ingresar</span>
      </button>

      {/* Botón de Google (Mantenemos tu diseño original) */}
      <button type="button" className="flex items-center justify-center gap-3 w-80 border border-gray-400 rounded-md mb-10 py-2 bg-white hover:bg-gray-50 transition">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="w-5 h-5">
          <path fill="#EA4335" d="M488 261.8C488 403.3 391.1 512 248.5 512 111.2 512 0 400.8 0 263.5S111.2 15 248.5 15c66.5 0 122.7 24.5 165.2 64.9l-67 64.2C312.3 112.7 282.5 100 248.5 100c-83.1 0-150.5 67.4-150.5 150.5S165.4 401 248.5 401c77.9 0 122.8-44.3 127.9-106H248.5v-85h239.1c2.2 12.1 3.4 24.6 3.4 38z" />
        </svg>
        <span className="text-[#840705]">Continuar con Google</span>
      </button>
    </form>
  )
}