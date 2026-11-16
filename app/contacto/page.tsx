"use client";

import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function ContactoPage() {
  const { t, lang } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section
        className="pt-36 pb-20 relative overflow-hidden"
        style={{ background: "#1A1D29" }}
      >
        {/* Cyan glow */}
        <div
          className="absolute"
          style={{
            top: "-40%", right: "-5%",
            width: "50vw", height: "50vw",
            background: "radial-gradient(circle, rgba(28,197,220,0.10) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h1
            className="font-heading font-black mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 42px)", letterSpacing: "-0.02em", color: "#F1F5F9" }}
          >
            {t.contact.pageTitle}
          </h1>
          <p className="text-lg" style={{ color: "rgba(241,245,249,0.70)" }}>{t.contact.pageDesc}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="yh-contact-grid">
            {/* Form (65%) */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-yhopping-gray-200 bg-white p-8 shadow-sm">
                <h2 className="font-heading font-bold text-2xl text-yhopping-gray-900 mb-7">
                  {t.contact.formTitle}
                </h2>
                <p className="mb-6 text-yhopping-gray-700">{lang === "es" ? "El formulario de envío está temporalmente deshabilitado. Escríbenos desde tu correo; abrir el enlace no envía el mensaje automáticamente." : "The submission form is temporarily disabled. Write from your email app; opening the link does not send a message automatically."}</p><a className="inline-flex rounded-lg bg-yhopping-blue text-white px-6 py-4 font-semibold" href="mailto:atencionaclientes@yhopping.com">{lang === "es" ? "Abrir mi correo" : "Open my email app"}</a>
              </div>
            </div>

            {/* Sidebar (35%) */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-yhopping-gray-50 border border-yhopping-gray-200 p-8 lg:sticky lg:top-24">
                <h3 className="font-heading font-bold text-lg text-yhopping-gray-900 mb-6">
                  {t.contact.infoTitle}
                </h3>
                <ul className="space-y-5">
                  <li>
                    <a href="mailto:atencionaclientes@yhopping.com" className="flex items-start gap-3 group">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#0046FF15,#1CC5DC25)" }}>
                        <Mail size={18} className="text-yhopping-cyan" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-yhopping-cyan uppercase tracking-widest mb-0.5">Email</p>
                        <p className="text-sm text-yhopping-gray-700 group-hover:text-yhopping-blue transition-colors">
                          atencionaclientes@yhopping.com
                        </p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="tel:+525645358621" className="flex items-start gap-3 group">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#0046FF15,#1CC5DC25)" }}>
                        <Phone size={18} className="text-yhopping-cyan" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-yhopping-cyan uppercase tracking-widest mb-0.5">{t.contact.phone}</p>
                        <p className="text-sm text-yhopping-gray-700 group-hover:text-yhopping-blue transition-colors">
                          +52 56 4535 8621
                        </p>
                      </div>
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#0046FF15,#1CC5DC25)" }}>
                      <MapPin size={18} className="text-yhopping-cyan" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-yhopping-cyan uppercase tracking-widest mb-0.5">
                        {t.contact.location.includes("Monterrey") ? "Ubicación" : "Location"}
                      </p>
                      <p className="text-sm text-yhopping-gray-700">{t.contact.location}</p>
                    </div>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/company/yhopping" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#0046FF15,#1CC5DC25)" }}>
                        <LinkedinIcon size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-yhopping-cyan uppercase tracking-widest mb-0.5">LinkedIn</p>
                        <p className="text-sm text-yhopping-gray-700 group-hover:text-yhopping-blue transition-colors">
                          linkedin.com/company/yhopping
                        </p>
                      </div>
                    </a>
                  </li>
                </ul>

                <div className="mt-8 pt-6 border-t border-yhopping-gray-200">
                  <p className="text-xs text-yhopping-gray-700 leading-relaxed">
                    {t.contact.responseNote}{" "}
                    <strong className="text-yhopping-green">{t.contact.freeConsult}</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
