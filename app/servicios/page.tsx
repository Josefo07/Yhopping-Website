import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TrendingUp, Droplets, Zap, FileSearch, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Servicios — Yhopping Consultoría Financiera",
  description:
    "CFO Fraccional, Optimización Flujo de Caja, Automatización Office 365 y Diagnóstico Financiero para PyMEs mexicanas. Precios claros, ROI medible.",
};

interface ServicioProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  incluye: string[];
  sidebar: {
    para: string;
    modalidad: string;
    inversion: string;
    resultados: string;
  };
  reversed?: boolean;
  bg?: string;
}

function ServicioSection({ id, icon, title, desc, incluye, sidebar, reversed, bg }: ServicioProps) {
  return (
    <section id={id} className={`py-20 ${bg ?? "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          className={`grid grid-cols-1 lg:grid-cols-3 gap-12 items-start ${
            reversed ? "lg:grid-flow-dense" : ""
          }`}
        >
          {/* Main content */}
          <div className={`lg:col-span-2 ${reversed ? "lg:col-start-1" : ""}`}>
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: "linear-gradient(135deg, #0046FF15, #1CC5DC25)" }}
            >
              {icon}
            </div>
            <h2
              className="font-heading font-bold mb-4"
              style={{
                fontSize: "clamp(26px, 2.5vw, 32px)",
                color: "#212529",
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h2>
            <p className="text-yhopping-gray-700 leading-relaxed mb-8 text-lg">{desc}</p>

            <h3 className="font-heading font-bold text-base text-yhopping-gray-900 mb-4 uppercase tracking-wide text-sm">
              Qué incluye
            </h3>
            <ul className="space-y-3">
              {incluye.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check size={18} className="text-yhopping-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-yhopping-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar */}
          <div className={reversed ? "lg:col-start-3" : ""}>
            <div className="rounded-2xl border border-yhopping-gray-200 bg-yhopping-gray-50 p-7 sticky top-24">
              <div className="space-y-5">
                {[
                  { label: "Para quién", value: sidebar.para },
                  { label: "Modalidad", value: sidebar.modalidad },
                  { label: "Inversión", value: sidebar.inversion, highlight: true },
                  { label: "Resultados esperados", value: sidebar.resultados },
                ].map(({ label, value, highlight }) => (
                  <div key={label}>
                    <p className="text-xs font-semibold text-yhopping-cyan uppercase tracking-widest mb-1">
                      {label}
                    </p>
                    <p
                      className={`text-sm leading-relaxed ${
                        highlight
                          ? "font-bold text-yhopping-blue text-base"
                          : "text-yhopping-gray-700"
                      }`}
                    >
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
                Solicitar información →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServiciosPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/servicios_dashboard.png"
            alt="Servicios Yhopping"
            fill
            className="object-cover object-center opacity-10"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(0,70,255,0.92) 0%, rgba(28,197,220,0.85) 100%)",
            }}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h1
            className="font-heading font-black text-white mb-5"
            style={{ fontSize: "clamp(32px, 4vw, 42px)", letterSpacing: "-0.02em" }}
          >
            Servicios de Consultoría Financiera y Operativa
          </h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto">
            Soluciones prácticas para PyMEs que quieren crecer sin perder el control.
          </p>
        </div>
      </section>

      {/* Servicios */}
      <ServicioSection
        id="cfo"
        icon={<TrendingUp size={26} className="text-yhopping-blue" />}
        title="CFO Fraccional"
        desc="Tu director financiero estratégico, disponible cuando lo necesitas. Sin el costo de tiempo completo."
        incluye={[
          "Análisis financiero mensual (P&L, Balance, Cash Flow)",
          "Proyecciones y presupuestos",
          "KPIs y dashboards ejecutivos",
          "Asesoría en decisiones estratégicas",
          "Presentaciones para inversionistas/socios",
        ]}
        sidebar={{
          para: "PyMEs $10M–$100M MXN anuales sin CFO dedicado",
          modalidad: "Retainer mensual o proyectos específicos",
          inversion: "Desde $25,000 MXN/mes",
          resultados: "Visibilidad financiera completa en 30 días",
        }}
        bg="bg-white"
      />

      <ServicioSection
        id="flujo"
        icon={<Droplets size={26} className="text-yhopping-cyan" />}
        title="Optimización Flujo de Caja"
        desc="Identifica dónde se queda el dinero y cómo liberarlo. Diagnóstico y plan implementable en 2–3 semanas."
        incluye={[
          "Diagnóstico completo de cash flow",
          "Proyección a 3 y 6 meses",
          "Plan de mejora implementable",
          "Acompañamiento en primeros pasos",
        ]}
        sidebar={{
          para: "Empresas con ventas sólidas y liquidez inconsistente",
          modalidad: "10–16 horas en 2–3 semanas",
          inversion: "$8,000–$12,000 MXN",
          resultados: "+20–40% mejora días efectivo disponible",
        }}
        reversed
        bg="bg-yhopping-gray-50"
      />

      <ServicioSection
        id="automatizacion"
        icon={<Zap size={26} className="text-yhopping-blue" />}
        title="Automatización Office 365"
        desc="Libera a tu equipo de tareas repetitivas con Power Automate, Power BI y SharePoint. Implementación real, no demos."
        incluye={[
          "Mapeo proceso actual (as-is)",
          "Diseño proceso automatizado (to-be)",
          "Implementación Power Automate",
          "Dashboards Power BI",
          "Capacitación equipo",
        ]}
        sidebar={{
          para: "Equipos que pierden 10+ horas/semana en procesos manuales",
          modalidad: "12–20 horas en 3–4 semanas",
          inversion: "$6,000–$10,000 MXN",
          resultados: "50–70% reducción tiempo en procesos clave",
        }}
        bg="bg-white"
      />

      <ServicioSection
        id="diagnostico-fin"
        icon={<FileSearch size={26} className="text-yhopping-cyan" />}
        title="Diagnóstico Financiero"
        desc="Radiografía completa de la salud financiera de tu empresa. Claridad total en 1–2 semanas."
        incluye={[
          "Estados financieros en orden",
          "Cálculo márgenes reales",
          "Identificación fugas de dinero",
          "KPIs configurados",
          "Reporte ejecutivo con recomendaciones",
        ]}
        sidebar={{
          para: "Dueños sin claridad sobre rentabilidad real",
          modalidad: "8–14 horas en 1–2 semanas",
          inversion: "$4,000–$7,000 MXN",
          resultados: "Claridad total sobre rentabilidad del negocio",
        }}
        reversed
        bg="bg-yhopping-gray-50"
      />

      {/* CTA */}
      <section className="py-20 bg-yhopping-dark text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2
            className="font-heading font-black text-white mb-4"
            style={{ fontSize: "clamp(26px, 3vw, 36px)", letterSpacing: "-0.02em" }}
          >
            ¿No sabes por dónde empezar?
          </h2>
          <p className="text-gray-400 mb-8">
            Agenda un diagnóstico gratuito de 30 min. Te decimos exactamente qué necesita tu empresa.
          </p>
          <Link
            href="/diagnostico"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full font-bold text-white text-base shadow-xl transition-all duration-200 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #0046FF, #1CC5DC)" }}
          >
            Iniciar Diagnóstico Gratuito →
          </Link>
        </div>
      </section>
    </>
  );
}
