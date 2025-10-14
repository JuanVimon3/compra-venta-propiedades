"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathName = usePathname()
  const links = [
    { href: "/", label: "home" },
    { href: "/createAccount", label: "Crear cuenta" },
    { href: "/login", label: "Ingresar" }
  ]

  return (
    <header className="flex items-center justify-between bg-[#840705] text-[#F7F6F6] py-4 px-6">
      <nav className=" lg:flex ml-0 mr-0 space-x-16 mx-auto font-source-sans">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${pathName === link.href ? "font-semibold underline" : ""}`}

          >
            {link.label}
          </Link>

        ))}
      </nav>
      <div className="absolute left-1/2 transform -translate-x-1/2 font-bold text-lg text-[#F7F6F6] "> Compra y venta de propiedades</div>
    </header>
  )
}