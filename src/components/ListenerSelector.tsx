"use client";

import { useState } from "react";
import { Property } from "@/types";
import PropertyCard from "@/components/PropertyCard";

interface ListenerSelectorProps {
    properties: Property[];
}


export default function ListenerSelector({properties}: ListenerSelectorProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProperties = properties.filter((property) =>
        property.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.ubicacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.type.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="p-6">
            <input
                type= "text"
                placeholder="Buscar propiedades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            
            <div className= "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {filteredProperties.map((property: Property) => (
                    <PropertyCard key={property.idPropiedad} property={property}/>
                ))}
            </div>
        </div>
    )

}