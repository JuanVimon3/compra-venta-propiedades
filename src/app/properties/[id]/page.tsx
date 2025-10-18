import { properties } from "@/data/properties";
import PropertyDetail from "@/components/PropertyDetail";


interface PropertyPageProps{
  params: {
    id: string;
  };
};

export default function PropertyPage({params}: PropertyPageProps){
  const property = properties.find((p) => p.id === Number(params.id))
  if(!property){
    return <div>Propiedad no encontrada</div>
  };

  return <PropertyDetail property={property} />
}