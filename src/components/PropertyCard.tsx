import Link from "next/link";
import { Property } from "@/types";
import Image from "next/image";

interface PropertyCardProps {
  property: Property;
}


export default function PropertyCard({ property }: PropertyCardProps) {

  
  if (!property) return null;

  console.log(`Propiedad ${property.idPropiedad}: URL de imagen ->`, property.image);

  // const imageSrc = (property.image && property.image.trim() !== "") 
  //   ? property.image 
  //   : "https://via.placeholder.com/600x400?text=Sin+Imagen";
    
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
      <Link href={`/properties/${property.idPropiedad}`}>
        <div className="relative w-full h-48">
          <Image 
            className="object-cover"
            src={property.image}
            alt={property.titulo} 
            fill
            sizes="(max-w-768px) 100vw, 33vw"
            unoptimized
            priority={true}
          />
        </div>      
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-gray-800">
            {property.titulo}
          </div>
          <p className="text-gray-600 text-sm mb-2">{property.ubicacion}</p>
          <p className="text-gray-700 text-base line-clamp-3">
            {property.descripcion}
          </p>
        </div>
        <div className="px-6 pt-4 pb-4 flex flex-wrap gap-2">
          <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold">
            {property.type}
          </span>
          <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-800 font-medium">
            {property.area}
          </span>
          <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-800 font-medium">
            {property.bedrooms} hab.
          </span>
          <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-800 font-medium">
            {property.bathrooms} baños
          </span>
        </div>

        <div className="px-6 pb-4">
          <p className="text-blue-600 font-bold text-lg">
            {property.type === "Venta"
              ? `Desde $${(property.precio || 0).toLocaleString("es-CO")}`
              : `Arriendo: $${(property.precio || 0).toLocaleString("es-CO")} /mes`
            }
          </p>
        </div>
      </Link>
    </div>
  );
}