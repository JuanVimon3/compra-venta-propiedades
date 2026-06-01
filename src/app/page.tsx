// 1. ELIMINAMOS 'use client' para poder hacer el fetch directamente en el servidor
import ListenerSelector from "@/components/ListenerSelector";
import { Property } from "@/types";

export default async function Home() {
  // 2. Realizamos la petición a tu API de Spring Boot en una versión de pruebas
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/api/propiedades`, {
    cache: 'no-store' // Para que siempre traiga datos frescos de la DB
  });
  
  const data: Property[] = await response.json();
  console.log("Datos recibidos de la API:", data);

  return (
    <main>
      {/* 3. Mapeamos 'data' (lo que viene de la DB) en lugar del archivo estático */}
      <ListenerSelector properties={data} />
    </main>
  );
}