"use client";

import Image from "next/image";
import Link from "next/link";
import { TrendingUp, Droplets, Zap, FileSearch, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const serviceIcons = [TrendingUp, Droplets, Zap, FileSearch];
const serviceIconColors = ["text-yhopping-blue", "text-yhopping-cyan", "text-yhopping-blue", "text-yhopping-cyan"];
const serviceIds = ["cfo", "flujo", "automatizacion", "diagnostico-fin"];
const serviceBgs = ["bg-white", "bg-yhopping-gray-50", "bg-white", "bg-yhopping-gray-50"];

export default function ServiciosPage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "#1A1D29" }}>
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/servicios_dashboard.png"
            alt="Servicios Yhopping"
            fill
            className="object-cover object-center"
            style={{ opacity: 0.05 }}
          />
          {/* Cyan glow top-right */}
          <div
            className="absolute"
            style={{
              top: "-20%", right: "-10%",
              width: "55vw", height: "55vw",
              background: "radial-gradient(circle, rgba(28,197,220,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          {/* Blue glow bottom-left */}
          <div
            className="absolute"
            style={{
              bottom: "-10%", left: "-5%",
              width: "40vw", height: "40vw",
              background: "radial-gradient(circle, rgba(0,70,255,0.10) 0%, transparent 70%)",
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
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h1
            className="font-heading font-black mb-5"
            style={{ fontSize: "clamp(28px, 4vw, 42px)", letterSpacing: "-0.02em", color: "#F1F5F9" }}
          >
            {t.services.pageTitle}
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(241,245,249,0.70)" }}>
            {t.services.pageDesc}
          </p>
        </div>
      </section>

      {/* Servicios */}
      {t.services.items.map((item, idx) => {
        const Icon = serviceIcons[idx];
        const reversed = idx % 2 !== 0;
        const bg = serviceBgs[idx];
        const id = serviceIds[idx];
        const iconColor = serviceIconColors[idx];

        return (
          <section key={id} id={id} className={`py-20 ${bg}`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className={`grid grid-cols-1 lg:grid-cols-3 gap-12 items-start ${reversed ? "lg:grid-flow-dense" : ""}`}>
                {/* Main content */}
                <div className={`lg:col-span-2 ${reversed ? "lg:col-start-1" : ""}`}>
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: "linear-gradient(135deg, #0046FF15, #1CC5DC25)" }}
                  >
                    <Icon size={26} className={iconColor} />
                  </div>
                  <h2
                    className="font-heading font-bold mb-4"
                    style={{ fontSize: "clamp(26px, 2.5vw, 32px)", color: "#212529", letterSpacing: "-0.02em" }}
                  >
                    {item.title}
                  </h2>
                  <p className="text-yhopping-gray-700 leading-relaxed mb-8 text-lg">{item.desc}</p>

                  <h3 className="font-heading font-bold text-base text-yhopping-gray-900 mb-4 uppercase tracking-wide text-sm">
                    {t.services.includes}
                  </h3>
                  <ul className="space-y-3">
                    {item.incluye.map((inc, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check size={18} className="text-yhopping-cyan flex-shrink-0 mt-0.5" />
                        <span className="text-yhopping-gray-700">{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sidebar */}
                <div className={reversed ? "lg:col-start-3" : ""}>
                  <div className="rounded-2xl border border-yhopping-gray-200 bg-yhopping-gray-50 p-7 lg:sticky lg:top-24">
                    <div className="space-y-5">
                      {[
                        { label: t.services.sidebarLabels.para, value: item.sidebar.para },
                        { label: t.services.sidebarLabels.modalidad, value: item.sidebar.modalidad },
                        { label: t.services.sidebarLabels.inversion, value: item.sidebar.inversion, highlight: true },
                        { label: t.services.sidebarLabels.resultados, value: item.sidebar.resultados },
                      ].map(({ label, value, highlight }) => (
                        <div key={label}>
                          <p className="text-xs font-semibold text-yhopping-cyan uppercase tracking-widest mb-1">
                            {label}
                          </p>
                          <p className={`text-sm leading-relaxed ${highlight ? "font-bold text-yhopping-blue text-base" : "text-yhopping-gray-700"}`}>
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/diagnostico"
                      className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 rounded-full font-bold text-white text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg"
                      style={{ background: "linear-gradient(135deg, #0046FF, #1CC5DC)" }}
                    >
                      {t.services.requestInfo}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-20 bg-yhopping-dark text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2
            className="font-heading font-black text-white mb-4"
            style={{ fontSize: "clamp(26px, 3vw, 36px)", letterSpacing: "-0.02em" }}
          >
            {t.services.ctaTitle}
          </h2>
          <p className="text-gray-400 mb-8">{t.services.ctaDesc}</p>
          <Link
            href="/diagnostico"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full font-bold text-white text-base shadow-xl transition-all duration-200 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #0046FF, #1CC5DC)" }}
          >
            {t.services.ctaBtn}
          </Link>
        </div>
      </section>
    </>
  );
}
