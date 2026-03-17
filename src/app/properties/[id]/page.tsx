import { properties } from "@/data/properties";
import PropertyDetail from "@/components/PropertyDetail";

//Este componente es la página de detalles de una propiedad específica. Utiliza el parámetro "id" de la URL para encontrar la propiedad correspondiente en el array de propiedades. Si se encuentra la propiedad, se muestra el componente "PropertyDetail" con la información de esa propiedad. Si no se encuentra, se muestra un mensaje indicando que la propiedad no fue encontrada. Este componente es esencial para mostrar información detallada sobre cada propiedad cuando los usuarios hacen clic en una tarjeta de propiedad desde la página principal o cualquier otra lista de propiedades.

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