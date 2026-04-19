"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { TrendingUp, Droplets, Zap, FileSearch, CheckCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const serviceIcons = [TrendingUp, Droplets, Zap, FileSearch];
const serviceHrefs = ["/servicios#cfo", "/servicios#flujo", "/servicios#automatizacion", "/servicios#diagnostico-fin"];

function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("opacity-100", "translate-y-0");
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

function HeroSection() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#1A1D29" }}>
      {/* Background image at very low opacity */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_ia.png"
          alt="Yhopping hero"
          fill
          className="object-cover object-center"
          style={{ opacity: 0.06 }}
          priority
        />
        {/* Subtle cyan glow top-right */}
        <div
          className="absolute"
          style={{
            top: "-20%", right: "-10%",
            width: "60vw", height: "60vw",
            background: "radial-gradient(circle, rgba(28,197,220,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        {/* Subtle blue glow bottom-left */}
        <div
          className="absolute"
          style={{
            bottom: "-10%", left: "-5%",
            width: "40vw", height: "40vw",
            background: "radial-gradient(circle, rgba(0,70,255,0.10) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        {/* Subtle grid lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24 w-full">
        <div className="max-w-3xl">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8"
            style={{ background: "rgba(28,197,220,0.10)", border: "1px solid rgba(28,197,220,0.25)" }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#1CC5DC" }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#1CC5DC" }}>
              {t.home.badge}
            </span>
          </div>

          <h1
            className="font-heading font-black leading-tight mb-6"
            style={{ fontSize: "clamp(36px, 4.5vw, 54px)", letterSpacing: "-0.02em", color: "#F1F5F9" }}
          >
            {t.home.hero}
          </h1>

          <p className="text-lg leading-relaxed mb-10 max-w-2xl" style={{ color: "rgba(241,245,249,0.70)" }}>
            {t.home.heroSub}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/diagnostico-empresarial"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-base shadow-2xl transition-all duration-200 hover:scale-105"
              style={{ background: "#1CC5DC", color: "#1A1D29" }}
            >
              {t.home.ctaPrimary}
            </Link>
            <Link
              href="/servicios"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-base transition-all duration-200"
              style={{ color: "#F1F5F9", border: "2px solid rgba(241,245,249,0.35)" }}
            >
              {t.home.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemasSection() {
  const { t } = useLanguage();
  const ref = useFadeIn();
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={ref} className="opacity-0 translate-y-8 transition-all duration-700">
          <h2
            className="font-heading font-bold text-center mb-4"
            style={{ fontSize: "clamp(28px, 3vw, 32px)", color: "#212529", letterSpacing: "-0.01em" }}
          >
            {t.home.problemsTitle}
          </h2>
          <p className="text-center text-yhopping-gray-700 mb-14 max-w-xl mx-auto">
            {t.home.problemsSub}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.home.problems.map((p, i) => (
              <div
                key={i}
                className="rounded-2xl border border-yhopping-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="text-5xl mb-5">{p.icon}</div>
                <h3 className="font-heading font-bold text-xl text-yhopping-gray-900 mb-2">{p.title}</h3>
                <p className="text-yhopping-gray-700 font-semibold mb-3">&ldquo;{p.desc}&rdquo;</p>
                <p className="text-sm text-yhopping-gray-700">{p.context}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiciosPreview() {
  const { t } = useLanguage();
  const ref = useFadeIn();
  return (
    <section className="py-24 bg-yhopping-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={ref} className="opacity-0 translate-y-8 transition-all duration-700">
          <h2
            className="font-heading font-bold text-center mb-3"
            style={{ fontSize: "clamp(28px, 3vw, 32px)", color: "#212529", letterSpacing: "-0.01em" }}
          >
            {t.home.servicesTitle}
          </h2>
          <p className="text-center text-yhopping-gray-700 mb-14 max-w-xl mx-auto">
            {t.home.servicesSub}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {t.home.services.map((s, i) => {
              const Icon = serviceIcons[i];
              return (
                <div
                  key={i}
                  className="rounded-2xl bg-white border border-yhopping-gray-200 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-110"
                    style={{ background: "linear-gradient(135deg, #0046FF15, #1CC5DC20)" }}
                  >
                    <Icon size={22} className="text-yhopping-cyan" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-yhopping-gray-900 mb-2">{s.title}</h3>
                  <p className="text-yhopping-gray-700 mb-3">{s.desc}</p>
                  <p className="text-sm text-yhopping-cyan font-semibold mb-5">✓ {s.bullet}</p>
                  <Link
                    href={serviceHrefs[i]}
                    className="link-underline text-sm font-semibold text-yhopping-blue hover:text-yhopping-cyan transition-colors duration-200"
                  >
                    {t.home.viewMore}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function PorQueSection() {
  const { t } = useLanguage();
  const ref = useFadeIn();
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={ref} className="opacity-0 translate-y-8 transition-all duration-700">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3">
              <p className="text-yhopping-cyan font-semibold text-sm tracking-widest uppercase mb-3">
                {t.home.whyLabel}
              </p>
              <h2
                className="font-heading font-bold mb-8"
                style={{ fontSize: "clamp(28px, 3vw, 36px)", color: "#212529", letterSpacing: "-0.02em" }}
              >
                {t.home.whyTitle}
              </h2>
              <div className="space-y-5">
                {t.home.whyReasons.map((r, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-yhopping-green flex-shrink-0 mt-0.5" />
                    <p className="text-yhopping-gray-700">{r}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/diagnostico-empresarial"
                className="inline-flex items-center justify-center mt-10 px-7 py-3.5 rounded-full font-bold text-sm shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
                style={{ background: "#1CC5DC", color: "#1A1D29" }}
              >
                {t.home.whyCta}
              </Link>
            </div>

            <div className="lg:col-span-2">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/transformacion.png"
                  alt="Transformación financiera Yhopping"
                  width={500}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── MINI QUESTIONS DATA ── */
const miniQuestions = [
  {
    id: "q5_cashflow",
    icon: "💸",
    text: "¿Te ha pasado que tienes ventas pero no dinero disponible?",
    textEN: "Has it happened that you have sales but no available cash?",
    options: [
      { label: "Constantemente", labelEN: "All the time", value: 0 },
      { label: "Con frecuencia", labelEN: "Often", value: 1 },
      { label: "A veces", labelEN: "Sometimes", value: 2 },
      { label: "Casi nunca", labelEN: "Rarely", value: 4 },
    ],
  },
  {
    id: "q4_margin",
    icon: "💹",
    text: "¿Sabes exactamente cuál es tu margen de utilidad real?",
    textEN: "Do you know exactly what your real profit margin is?",
    options: [
      { label: "Sí, lo calculo mensualmente", labelEN: "Yes, I calculate it monthly", value: 4 },
      { label: "Tengo una idea aproximada", labelEN: "I have a rough idea", value: 2 },
      { label: "No realmente", labelEN: "Not really", value: 1 },
      { label: "No lo sé", labelEN: "I don't know", value: 0 },
    ],
  },
  {
    id: "q7_growth",
    icon: "📈",
    text: "¿Tu empresa crece pero tus utilidades no reflejan ese crecimiento?",
    textEN: "Does your business grow but profits don't reflect that growth?",
    options: [
      { label: "Sí, exactamente así", labelEN: "Yes, exactly", value: 0 },
      { label: "Un poco", labelEN: "A little", value: 1 },
      { label: "A veces", labelEN: "Sometimes", value: 2 },
      { label: "No, el crecimiento sí se refleja", labelEN: "No, growth is reflected", value: 3 },
    ],
  },
];

function TermometroMini() {
  const { lang } = useLanguage();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const isEN = lang === "en";
  const q = miniQuestions[step];
  const total = miniQuestions.length;

  function pick(value: number, idx: number) {
    setSelected(idx);
    setAnswers((prev) => ({ ...prev, [q.id]: value }));
  }

  function next() {
    if (selected === null) return;
    if (step < total - 1) {
      setStep((s) => s + 1);
      setSelected(null);
    } else {
      // Save answers and redirect
      const finalAnswers = { ...answers, [q.id]: miniQuestions[step].options[selected!].value };
      localStorage.setItem("yh_mini_answers", JSON.stringify(finalAnswers));
      router.push("/diagnostico-empresarial");
    }
  }

  const pct = ((step + (selected !== null ? 1 : 0)) / total) * 100;

  return (
    <section style={{ background: "#1A1D29", padding: "80px 0" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(28,197,220,0.10)", border: "1px solid rgba(28,197,220,0.25)",
              borderRadius: 99, padding: "6px 16px", marginBottom: 16,
            }}
          >
            <span style={{ width: 7, height: 7, background: "#1CC5DC", borderRadius: "50%" }} />
            <span style={{ color: "#1CC5DC", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em" }}>
              {isEN ? "FINANCIAL THERMOMETER" : "TERMÓMETRO FINANCIERO PYMÉ"}
            </span>
          </div>
          <h2
            style={{
              color: "#F1F5F9", fontFamily: "var(--font-heading)", fontWeight: 800,
              fontSize: "clamp(22px, 3vw, 30px)", letterSpacing: "-0.01em", margin: "0 0 8px",
            }}
          >
            {isEN ? "3 questions to assess your financial health" : "3 preguntas para medir la salud financiera de tu negocio"}
          </h2>
          <p style={{ color: "rgba(241,245,249,0.55)", fontSize: 14 }}>
            {isEN ? "30 seconds · Free · No registration required" : "30 segundos · Gratis · Sin registro"}
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 99, height: 4, marginBottom: 32 }}>
          <div
            style={{
              height: "100%", borderRadius: 99,
              background: "linear-gradient(90deg, #0046FF, #1CC5DC)",
              width: `${pct}%`,
              transition: "width 0.4s ease",
            }}
          />
        </div>

        {/* Question card */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20, padding: "32px 28px",
          }}
        >
          <p style={{ color: "rgba(241,245,249,0.45)", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", marginBottom: 12 }}>
            {isEN ? `QUESTION ${step + 1} OF ${total}` : `PREGUNTA ${step + 1} DE ${total}`}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <span style={{ fontSize: 28 }}>{q.icon}</span>
            <p style={{ color: "#F1F5F9", fontSize: "clamp(15px,2vw,17px)", fontWeight: 600, lineHeight: 1.4, margin: 0 }}>
              {isEN ? q.textEN : q.text}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {q.options.map((opt, idx) => {
              const isActive = selected === idx;
              return (
                <button
                  key={idx}
                  onClick={() => pick(opt.value, idx)}
                  style={{
                    background: isActive ? "rgba(28,197,220,0.15)" : "rgba(255,255,255,0.04)",
                    border: isActive ? "1.5px solid #1CC5DC" : "1.5px solid rgba(255,255,255,0.08)",
                    borderRadius: 12, padding: "14px 18px",
                    color: isActive ? "#1CC5DC" : "rgba(241,245,249,0.75)",
                    fontSize: 14, fontWeight: isActive ? 600 : 400,
                    textAlign: "left", cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {isEN ? opt.labelEN : opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Next button */}
        <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={next}
            disabled={selected === null}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: selected !== null ? "#1CC5DC" : "rgba(28,197,220,0.25)",
              color: selected !== null ? "#1A1D29" : "rgba(28,197,220,0.4)",
              border: "none", borderRadius: 99, padding: "12px 28px",
              fontSize: 14, fontWeight: 700, cursor: selected !== null ? "pointer" : "not-allowed",
              transition: "all 0.2s ease",
            }}
          >
            {step < total - 1
              ? (isEN ? "Next" : "Siguiente")
              : (isEN ? "See my diagnosis" : "Ver mi diagnóstico")}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

function CTAFinal() {
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-yhopping-green relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12 text-center">
        <h2
          className="font-heading font-black text-white mb-4"
          style={{ fontSize: "clamp(28px, 3vw, 40px)", letterSpacing: "-0.02em" }}
        >
          {t.home.ctaFinalTitle}
        </h2>
        <p className="text-white/80 text-lg mb-10">{t.home.ctaFinalSub}</p>
        <Link
          href="/diagnostico"
          className="inline-flex items-center justify-center px-10 py-4 rounded-full font-bold text-yhopping-green bg-white text-base shadow-xl transition-all duration-200 hover:scale-105 hover:shadow-2xl"
        >
          {t.home.ctaFinalBtn}
        </Link>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemasSection />
      <TermometroMini />
      <ServiciosPreview />
      <PorQueSection />
      <CTAFinal />
    </>
  );
}
