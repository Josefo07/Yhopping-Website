"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Footer() {
  const { t } = useLanguage();

  const serviceLinks = [
    [t.services.items[0].title, "/servicios#cfo"],
    [t.services.items[1].title, "/servicios#flujo"],
    [t.services.items[2].title, "/servicios#automatizacion"],
    [t.services.items[3].title, "/servicios#diagnostico"],
  ] as [string, string][];

  return (
    <footer className="bg-yhopping-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Image
              src="/images/yh-logo-tagline-dark.png"
              alt="Yhopping — Potenciando Empresas"
              width={520}
              height={148}
              className="h-14 w-auto mb-4"
            />
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              {t.footer.tagline}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-700 text-sm tracking-widest text-yhopping-cyan uppercase mb-5">
              {t.footer.services}
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-400 hover:text-yhopping-cyan transition-colors duration-200 link-underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-700 text-sm tracking-widest text-yhopping-cyan uppercase mb-5">
              {t.footer.contact}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:atencionaclientes@yhopping.com"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-yhopping-cyan transition-colors duration-200"
                >
                  <Mail size={14} className="flex-shrink-0" />
                  atencionaclientes@yhopping.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+525645358621"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-yhopping-cyan transition-colors duration-200"
                >
                  <Phone size={14} className="flex-shrink-0" />
                  +52 56 4535 8621
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2 text-sm text-gray-400">
                  <MapPin size={14} className="flex-shrink-0" />
                  {t.contact.location}
                </span>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/yhopping"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-yhopping-cyan transition-colors duration-200"
                >
                  <LinkedinIcon size={14} />
                  linkedin.com/company/yhopping
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">{t.footer.copyright}</p>
          <Link
            href="/insights"
            className="text-xs text-gray-500 hover:text-yhopping-cyan transition-colors duration-200"
          >
            {t.nav.insights}
          </Link>
        </div>
      </div>
    </footer>
  );
}
