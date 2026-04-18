"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { TrendingUp, Droplets, Zap, FileSearch, CheckCircle } from "lucide-react";
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
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_ia.png"
          alt="Yhopping hero"
          fill
          className="object-cover object-center opacity-15"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(0,70,255,0.95) 0%, rgba(28,197,220,0.85) 100%)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-yhopping-cyan animate-pulse" />
            <span className="text-white text-xs font-semibold tracking-widest uppercase">
              {t.home.badge}
            </span>
          </div>

          <h1
            className="text-white font-heading font-black leading-tight mb-6"
            style={{ fontSize: "clamp(40px, 5vw, 56px)", letterSpacing: "-0.02em" }}
          >
            {t.home.hero}
          </h1>

          <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-2xl">
            {t.home.heroSub}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/diagnostico"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-yhopping-dark bg-white text-base shadow-2xl transition-all duration-200 hover:scale-105 hover:shadow-white/20"
            >
              {t.home.ctaPrimary}
            </Link>
            <Link
              href="/servicios"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-white border-2 border-white/60 text-base transition-all duration-200 hover:bg-white/10"
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
                href="/diagnostico"
                className="inline-flex items-center justify-center mt-10 px-7 py-3.5 rounded-full font-bold text-white text-sm shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
                style={{ background: "linear-gradient(135deg, #0046FF, #1CC5DC)" }}
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
      <ServiciosPreview />
      <PorQueSection />
      <CTAFinal />
    </>
  );
}
