"use client";

import { useState } from "react";
import { uploadImageToGCP } from "@/actions/uploadAction";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

//Este componente es la página del panel de usuario, donde los usuarios pueden registrar y editar sus propiedades. Incluye un formulario con campos para el tipo de propiedad, descripción, ubicación, imágenes y precio. El diseño es limpio y organizado, con un enfoque en la facilidad de uso. Los usuarios pueden seleccionar el tipo de propiedad mediante casillas de verificación, ingresar una descripción y ubicación, adjuntar imágenes de la propiedad y establecer un precio. Este componente es esencial para que los usuarios puedan gestionar sus propiedades dentro de la aplicación.

export default function UserDashboard() {

  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { user } = useAuth();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleFilechange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    const result = await uploadImageToGCP(formData);
    setUploading(false);

    if(result.success && result.url){
      setImageUrl(result.url);
      console.log("Imagen subida exitosamente:", result.url);
    } else {
      console.error("Error al subir la imagen:", result.error);
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const rawData = Object.fromEntries(formData.entries());

    // const areaNumerica = Number(rawData.area.toString().replace(/[^0-9]/g, ''));

    const data = {
      titulo: rawData.titulo,
      ubicacion: rawData.ubicacion,
      precio: Number(rawData.precio),
      descripcion: rawData.descripcion,
      area: rawData.area.toString().replace(/[^0-9]/g, ''),
      bedrooms: Number(rawData.bedrooms),
      bathrooms: Number(rawData.bathrooms), 
      image: imageUrl || rawData.image,
      type: "Venta",
      vendedor: {
        idVendedor: user?.idUsuario
      }
    };

    try {
      const response = await fetch(`${apiUrl}/api/propiedades` , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if(response.ok){
        console.log("Propiedad registrada exitosamente");
      } else{
        const rawResponse = await response.text();
        console.log("--- INTENTO DE REGISTRO FALLIDO ---"); // Mensaje de control
        console.log("Status:", response.status);
        console.log("Cuerpo del error:", rawResponse);
        console.error("Error al registrar propiedad:", rawResponse);
      }
    } catch (error){
      console.error("Error al registrar propiedad:", error);
    }

  }

  return (
    //Extraer el ID del usuario autenticado para registrar y mostrar solo sus propiedades

    <form action= "" className="flex flex-col items-center" onSubmit={handleSubmit} >
      <h3 className="flex flex-col items-center font-bold pt-20 pb-20 text-3xl">Registra tus propiedades</h3>
      <h5 className="text-gray-500">Llena el formulario para registrar tus propiedades</h5>

      <div className="relative w-80 mt-2">
        <input type="string" id="titulo" name="titulo" className="peer border border-gray-300 rounded-md px-3 pt-5 pb-2 w-full focus:ring-2 focus:ring-[#840705] focus:outline-none" />
        <label htmlFor="titulo" className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[#840705] peer-focus:text-sm">
          Título de la propiedad
        </label>
      </div>

      <div className="relative w-80 mt-2">
        <input type="text" id="descripcion" name="descripcion" required className="peer border border-gray-300 rounded-md px-3 pt-5 pb-2 w-full focus:ring-2 focus:ring-[#840705] focus:outline-none" />
        <label htmlFor="descripcion" className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[#840705] peer-focus:text-sm">
          Descripción de la propiedad
        </label>
      </div>

      <div className="relative w-80 mt-2">
        <input type="string" id="ubicacion" name="ubicacion"  className="peer border border-gray-300 rounded-md px-3 pt-5 pb-2 w-full focus:ring-2 focus:ring-[#840705] focus:outline-none" />
        <label htmlFor="ubicacion" className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[#840705] peer-focus:text-sm">
          Ubicación
        </label>
      </div>

      <div className="relative w-80 mt-2">
        <input type="number" id="precio" name="precio" className="peer border border-gray-300 rounded-md px-3 pt-5 pb-2 w-full focus:ring-2 focus:ring-[#840705] focus:outline-none" />
        <label htmlFor="precio" className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[#840705] peer-focus:text-sm">
          Precio
        </label>
      </div>

      <div className="relative w-80 mt-2">
        <input type="string" id="area" name="area"  className="peer border border-gray-300 rounded-md px-3 pt-5 pb-2 w-full focus:ring-2 focus:ring-[#840705] focus:outline-none" />
        <label htmlFor="area" className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[#840705] peer-focus:text-sm">
          ¿Cuántos metros cuadrados tiene la propiedad?
        </label>
      </div>

      <div className="relative w-80 mt-2">
        <input type="number" id="bedrooms" name="bedrooms" className="peer border border-gray-300 rounded-md px-3 pt-5 pb-2 w-full focus:ring-2 focus:ring-[#840705] focus:outline-none" />
        <label htmlFor="bedrooms" className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[#840705] peer-focus:text-sm">
          ¿Cuántas habitaciones tiene la propiedad?
        </label>
      </div>

      <div className="relative w-80 mt-2">
        <input type="number" id="bathrooms" name="bathrooms"  className="peer border border-gray-300 rounded-md px-3 pt-5 pb-2 w-full focus:ring-2 focus:ring-[#840705] focus:outline-none" />
        <label htmlFor="bathrooms" className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[#840705] peer-focus:text-sm">
          ¿Cuántos baños tiene la propiedad?
        </label>
      </div>
      
      {/* Actulizar el formulario para que permita subir imágenes desde el dispositivo del usuario, en lugar de solo ingresar una URL. Esto mejorará la experiencia del usuario al permitirle mostrar sus propiedades con fotos reales. */}

      <div className="relative w-80 mt-4 p-4 border border-dashed border-gray-300 rounded-md bg-gray-50">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Subir imagen de la propiedad
        </label>
         <input
        type="file"
        accept="image/*"
        onChange={handleFilechange}
        disabled={uploading}
        className="block w-full text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none p-2 disabled:opacity-50"
      />

      {uploading && (
        <p className="mt-2 text-xs text-blue-600 font-medium animate-pulse">
          Subiendo imagen a Google Cloud Storage... Por favor espera.
        </p>
      )}

      {imageUrl && (
        <div className="mt-3">
          <p className="text-xs text-green-600 font-medium mb-1">
            Imagen subida exitosamente. URL: {imageUrl}
          </p>
         <Image src={imageUrl} alt="Imagen de la propiedad" width={200} height={200} />
        </div>
      ) }
      </div>


      <button 
        className="flex items-center justify-center bg-[#840705] w-80 border rounded-md mb-10 mt-6 py-2 text-white cursor-pointer hover:bg-[#5c0404] transition" 
        disabled={uploading}
        type="submit"
      >
        {uploading ? "Subiendo imagen..." : "Registrar propiedad"}
      </button>

    </form>
  )
}