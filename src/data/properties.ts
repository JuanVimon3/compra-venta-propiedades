import { Property } from "@/types/property";

export const properties: Property[] = [
  {
    id: 1,
    title: "Casa campestre en Donmatías",
    price: 450000000,
    location: "Vereda La Cabaña, Donmatías - Antioquia",
    area: "250 m²",
    bedrooms: 3,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    description:
      "Hermosa casa campestre con amplias zonas verdes, chimenea y vista a la montaña. A solo 10 minutos del parque principal.",
    type: "Venta",
  },
  {
    id: 2,
    title: "Apartamento moderno en Medellín",
    price: 320000000,
    location: "Barrio Laureles, Medellín - Antioquia",
    area: "85 m²",
    bedrooms: 2,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    description:
      "Apartamento moderno con cocina integral, balcón con vista panorámica y parqueadero cubierto.",
    type: "Venta",
  },
  {
    id: 3,
    title: "Local comercial en el parque principal",
    price: 1800000,
    location: "Centro, Donmatías - Antioquia",
    area: "45 m²",
    bedrooms: 0,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
    description:
      "Excelente local comercial con alto flujo peatonal, ideal para tienda o cafetería.",
    type: "Arriendo",
  },
];
