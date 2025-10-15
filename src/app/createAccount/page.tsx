export default function createAccount(){
  return (
    <form action="" className="flex flex-col items-center">
      <h1 className="flex flex-col items-center font-bold pt-20 pb-20 text-3xl">Crear cuenta</h1>
      <button type="button" className="flex items-center justify-center gap-3 w-80 border border-gray-400 rounded-md mb-10 py-2 bg-white hover:bg-gray-50 transition">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
          className="w-5 h-5"
        >
          <path
            fill="#EA4335"
            d="M488 261.8C488 403.3 391.1 512 248.5 512 111.2 512 0 400.8 0 263.5S111.2 15 248.5 15c66.5 0 122.7 24.5 165.2 64.9l-67 64.2C312.3 112.7 282.5 100 248.5 100c-83.1 0-150.5 67.4-150.5 150.5S165.4 401 248.5 401c77.9 0 122.8-44.3 127.9-106H248.5v-85h239.1c2.2 12.1 3.4 24.6 3.4 38z"
          />
        </svg>
        <span className="text-[#840705]">Continuar con Google</span>
      </button>

      <div className="relative w-80 mt-2">
        <input type="email" id="email" className="peer border border-gray-300 rounded-md px-3 pt-4 pb-2 w-full focus:ring-2 focus:ring-[#840705] focus:outline-none" />
        <label htmlFor="email" className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[#840705] peer-focus:text-sm">
        Dirección de correo
      </label>
      </div>


      <div className="relative w-80 mt-2">
        <input type="password" id="password" className="peer border border-gray-300 rounded-md px-3 pt-4 pb-2 w-full focus:ring-2 focus:ring-[#840705] focus:outline-none" />
        <label htmlFor="password" className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[#840705] peer-focus:text-sm">
        Contraseña
      </label>
      </div>


      <div className="flex items-center w-80 space-x-2 mt-2 mb-3">
        <input id="news" type="checkbox" className="h-4 w-4 border-gray-300 rounded accent-[#840705] focus:ring-[#840705]" />
        <label htmlFor="news" className="text-sm text-gray-700">Quiero recibir noticias y actualizaciones</label>
      </div>
      

      <button type="button" className="flex items-center justify-center bg-[#840705] w-80 border rounded-md mb-10 py-2">
        <h1 className="text-white">Crear cuenta</h1>
      </button>
    </form>
  )
}