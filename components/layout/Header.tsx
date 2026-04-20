"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Lang } from "@/lib/i18n/types";

function LangToggle({ mobile = false, dark = false }: { mobile?: boolean; dark?: boolean }) {
  const { lang, setLang } = useLanguage();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,70,255,0.08)",
        border: `1px solid ${dark ? "rgba(255,255,255,0.18)" : "rgba(0,70,255,0.15)"}`,
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
            color: lang === l ? "#fff" : dark ? "rgba(255,255,255,0.6)" : "#6B7280",
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

  const isDark = !scrolled; // sobre el Hero dark, antes de hacer scroll

  return (
    <header
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        transition: "background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #E9ECEF" : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 80, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* ── LOGO ── contenedor de tamaño fijo, ambas imágenes superpuestas */}
        <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0, position: "relative", height: 40, width: 160 }}>
          {/* Dark logo: sobre Hero oscuro */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/yh-logo-dark.png"
            alt="Yhopping"
            style={{
              position: "absolute", top: 0, left: 0,
              height: 40, width: "auto",
              opacity: scrolled ? 0 : 1,
              transition: "opacity 0.3s ease",
            }}
          />
          {/* Light logo: cuando scrolled sobre fondo blanco */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/yh-logo-light.png"
            alt="Yhopping"
            style={{
              position: "absolute", top: 0, left: 0,
              height: 40, width: "auto",
              opacity: scrolled ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          />
        </Link>

        {/* ── DESKTOP NAV ── */}
        <nav style={{ display: "flex", alignItems: "center", gap: 24 }} className="hidden md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-underline"
              style={{
                color: isDark ? "rgba(255,255,255,0.85)" : "#495057",
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: "0.02em",
                transition: "color 0.2s",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
          <LangToggle dark={isDark} />
          <Link
            href="/diagnostico-empresarial"
            style={{
              padding: "10px 20px",
              borderRadius: 99,
              fontSize: 13,
              fontWeight: 700,
              color: isDark ? "#1A1D29" : "#fff",
              background: isDark ? "#1CC5DC" : "linear-gradient(135deg, #0046FF, #1CC5DC)",
              transition: "all 0.2s",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            {t.nav.freeDiagnostic}
          </Link>
        </nav>

        {/* ── MOBILE: lang toggle + hamburger ── */}
        <div className="md:hidden" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <LangToggle dark={isDark} />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
            style={{
              background: "transparent",
              border: "none",
              color: isDark ? "#F1F5F9" : "#495057",
              cursor: "pointer",
              padding: 8,
              display: "flex",
            }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div
          style={{
            background: "#fff",
            borderTop: "1px solid #E9ECEF",
            padding: "20px 24px 28px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
          className="md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ color: "#495057", fontWeight: 600, fontSize: 16, textDecoration: "none" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/diagnostico-empresarial"
            style={{
              textAlign: "center",
              padding: "14px 20px",
              borderRadius: 99,
              fontSize: 14,
              fontWeight: 700,
              color: "#fff",
              background: "linear-gradient(135deg, #0046FF, #1CC5DC)",
              textDecoration: "none",
            }}
            onClick={() => setMenuOpen(false)}
          >
            {t.nav.freeDiagnostic}
          </Link>
        </div>
      )}
    </header>
  );
}
