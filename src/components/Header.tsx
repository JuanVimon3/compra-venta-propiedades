"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react"

export default function Header() {
  const pathName = usePathname()
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "home" },
    { href: "/createAccount", label: "Crear cuenta" },
    { href: "/login", label: "Ingresar" }
  ]

  return (
    <header className="bg-[#840705] text-[#F7F6F6] py-4 px-6 relative shadow-md">

      <div className="flex items-center justify-between max-w-6xl mx-auto">

        <h1 className="hidden md:block absolute left-1/2 transform -translate-x-1/2 text-lg lg:text-xl text-[#F7F6F6] "> Compra y venta de propiedades</h1>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <nav className={`
        ${menuOpen ? "flex" : "hidden"}
        flex-col md:flex md:flex-row md:space-x-16 absolute md:static top-16 letf-0 w-full md:w-auto bg-[#840705] md:bg-transparent text-center md:text-left transition-all duration-300 z-20
        `}>

          {links.map((link) =>
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`
              block py-2 md:py-0
              ${pathName === link.href ? "font-semibold underline" : ""}
              `}
            >
              {link.label}
            </Link>
          )}
        </nav>

      </div>

      <h1 className="md:hidden text-center font-bold mt-2 text-base">
        Compra y venta de propiedades
      </h1>

    </header>
  )
}