"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";
import { Property } from "@/types";  


//Este componente es la página del panel de usuario, donde los usuarios pueden registrar y editar sus propiedades. Incluye un formulario con campos para el tipo de propiedad, descripción, ubicación, imágenes y precio. El diseño es limpio y organizado, con un enfoque en la facilidad de uso. Los usuarios pueden seleccionar el tipo de propiedad mediante casillas de verificación, ingresar una descripción y ubicación, adjuntar imágenes de la propiedad y establecer un precio. Este componente es esencial para que los usuarios puedan gestionar sus propiedades dentro de la aplicación.

export default function UserDashboard() {

  const [uploading, setUploading] = useState(false);
  const [imagesUrls, setImagesUrls] = useState<string[]>([]);
userDashboardFull
  const [myProperties, setMyProperties] = useState<Property[]>([]);
  const [loadingProperties, setLoadingProperties] = useState(true);


  const { user } = useAuth();

  // const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;


// Función para traer las propiedades del usuario autenticado desde la API. Se ejecuta al montar el componente y cada vez que el usuario cambia. Actualiza el estado con las propiedades obtenidas o muestra un error en caso de fallo.
  const fetchMyProperties = useCallback(async () => {
    if (!user?.idUsuario) return;

    try {
      const response = await fetch(`${apiUrl}/api/propiedades/usuario/${user.idUsuario}`, {
        method: 'GET',
        credentials: 'include', // Asegura que las cookies de sesión se envíen con la solicitud
      });

      if (response.ok) {
        const data = await response.json();
        setMyProperties(data);
      } else {
        console.log("Error al obtener propiedades del usuario:", response.status);
      } 
    } catch (error) {
      console.error("Error al obtener propiedades del usuario:", error);
    } finally {
      setLoadingProperties(false);
    }
  }, [user?.idUsuario, apiUrl]);

  //Hook que inicia la búsqueda cuando el usuario está autenticado

  useEffect(() => {
    if (user?.idUsuario) {
      fetchMyProperties();
    }
  }, [user, fetchMyProperties]);


  

  const handleFilechange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files || e.target.files.length === 0) return;

  const file = e.target.files[0];
  setUploading(true);

  const formData = new FormData();
  formData.append('file', file);

  try {
    // Reemplazamos el Server Action por una petición HTTP nativa a nuestra API
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    setUploading(false);

    if (result.success && result.url) {
      setImagesUrls((prev) => [...prev, result.url]);
      console.log("Imagen subida exitosamente:", result.url);
    } else {
      console.error("Resultado detallado del servidor:", result.error);
      alert("Error del servidor: " + result.error);
    }
  } catch (error: unknown) {
    setUploading(false);
    console.error("Error en la petición de subida:", error);
    alert("Error de red: " + (error instanceof Error ? error.message : 'Error desconocido'));
  }
};

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
      images: imagesUrls, // Enviamos las URLs de las imágenes como un array
      type: "Venta",
      vendedor: {
        usuario: {
          idUsuario: user?.idUsuario
        }
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

        // router.push("/");
        setImagesUrls([]);
        event.currentTarget.reset();
        fetchMyProperties(); // Refrescar la lista de propiedades después de registrar una nueva

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

    <div className = "max-w-7xl max-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

      {/*Columna de formulario*/}
      <div className= "lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
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

          {imagesUrls.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {imagesUrls.map((url, index) => (
                <div key= {index} className="relative w-full h-40 rounded-md overflow-hidden">
                  <Image src={url} alt={ `Imagen ${index + 1}`} layout="fill" objectFit="cover" />
                </div>
              ))}
            </div>
          )}

          </div>


          <button 
            className="flex items-center justify-center bg-[#840705] w-80 border rounded-md mb-10 mt-6 py-2 text-white cursor-pointer hover:bg-[#5c0404] transition" 
            disabled={uploading || imagesUrls.length === 0}
            type="submit"
          >
            {uploading ? "Subiendo imagen..." : "Registrar propiedad"}
          </button>

        </form>
      </div>

      {/*Columna de listado de propiedades*/}
      <div className= "lg:col-span-2">
          <h3 className= "font-bold text-2xl text-gray-800 mb-2">Mis propiedades</h3>
          {loadingProperties ? (
            <div className="text-gray-500 animate-pulse">
              Cargando propiedades...
            </div> ):
            <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200 p-6">
            <p className="text-gray-600 font-medium">Aún no has registrado ninguna propiedad.</p>
            <p className="text-gray-400 text-xs mt-1">Usa el formulario de la izquierda para publicar tu primer inmueble.</p>
          </div>
          }

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myProperties.map((propiedad) => (
              <PropertyCard key={propiedad.idPropiedad} property={propiedad} />
            ))}
          </div>

userDashboardFull
      </div>


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

      {imagesUrls.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {imagesUrls.map((url, index) => (
            <div key= {index} className="relative w-full h-40 rounded-md overflow-hidden">
              <Image src={url} alt={ `Imagen ${index + 1}`} layout="fill" objectFit="cover" />
            </div>
          ))}
        </div>
      )}

      </div>


      <button 
        className="flex items-center justify-center bg-[#840705] w-80 border rounded-md mb-10 mt-6 py-2 text-white cursor-pointer hover:bg-[#5c0404] transition" 
        disabled={uploading || imagesUrls.length === 0}
        type="submit"
      >
        {uploading ? "Subiendo imagen..." : "Registrar propiedad"}
      </button>
 main

    
  )
}