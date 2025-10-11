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
    <header className="flex items-center justify-between bg-[#840705] text-[#F7F6F6]">
      <nav>
        {links.map((link) => (
        <>
          <Link
            key={link.href}
            href={link.href}
            className={`${pathName === link.href ? "font-semibold underline" : ""}`}

          >
            {link.label}
          </Link>
          
          
        </>
        ))}
        <div className="text-x font-bold text-[#F7F6F6]"> Compra y venta de propiedades</div>
      </nav>
    </header>
  )
}