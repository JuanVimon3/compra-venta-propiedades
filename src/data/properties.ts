import { Property } from "@/types";

//Este archivo contiene un array de objetos que representan propiedades inmobiliarias. Cada objeto tiene información detallada sobre la propiedad, como su id, título, precio, ubicación, área, número de habitaciones y baños, imagen y descripción. Este array se utiliza para simular una base de datos de propiedades en la aplicación, permitiendo mostrar esta información en diferentes componentes como tarjetas de propiedad y detalles de propiedad. Con la implementación de una base de datos real, este array será reemplazado por consultas a la base de datos para obtener la información de las propiedades.

const response = await fetch('http://localhost:8080/api/propiedades');
const data = await response.json();

export const properties: Property[] = data
