//Este archivo define la interfaz "Property", que representa la estructura de los datos de una propiedad inmobiliaria en la aplicación. Cada propiedad tiene un id único, título, precio, ubicación, área, número de habitaciones y baños, imagen, descripción y tipo (Venta o Arriendo). Esta interfaz se utiliza para garantizar que los datos de las propiedades sean consistentes en toda la aplicación, facilitando el manejo de la información y la integración con otros componentes y servicios.
export interface Property {
  idPropiedad: number;
  titulo: string;
  precio: number;
  ubicacion: string; 
  area: string;
  bedrooms: number;
  bathrooms: number;
  image: string;
  descripcion: string;
  type: "Venta" | "Arriendo";
}