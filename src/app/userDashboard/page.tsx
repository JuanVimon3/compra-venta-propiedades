"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
// import { useRouter } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";
import { Property } from "@/types";  

//Este componente es la página del panel de usuario, donde los usuarios pueden registrar y editar sus propiedades. Incluye un formulario con campos para el tipo de propiedad, descripción, ubicación, imágenes y precio. El diseño es limpio y organizado, con un enfoque en la facilidad de uso. Los usuarios pueden seleccionar el tipo de propiedad mediante casillas de verificación, ingresar una descripción y ubicación, adjuntar imágenes de la propiedad y establecer un precio. Este componente es esencial para que los usuarios puedan gestionar sus propiedades dentro de la aplicación.

export default function UserDashboard() {

  const [uploading, setUploading] = useState(false);
  const [imagesUrls, setImagesUrls] = useState<string[]>([]);
  const [myProperties, setMyProperties] = useState<Property[]>([]);
  const [loadingProperties, setLoadingProperties] = useState(true);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const { user } = useAuth();
  // const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Función para traer las propiedades del usuario autenticado desde la API.
  const fetchMyProperties = useCallback(async () => {
    if (!user?.idUsuario) return;

    try {
      const response = await fetch(`${apiUrl}/api/propiedades/usuario/${user.idUsuario}`, {
        method: 'GET',
        credentials: 'include',
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

    const formeElement = event.currentTarget;

    const formData = new FormData(event.currentTarget);
    const rawData = Object.fromEntries(formData.entries());

    const data = {
      titulo: rawData.titulo,
      ubicacion: rawData.ubicacion,
      precio: Number(rawData.precio),
      descripcion: rawData.descripcion,
      area: rawData.area.toString().replace(/[^0-9]/g, ''),
      bedrooms: Number(rawData.bedrooms),
      bathrooms: Number(rawData.bathrooms), 
      images: imagesUrls,
      type: rawData.type,
      vendedor: {
        usuario: {
          idUsuario: user?.idUsuario
        }
      }
    };

    // Si estamos editando, la URL será diferente y el método será PUT en lugar de POST.
    const isEditing = editingProperty !== null;
    const url = isEditing 
      ? `${apiUrl}/api/propiedades/${editingProperty?.idPropiedad}`
      : `${apiUrl}/api/propiedades`;



    try {
      const response = await fetch(url , {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if(response.ok){
        console.log(isEditing ? "--- PROPIEDAD ACTUALIZADA EXITOSAMENTE ---" : "--- PROPIEDAD REGISTRADA EXITOSAMENTE ---");
        setImagesUrls([]);
        formeElement.reset();
        fetchMyProperties();
      } else{
        const rawResponse = await response.text();
        console.log("--- INTENTO DE REGISTRO FALLIDO ---");
        console.log("Status:", response.status);
        console.log("Cuerpo del error:", rawResponse);
      }
    } catch (error){
      console.error("Error al registrar propiedad:", error);
    }
  };

  const handleDeleteProperty = async (idPropiedad: number) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta propiedad?")) return;

    try {
      const response = await fetch(`${apiUrl}/api/propiedades/${idPropiedad}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log("Propiedad eliminada exitosamente");
        fetchMyProperties();
      } else {
        const rawResponse = await response.text();
        console.error("Error al eliminar la propiedad:", rawResponse);
      }
    } catch (error) {
      console.error("Error al eliminar la propiedad:", error);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

      {/* Columna de formulario */}
      <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>

          <h3 className="flex flex-col items-center font-bold pt-10 pb-6 text-3xl text-center">
            {editingProperty ? "Editar propiedad" : "Registrar nueva propiedad"}
          </h3>

          <h5 className="text-gray-500 text-sm text-center mb-6">
            {editingProperty ? "Edita los datos de tu propiedad" : "Llena el formulario para registrar tus propiedades"}
          </h5>

          <div className="relative w-80 mt-2">
            <input 
              type="text" 
              id="titulo" 
              name="titulo"
              key={editingProperty ? editingProperty.titulo : "titulo"}
              defaultValue={editingProperty ? editingProperty.titulo : ""}
              className="peer border border-gray-300 rounded-md px-3 pt-5 pb-2 w-full focus:ring-2 focus:ring-[#840705] focus:outline-none"
            />
            <label htmlFor="titulo" className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[#840705] peer-focus:text-sm">
              Título de la propiedad
            </label>
          </div>

          <div className="relative w-80 mt-2">
            <input 
              type="text" 
              id="descripcion" 
              name="descripcion"
              key={editingProperty ? editingProperty.descripcion : "descripcion"}
              defaultValue={editingProperty ? editingProperty.descripcion : ""}
              className="peer border border-gray-300 rounded-md px-3 pt-5 pb-2 w-full focus:ring-2 focus:ring-[#840705] focus:outline-none"
            />
            <label htmlFor="descripcion" className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[#840705] peer-focus:text-sm">
              Descripción de la propiedad
            </label>
          </div>

          <div className="relative w-80 mt-2">
            <input 
              type="text" 
              id="ubicacion" 
              name="ubicacion"
              key={editingProperty ? editingProperty.ubicacion : "ubicacion"}
              defaultValue={editingProperty ? editingProperty.ubicacion : ""}
              className="peer border border-gray-300 rounded-md px-3 pt-5 pb-2 w-full focus:ring-2 focus:ring-[#840705] focus:outline-none"
            />
            <label htmlFor="ubicacion" className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[#840705] peer-focus:text-sm">
              Ubicación
            </label>
          </div>

          <div className="relative w-80 mt-2">
            <input 
              type="number" 
              id="precio" 
              name="precio"
              key={editingProperty ? editingProperty.precio : "precio"}
              defaultValue={editingProperty ? editingProperty.precio : ""}
              className="peer border border-gray-300 rounded-md px-3 pt-5 pb-2 w-full focus:ring-2 focus:ring-[#840705] focus:outline-none"
            />
            <label htmlFor="precio" className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[#840705] peer-focus:text-sm">
              Precio
            </label>
          </div>

          <div className="relative w-80 mt-2">
            <input 
              type="text" 
              id="area" 
              name="area"
              key={editingProperty ? editingProperty.area : "area"}
              defaultValue={editingProperty ? editingProperty.area : ""}
              className="peer border border-gray-300 rounded-md px-3 pt-5 pb-2 w-full focus:ring-2 focus:ring-[#840705] focus:outline-none"
            />
            <label htmlFor="area" className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[#840705] peer-focus:text-sm">
              ¿Cuántos metros cuadrados tiene la propiedad?
            </label>
          </div>

          <div className="relative w-80 mt-2">
            <input 
              type="number" 
              id="bedrooms" 
              name="bedrooms"
              key={editingProperty ? editingProperty.bedrooms : "bedrooms"}
              defaultValue={editingProperty ? editingProperty.bedrooms : ""}
              className="peer border border-gray-300 rounded-md px-3 pt-5 pb-2 w-full focus:ring-2 focus:ring-[#840705] focus:outline-none"
            />
            <label htmlFor="bedrooms" className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[#840705] peer-focus:text-sm">
              ¿Cuántas habitaciones tiene la propiedad?
            </label>
          </div>

          <div className="relative w-80 mt-2">
            <input
              type="number" 
              id="bathrooms" 
              name="bathrooms"
              key={editingProperty ? editingProperty.bathrooms : "bathrooms"}
              defaultValue={editingProperty ? editingProperty.bathrooms : ""}
              className="peer border border-gray-300 rounded-md px-3 pt-5 pb-2 w-full focus:ring-2 focus:ring-[#840705] focus:outline-none"
            />
            <label htmlFor="bathrooms" className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[#840705] peer-focus:text-sm">
              ¿Cuántos baños tiene la propiedad?
            </label>
          </div>

          <div className="relative w-80 mt-2">
            <select
              id="type"
              name="type"
              key={editingProperty ? editingProperty.type : "type"}
              defaultValue={editingProperty ? editingProperty.type : ""}
              className="peer border border-gray-300 rounded-md px-3 pt-5 pb-2 w-full focus:ring-2 focus:ring-[#840705] focus:outline-none"
            >
              <option value="Venta">Venta</option>
              <option value="Arriendo">Arriendo</option>
            </select>
            <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[#840705] peer-focus:text-sm">
              Elige si vendes o arriendas tu propiedad
            </label>
          </div>

          {/* Sección de imágenes */}
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
                  <div key={index} className="relative w-full h-40 rounded-md overflow-hidden">
                    <Image src={url} alt={`Imagen ${index + 1}`} layout="fill" objectFit="cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            className="flex items-center justify-center bg-[#840705] w-80 border rounded-md mb-10 mt-6 py-2 text-white cursor-pointer hover:bg-[#5c0404] transition disabled:opacity-50"
            disabled={uploading || (editingProperty ? false : imagesUrls.length === 0)} // Si estamos editando, permitimos enviar sin nuevas imágenes. Si es un nuevo registro, requerimos al menos una imagen.
            type="submit"
          >
            {uploading ? "Subiendo imagen..." : editingProperty? "Actualizar propiedad" : "Registrar propiedad"  }
          </button>
        </form>
      </div>

      {/* Columna de listado de propiedades */}
      <div className="lg:col-span-2">
        <h3 className="font-bold text-2xl text-gray-800 mb-4">Mis propiedades</h3>
        
        {loadingProperties ? (
          <div className="text-gray-500 animate-pulse">
            Cargando propiedades...
          </div>
        ) : myProperties.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200 p-6">
            <p className="text-gray-600 font-medium">Aún no has registrado ninguna propiedad.</p>
            <p className="text-gray-400 text-xs mt-1">Usa el formulario de la izquierda para publicar tu primer inmueble.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myProperties.map((propiedad) => (
              //Card de las propiedades del usuario, con un botón para editar cada una. Al hacer clic en el botón de editar, se cargan los datos de la propiedad en el formulario para que el usuario pueda modificarla y actualizarla.

              <div key={propiedad.idPropiedad} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <PropertyCard key={propiedad.idPropiedad} property={propiedad} />

                <button
                  onClick={() => {
                    setEditingProperty(propiedad);
                    setImagesUrls(propiedad.images || []); // Cargar las imágenes existentes en el estado para mostrarlas en el formulario
                  }}
                  className= "flex center text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-1.5 rounded-lg text-xs transition cursor-pointer w-full mt-4"
                >
                  Editar propiedad
                </button>

                <button
                  onClick={() => handleDeleteProperty(propiedad.idPropiedad)}
                  className="text-center bg-red-50 hover:bg-red-200 text-red-700 font-medium px-3 py-1.5 rounded-lg text-xs cursor-pointer"
                >
                  Eliminar propiedad
                </button>
              </div>
              
            ))}
          </div>
        )}
      </div>

    </div>
  );
}