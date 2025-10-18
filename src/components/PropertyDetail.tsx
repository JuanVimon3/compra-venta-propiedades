import { Property } from "@/types/property";
import Image from "next/image";

interface PropertyDetailProps {
  property: Property
}

export default function PropertyDetail({ property }: PropertyDetailProps) {
  return (
    <div className=" flex flex-row max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md gap-6">

      <div className="w-1/2">
        <Image
          src={property.image}
          alt={property.title}
          className="rounded-lg object-cover w-full h-full"
          width={600}
          height={400}
        />
      </div>

      <div className="w-1/2 flex flex-col justify-between">

        <div>
          <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
          <p className="text-gray-700 mb-4">{property.description}</p>
          <p className="text-gray-600">{property.location}</p>
        </div>

        <div className="mt-6">
          <p className="text-gray-800 font-semibold">
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