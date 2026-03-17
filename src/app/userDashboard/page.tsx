//Este componente es la página del panel de usuario, donde los usuarios pueden registrar y editar sus propiedades. Incluye un formulario con campos para el tipo de propiedad, descripción, ubicación, imágenes y precio. El diseño es limpio y organizado, con un enfoque en la facilidad de uso. Los usuarios pueden seleccionar el tipo de propiedad mediante casillas de verificación, ingresar una descripción y ubicación, adjuntar imágenes de la propiedad y establecer un precio. Este componente es esencial para que los usuarios puedan gestionar sus propiedades dentro de la aplicación.

export default function UserDashboard() {
  return (
    <div className="min-h-screen flex justify-center items-start pt-10">
      <div className="flex flex-col mx-auto w-auto">
        <p className="text-gray-800 font-semibold text-lg md:text-xl">
          Registro y edición de propiedad
        </p>
        <p className="text-gray-400 font-semibold text-lg md:text-xl">
          Tipo de propiedad
        </p>
        <label className="flex gap-2">
          <input type="checkbox" name="country" />
          Campestre
        </label>
        <label className="flex gap-2">
          <input type="checkbox" name="rural" />
          Rural
        </label>
        <label className="flex gap-2">
          <input type="checkbox" name="urban" />
          Urbano
        </label>
        <label className="flex gap-2">
          <input type="checkbox" name="turistic" />
          Turistica
        </label>
        <label className="flex gap-2">
          <input type="checkbox" name="parking" />
          Parqueadero
        </label>
        <label className="flex gap-2">
          <input type="text" name="description" />
          Descripción
        </label>
        <label className="flex gap-2">
          <input type="text" name="location" />
          Ubicación
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-gray-400">
          <input type="file" name="images" accept="image/*" multiple className="hidden" />
          Adjuntar imágenes de la propiedad
        </label>
        <label className="flex gap-2">
          <input type="number" name="price" />
          ¿Cuál es el valor de la propiedad?
        </label>
      </div>
    </div>
  )
}