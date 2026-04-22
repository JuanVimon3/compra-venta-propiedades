import PropertyCard from "@/components/PropertyCard";
import { Property } from "@/types";

export default async function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  // 1. LOG DE SEGURIDAD: Veremos esto en la pestaña 'Logs' de Vercel
  console.log("Intentando conectar a:", `${apiUrl}/api/propiedades`);

  try {
    const response = await fetch(`${apiUrl}/api/propiedades`, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
      },
      next: { revalidate: 0 } 
    });

    if (!response.ok) {
      return (
        <div className="p-10 text-center text-red-500">
          Error en la API: {response.status} - Revisa la URL en las variables de entorno.
        </div>
      );
    }

    const data: Property[] = await response.json();
    console.log("Total de propiedades recibidas:", data.length);

    // 2. VERIFICACIÓN DE DATOS VACÍOS
    if (!data || data.length === 0) {
      return (
        <div className="p-10 text-center">
          <p className="text-xl font-semibold">No se encontraron propiedades.</p>
          <p className="text-gray-500">La conexión con la API es exitosa, pero la base de datos parece estar vacía.</p>
        </div>
      );
    }

    return (
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {data.map((property) => (
          <PropertyCard key={property.idPropiedad} property={property}/>
        ))}
      </main>
    );

  } catch (error) {
    // 3. CAPTURA DE ERRORES CRÍTICOS (Ej: URL mal formada o timeout)
    console.error("Error crítico en el fetch:", error);
    return (
      <div className="p-10 text-center text-red-500">
        No se pudo establecer conexión con el servidor. Verifica que Render esté activo.
      </div>
    );
  }
}