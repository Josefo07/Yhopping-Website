"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/servicios", label: "Servicios" },
  { href: "/insights", label: "Insights" },
  { href: "/diagnostico", label: "Diagnóstico" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-lg bg-white/90 shadow-sm border-b border-yhopping-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-28 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          {/* Desktop logo */}
          <Image
            src="/images/yhopping_logo_hires.png"
            alt="Yhopping"
            width={1000}
            height={1000}
            className="hidden md:block h-24 w-auto"
            priority
          />
          {/* Mobile logo */}
          <Image
            src="/images/yhopping_logo_hires.png"
            alt="Yhopping"
            width={1000}
            height={1000}
            className="md:hidden h-18 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-underline text-yhopping-gray-700 hover:text-yhopping-gray-900 font-semibold text-sm tracking-wide transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/diagnostico"
            className="px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #0046FF, #1CC5DC)",
            }}
          >
            Diagnóstico Gratuito
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-yhopping-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-yhopping-gray-200 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-yhopping-gray-700 font-semibold text-base"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/diagnostico"
            className="text-center px-5 py-3 rounded-full text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg, #0046FF, #1CC5DC)" }}
            onClick={() => setMenuOpen(false)}
          >
            Diagnóstico Gratuito
          </Link>
        </div>
      )}
    </header>
  );
}
