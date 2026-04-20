export const dynamic = 'force-dynamic';

import PropertyDetail from "@/components/PropertyDetail";

interface PropertyPageProps {
  params: Promise<{ id: string; }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Si la URL falla durante el build, esto evita que Vercel se bloquee
  if (!apiUrl) {
    return <div className="text-center mt-10">Cargando configuración...</div>;
  }

  try {
    const response = await fetch(`${apiUrl}/api/propiedades/${id}`, {
      cache: 'no-store'
    });

    if (!response.ok) return <div className="text-center mt-10">Propiedad no encontrada</div>;

    const property = await response.json();
    return <PropertyDetail property={property} />;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    return <div className="text-center mt-10">Error de conexión con el servidor{errorMessage}</div>;
  }
}