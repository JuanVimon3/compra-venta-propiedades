'use client';

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
