"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Lang } from "@/lib/i18n/types";

function LangToggle({ mobile = false }: { mobile?: boolean }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "rgba(0,70,255,0.08)",
        border: "1px solid rgba(0,70,255,0.15)",
        borderRadius: 99,
        padding: "3px 4px",
        gap: 2,
      }}
    >
      {(["es", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          style={{
            background: lang === l ? "linear-gradient(135deg,#0046FF,#1CC5DC)" : "transparent",
            color: lang === l ? "#fff" : "#6B7280",
            border: "none",
            borderRadius: 99,
            padding: mobile ? "5px 12px" : "4px 10px",
            fontSize: mobile ? 14 : 12,
            fontWeight: 700,
            cursor: "pointer",
            transition: "all .2s",
            letterSpacing: ".03em",
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/servicios", label: t.nav.services },
    { href: "/insights", label: t.nav.insights },
    { href: "/diagnostico", label: t.nav.diagnostic },
    { href: "/contacto", label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-lg bg-white/90 shadow-sm border-b border-yhopping-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="/images/yhopping_logo_trimmed.png"
            alt="Yhopping"
            width={489}
            height={120}
            className="hidden md:block h-12 w-auto"
            priority
          />
          <Image
            src="/images/yhopping_logo_trimmed.png"
            alt="Yhopping"
            width={489}
            height={120}
            className="md:hidden h-9 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-underline text-yhopping-gray-700 hover:text-yhopping-gray-900 font-semibold text-sm tracking-wide transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <LangToggle />
          <Link
            href="/diagnostico"
            className="px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, #0046FF, #1CC5DC)" }}
          >
            {t.nav.freeDiagnostic}
          </Link>
        </nav>

        {/* Mobile: lang toggle + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <LangToggle />
          <button
            className="p-2 text-yhopping-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
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
            {t.nav.freeDiagnostic}
          </Link>
        </div>
      )}
    </header>
  );
}
