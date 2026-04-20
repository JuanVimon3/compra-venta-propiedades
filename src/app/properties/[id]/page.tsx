export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import PropertyDetail from "@/components/PropertyDetail";


interface PropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  
  const resolvedParams = await params;
  const id = resolvedParams.id;
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/propiedades/${id}`, {
    cache: 'no-store'
  });

  if (!response.ok) {
    return <div className="text-center mt-10">Propiedad no encontrada en la base de datos</div>;
  }

  const property = await response.json();
  return <PropertyDetail property={property} />
}