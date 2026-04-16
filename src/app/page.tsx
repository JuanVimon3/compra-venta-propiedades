// 1. ELIMINAMOS 'use client' para poder hacer el fetch directamente en el servidor
import PropertyCard from "@/components/PropertyCard";
import { Property } from "@/types";

export default async function Home() {
  // 2. Realizamos la petición a tu API de Spring Boot
  const response = await fetch('http://localhost:8080/api/propiedades', {
    cache: 'no-store' // Para que siempre traiga datos frescos de la DB
  });
  
  const data: Property[] = await response.json();
  console.log("Datos recibidos de la API:", data);

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* 3. Mapeamos 'data' (lo que viene de la DB) en lugar del archivo estático */}
      {data.map((property) => (
        <PropertyCard key={property.idPropiedad} property={property}/>
      ))}
    </main>
  );
}