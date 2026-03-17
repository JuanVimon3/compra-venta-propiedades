
//Este componente es el footer de la aplicación, que se muestra en la parte inferior de todas las páginas. Contiene el nombre del autor y un mensaje de derechos reservados. El diseño es responsive, adaptándose a diferentes tamaños de pantalla.

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-[#840705] text-[#f7f6f6] py-4 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-center  sm:text-left gap-2">
        <h4 className="font-bold text-lg">Juan David Villa Monsalve</h4>
        <p className="text-sm opacity-80">
          © {new Date().getFullYear()} Compra y venta de propuedades. Todos los derechos reservados
        </p>
      </div>
    </footer>
  )
}