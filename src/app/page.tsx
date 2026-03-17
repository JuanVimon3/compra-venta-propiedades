'use client';

//Este archivo es la página principal de la aplicación, que muestra una lista de propiedades disponibles para la compra o venta. Se importa un array de propiedades desde un archivo de datos y se mapea para renderizar un componente PropertyCard para cada propiedad. El diseño utiliza una cuadrícula responsiva para mostrar las tarjetas de propiedad de manera organizada y atractiva. Cada tarjeta muestra información relevante sobre la propiedad, como su tipo, ubicación, precio y una imagen representativa. Esta página es el punto de entrada para los usuarios que buscan propiedades en la aplicación.

import { properties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";

export default function Home() {
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {properties.map((property) =>(
        <PropertyCard key={property.id} property={property}/>
      ))

      }
    </main>
  );
}
