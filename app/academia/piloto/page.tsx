"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { esAcademia } from "@/lib/i18n/es-academia";
import { enAcademia } from "@/lib/i18n/en-academia";
import type { AcademiaTranslations } from "@/lib/i18n/types";

/* ─── TYPES ─── */
type Screen = "landing" | "quiz" | "contact" | "submitting" | "results";

interface ContactData {
  name: string;
  email: string;
  phone: string;
  company: string;
}

/* ─── HELPERS ─── */
function computeScore(answers: Record<string, number>): number {
  return Object.values(answers).reduce((acc, v) => acc + v, 0);
}

function getProfile(score: number, t: AcademiaTranslations) {
  const sorted = [...t.profiles].sort((a, b) => b.min - a.min);
  return sorted.find((p) => score >= p.min) ?? t.profiles[0];
}

function buildWhatsAppText(
  t: AcademiaTranslations,
  contact: ContactData,
  answers: Record<string, number>,
  score: number,
  lang: string
): string {
  const profile = getProfile(score, t);
  const lines = [
    `*${lang === "es" ? "Nuevo registro" : "New registration"} — Yhopping Academia Piloto*`,
    ``,
    `👤 *${t.nameLabel}:* ${contact.name}`,
    `📧 *${t.emailLabel}:* ${contact.email}`,
    `📱 *${t.phoneLabel}:* ${contact.phone}`,
    `🏢 *${t.companyLabel}:* ${contact.company || "—"}`,
    ``,
    `📊 *${t.profileLabel}:* ${profile.label} (${score} pts)`,
    ``,
    ...t.questions.map((q, i) => {
      const val = answers[q.id as string] ?? 0;
      const opt = q.options.find((o) => o.value === val);
      return `${q.icon} ${q.text}\n→ ${opt?.label ?? "—"}`;
    }),
  ];
  return encodeURIComponent(lines.join("\n"));
}

function buildEmailBody(
  t: AcademiaTranslations,
  contact: ContactData,
  answers: Record<string, number>,
  score: number,
  lang: string
): string {
  const profile = getProfile(score, t);
  const subject = encodeURIComponent(
    lang === "es"
      ? `Nuevo piloto Academia IA: ${contact.name}`
      : `New AI Academy pilot: ${contact.name}`
  );
  const lines = [
    `${lang === "es" ? "Nuevo registro" : "New registration"} — Yhopping Academia Piloto`,
    ``,
    `${t.nameLabel}: ${contact.name}`,
    `${t.emailLabel}: ${contact.email}`,
    `${t.phoneLabel}: ${contact.phone}`,
    `${t.companyLabel}: ${contact.company || "—"}`,
    ``,
    `${t.profileLabel}: ${profile.label} (${score} pts)`,
    ``,
    ...t.questions.map((q, i) => {
      const val = answers[q.id as string] ?? 0;
      const opt = q.options.find((o) => o.value === val);
      return `${q.text}\n-> ${opt?.label ?? "—"}`;
    }),
  ];
  const body = encodeURIComponent(lines.join("\n"));
  return `mailto:academia@yhopping.com?subject=${subject}&body=${body}`;
}

/* ─── SCREENS ─── */

function LandingScreen({
  t,
  onStart,
}: {
  t: AcademiaTranslations;
  onStart: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-indigo-700 text-xs font-semibold tracking-widest uppercase">
            {t.badge}
          </span>
        </div>

        <h1
          className="font-heading font-black text-yhopping-gray-900 mb-5 leading-tight"
          style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
        >
          {t.heroTitle}
        </h1>

        <p className="text-yhopping-gray-700 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          {t.heroDesc}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          {t.proofPoints.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-sm text-yhopping-gray-700"
            >
              <CheckCircle size={16} className="text-yhopping-green flex-shrink-0" />
              {p}
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          className="inline-flex items-center justify-center px-10 py-4 rounded-full font-bold text-white text-base shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
          style={{ background: "linear-gradient(135deg, #0046FF, #1CC5DC)" }}
        >
          {t.startBtn}
        </button>

        <p className="mt-8 text-xs text-yhopping-gray-700 max-w-md mx-auto">
          {t.disclaimer}
        </p>
      </div>
    </div>
  );
}

function QuizScreen({
  t,
  answers,
  onAnswer,
  onNext,
  onBack,
  currentQ,
}: {
  t: AcademiaTranslations;
  answers: Record<string, number>;
  onAnswer: (id: string, value: number) => void;
  onNext: () => void;
  onBack: () => void;
  currentQ: number;
}) {
  const q = t.questions[currentQ];
  const selected = answers[q.id as string];
  const isLast = currentQ === t.questions.length - 1;
  const progress = ((currentQ + 1) / t.questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-xl w-full">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-yhopping-gray-700 mb-2">
            <span>
              {t.question} {currentQ + 1} {t.of} {t.questions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-yhopping-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #0046FF, #1CC5DC)",
              }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl border border-yhopping-gray-200 p-8 shadow-sm">
          <div className="text-4xl mb-4">{q.icon}</div>
          <h2 className="font-heading font-bold text-xl text-yhopping-gray-900 mb-6 leading-snug">
            {q.text}
          </h2>

          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => onAnswer(q.id as string, opt.value)}
                className={`w-full text-left px-5 py-4 rounded-xl border text-sm font-medium transition-all duration-150 ${
                  selected === opt.value
                    ? "border-yhopping-cyan bg-yhopping-cyan/5 text-yhopping-blue"
                    : "border-yhopping-gray-200 text-yhopping-gray-900 hover:border-yhopping-cyan/50 hover:bg-yhopping-gray-50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onBack}
            className="text-sm font-semibold text-yhopping-gray-700 hover:text-yhopping-blue transition-colors"
          >
            {t.back}
          </button>
          <button
            onClick={onNext}
            disabled={selected === undefined}
            className="inline-flex items-center justify-center px-7 py-3 rounded-full font-bold text-white text-sm shadow transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{ background: "linear-gradient(135deg, #0046FF, #1CC5DC)" }}
          >
            {isLast
              ? (t.contactTitle.split(" ")[0] === "Almost" ? "Continue →" : "Continuar →")
              : t.next}
          </button>
        </div>
      </div>
    </div>
  );
}

function ContactScreen({
  t,
  contact,
  onChange,
  onSubmit,
  onBack,
  isSubmitting,
}: {
  t: AcademiaTranslations;
  contact: ContactData;
  onChange: (field: keyof ContactData, value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}) {
  const inputClass =
    "w-full border border-yhopping-gray-300 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-yhopping-cyan/30 focus:border-yhopping-cyan";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-md w-full">
        <h2 className="font-heading font-bold text-2xl text-yhopping-gray-900 mb-2">
          {t.contactTitle}
        </h2>
        <p className="text-yhopping-gray-700 mb-8 text-sm">{t.contactDesc}</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-yhopping-gray-700 mb-1.5">
              {t.nameLabel} <span className="text-red-500">*</span>
            </label>
            <input
              value={contact.name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder={t.namePlaceholder}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-yhopping-gray-700 mb-1.5">
              {t.emailLabel} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={contact.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder={t.emailPlaceholder}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-yhopping-gray-700 mb-1.5">
              {t.phoneLabel} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={contact.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder={t.phonePlaceholder}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-yhopping-gray-700 mb-1.5">
              {t.companyLabel}
            </label>
            <input
              value={contact.company}
              onChange={(e) => onChange("company", e.target.value)}
              placeholder={t.companyPlaceholder}
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={onBack}
            className="text-sm font-semibold text-yhopping-gray-700 hover:text-yhopping-blue transition-colors"
          >
            {t.back}
          </button>
          <button
            onClick={onSubmit}
            disabled={!contact.name || !contact.email || !contact.phone || isSubmitting}
            className="inline-flex items-center justify-center px-7 py-3 rounded-full font-bold text-white text-sm shadow transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{ background: "linear-gradient(135deg, #0046FF, #1CC5DC)" }}
          >
            {isSubmitting ? t.submitting : t.submitBtn}
          </button>
        </div>

        <p className="mt-6 text-xs text-yhopping-gray-700 text-center">{t.disclaimer}</p>
      </div>
    </div>
  );
}

function ResultsScreen({
  t,
  contact,
  answers,
  score,
  lang,
  onRestart,
}: {
  t: AcademiaTranslations;
  contact: ContactData;
  answers: Record<string, number>;
  score: number;
  lang: string;
  onRestart: () => void;
}) {
  const profile = getProfile(score, t);
  const waNumber = "5215645358621";
  const waText = buildWhatsAppText(t, contact, answers, score, lang);
  const mailtoHref = buildEmailBody(t, contact, answers, score, lang);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-lg w-full text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          style={{ background: "linear-gradient(135deg, #0046FF, #1CC5DC)" }}>
          <CheckCircle size={32} className="text-white" />
        </div>

        <h2 className="font-heading font-bold text-2xl text-yhopping-gray-900 mb-3">
          {t.resultsTitle}
        </h2>
        <p className="text-yhopping-gray-700 mb-8">{t.resultsDesc}</p>

        {/* Profile Card */}
        <div
          className="rounded-2xl p-6 mb-8 text-left border"
          style={{ borderColor: profile.color, background: `${profile.color}10` }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-2"
            style={{ color: profile.color }}>
            {t.profileLabel}
          </p>
          <p className="font-heading font-bold text-xl text-yhopping-gray-900 mb-1">
            {profile.label}
          </p>
          <p className="text-sm text-yhopping-gray-700">{profile.sublabel}</p>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 h-2 bg-yhopping-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, (score / 24) * 100)}%`, background: profile.color }}
              />
            </div>
            <span className="text-xs font-bold" style={{ color: profile.color }}>
              {score}/24
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <a
            href={`https://wa.me/${waNumber}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-full font-bold text-white text-sm shadow-lg transition-all duration-200 hover:scale-105"
            style={{ background: "#25D366" }}
          >
            💬 {t.whatsappBtn}
          </a>

          <a
            href={mailtoHref}
            className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-full font-bold text-sm border-2 border-yhopping-blue text-yhopping-blue transition-all duration-200 hover:bg-yhopping-blue/5"
          >
            ✉️ {t.emailBtn}
          </a>
        </div>

        <button
          onClick={onRestart}
          className="mt-6 text-sm font-semibold text-yhopping-gray-700 hover:text-yhopping-blue transition-colors underline"
        >
          {t.restartBtn}
        </button>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function AcademiaPilotoPage() {
  const { lang } = useLanguage();
  const t: AcademiaTranslations = lang === "en" ? enAcademia : esAcademia;

  const [screen, setScreen] = useState<Screen>("landing");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [contact, setContact] = useState<ContactData>({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleAnswer(id: string, value: number) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function handleNext() {
    if (currentQ < t.questions.length - 1) {
      setCurrentQ((q) => q + 1);
    } else {
      setScreen("contact");
    }
  }

  function handleQuizBack() {
    if (currentQ === 0) {
      setScreen("landing");
    } else {
      setCurrentQ((q) => q - 1);
    }
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    try {
      await fetch("/api/academia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact, answers, lang }),
      });
    } catch {
      // Silently continue — user still gets WhatsApp/email buttons
    }
    setIsSubmitting(false);
    setScreen("results");
  }

  function handleRestart() {
    setScreen("landing");
    setCurrentQ(0);
    setAnswers({});
    setContact({ name: "", email: "", phone: "", company: "" });
  }

  const score = computeScore(answers);

  return (
    <div className="min-h-screen bg-white">
      {/* Back to home */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-yhopping-gray-700 hover:text-yhopping-blue transition-colors bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-yhopping-gray-200 shadow-sm"
        >
          <ArrowLeft size={15} />
          Yhopping
        </Link>
      </div>

      {screen === "landing" && (
        <LandingScreen t={t} onStart={() => setScreen("quiz")} />
      )}

      {screen === "quiz" && (
        <QuizScreen
          t={t}
          answers={answers}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onBack={handleQuizBack}
          currentQ={currentQ}
        />
      )}

      {screen === "contact" && (
        <ContactScreen
          t={t}
          contact={contact}
          onChange={(field, value) =>
            setContact((prev) => ({ ...prev, [field]: value }))
          }
          onSubmit={handleSubmit}
          onBack={() => {
            setCurrentQ(t.questions.length - 1);
            setScreen("quiz");
          }}
          isSubmitting={isSubmitting}
        />
      )}

      {screen === "results" && (
        <ResultsScreen
          t={t}
          contact={contact}
          answers={answers}
          score={score}
          lang={lang}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
