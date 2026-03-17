import { Property } from "@/types/property";
import Image from "next/image";

//Este componente muestra los detalles completos de una propiedad, incluyendo su imagen, título, descripción, ubicación, tipo y precio. Está diseñado para ser utilizado en la página de detalles de una propiedad, proporcionando a los usuarios toda la información relevante sobre la propiedad que han seleccionado. El diseño es limpio y enfocado en la presentación visual de la propiedad, con un layout que se adapta a diferentes tamaños de pantalla.

interface PropertyDetailProps {
  property: Property
}

export default function PropertyDetail({ property }: PropertyDetailProps) {
  return (
    <div className="flex flex-col md:flex-row max-w-5xl mx-auto p-4 md:p-6 bg-white rounded-2xl shadow-md gap-6">

      <div className="w-full md:w-1/2">
        <Image
          src={property.image}
          alt={property.title}
          className="rounded-xl object-cover w-full h-64 md:h-full"
          width={600}
          height={400}
          priority
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-between">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">{property.title}</h1>
          <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed">{property.description}</p>
          <p className="text-gray-600 text-sm md:text-base">{property.location}</p>
        </div>

        <div className="mt-6">
          <p className="text-gray-800 font-semibold text-lg md:text-xl">
            {property.type}:{" "}
            <span className="text-blue-800 font-bold">
              ${property.price.toLocaleString()}
            </span>
          </p>

        </div>

              
       
      </div>

    </div>
  )
}