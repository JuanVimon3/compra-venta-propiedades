export interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  image: string;
  description: string;
  type: "Venta" | "Arriendo"
}