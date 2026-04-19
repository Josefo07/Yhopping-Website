"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/* ─── TYPES ─── */
type Screen = "loading" | "quiz" | "analyzing" | "chat" | "results";
type ChatLang = "es" | "en";

interface Scores { vis: number; flujo: number; crec: number; total: number; }
interface Message { role: "user" | "assistant"; content: string; }

/* ─── FULL QUIZ (picks up after mini) ─── */
const allQuestions = [
  {
    id: "q1_size",
    text: "¿Cuántas personas trabajan en tu empresa?",
    textEN: "How many people work at your company?",
    icon: "👥",
    options: [
      { label: "Solo yo", labelEN: "Just me", value: 1 },
      { label: "2 a 10 personas", labelEN: "2–10 people", value: 2 },
      { label: "11 a 50 personas", labelEN: "11–50 people", value: 3 },
      { label: "Más de 50", labelEN: "More than 50", value: 4 },
    ],
  },
  {
    id: "q2_stage",
    text: "¿En qué etapa está tu negocio?",
    textEN: "What stage is your business in?",
    icon: "🚀",
    options: [
      { label: "Arrancando / menos de 1 año", labelEN: "Starting / less than 1 year", value: 1 },
      { label: "Estabilizando (1–3 años)", labelEN: "Stabilizing (1–3 years)", value: 2 },
      { label: "Creciendo activamente", labelEN: "Growing actively", value: 3 },
      { label: "Buscando escalar", labelEN: "Looking to scale", value: 4 },
    ],
  },
  {
    id: "q3_statements",
    text: "¿Tienes estados financieros actualizados?",
    textEN: "Do you have up-to-date financial statements?",
    icon: "📊",
    options: [
      { label: "Sí, los reviso regularmente", labelEN: "Yes, I review them regularly", value: 4 },
      { label: "Los tengo pero no los reviso", labelEN: "I have them but don't review them", value: 2 },
      { label: "Están desactualizados", labelEN: "They are outdated", value: 1 },
      { label: "No los tengo", labelEN: "I don't have them", value: 0 },
    ],
  },
  {
    id: "q6_accountant",
    text: "¿Quién maneja tus finanzas actualmente?",
    textEN: "Who currently manages your finances?",
    icon: "🧮",
    options: [
      { label: "Tengo un CFO o director financiero", labelEN: "I have a CFO or financial director", value: 4 },
      { label: "Un contador con rol estratégico", labelEN: "An accountant with a strategic role", value: 3 },
      { label: "Solo para temas fiscales", labelEN: "Only for tax filing", value: 1 },
      { label: "Yo mismo", labelEN: "I handle it myself", value: 0 },
    ],
  },
  {
    id: "q8_social",
    text: "¿Tienes metas sociales o de impacto en tu empresa?",
    textEN: "Does your company have social or impact goals?",
    icon: "🌱",
    options: [
      { label: "Sí, es central en nuestra misión", labelEN: "Yes, it's core to our mission", value: 3 },
      { label: "Sí, como objetivo secundario", labelEN: "Yes, as a secondary objective", value: 2 },
      { label: "No formalmente", labelEN: "Not formally", value: 1 },
      { label: "No, solo rentabilidad", labelEN: "No, only profitability", value: 0 },
    ],
  },
];

/* ─── SCORE COMPUTATION ─── */
function computeScores(ans: Record<string, number>): Scores {
  const q3 = ans.q3_statements ?? 2;
  const q4 = ans.q4_margin ?? 2;
  const vis = Math.min(10, ((q3 + q4) / 8) * 10);

  const q5 = ans.q5_cashflow ?? 2;
  const q6 = ans.q6_accountant ?? 1;
  const flujo = Math.min(10, ((q5 + q6) / 8) * 10);

  const q2 = ans.q2_stage ?? 2;
  const q7 = ans.q7_growth ?? 2;
  const crec = Math.min(10, ((q2 + q7) / 8) * 10);

  const total = Math.round((vis + flujo + crec) / 30 * 100);
  return { vis: parseFloat(vis.toFixed(1)), flujo: parseFloat(flujo.toFixed(1)), crec: parseFloat(crec.toFixed(1)), total };
}

/* ─── SCORE LABEL ─── */
function scoreLabel(total: number): { label: string; color: string } {
  if (total < 35) return { label: "Zona de riesgo financiero 🔴", color: "#ef4444" };
  if (total < 55) return { label: "Finanzas en proceso de orden 🟡", color: "#f59e0b" };
  if (total < 75) return { label: "Base financiera en construcción 🔵", color: "#1CC5DC" };
  return { label: "Finanzas con estructura sólida 🟢", color: "#27AE60" };
}

const analyzeMessages = [
  "Analizando visibilidad financiera…",
  "Evaluando control de flujo…",
  "Calculando estructura de crecimiento…",
  "Generando diagnóstico personalizado…",
  "¡Preparando tu resultado!",
];

/* ════════════════════════════
   MAIN COMPONENT
════════════════════════════ */
export default function DiagnosticoEmpresarialPage() {
  const [screen, setScreen] = useState<Screen>("loading");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [scores, setScores] = useState<Scores>({ vis: 0, flujo: 0, crec: 0, total: 0 });
  const [analyzeMsg, setAnalyzeMsg] = useState(analyzeMessages[0]);
  const [analyzePct, setAnalyzePct] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatLang] = useState<ChatLang>("es");
  const [waNumber] = useState("5215564535862");
  const chatRef = useRef<HTMLDivElement>(null);

  /* Load mini-quiz pre-filled answers */
  useEffect(() => {
    const raw = localStorage.getItem("yh_mini_answers");
    if (raw) {
      try {
        const prefill = JSON.parse(raw) as Record<string, number>;
        setAnswers(prefill);
      } catch { /* ignore */ }
    }
    setScreen("quiz");
  }, []);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, isTyping]);

  /* ── QUIZ ── */
  function selectOption(idx: number, value: number) {
    setSelected(idx);
    setAnswers((prev) => ({ ...prev, [allQuestions[step].id]: value }));
  }

  function quizNext() {
    if (step < allQuestions.length - 1) {
      setStep((s) => s + 1);
      setSelected(null);
    } else {
      const s = computeScores(answers);
      setScores(s);
      startAnalyzing(s);
    }
  }

  /* ── ANALYZING ── */
  function startAnalyzing(s: Scores) {
    setScreen("analyzing");
    setAnalyzePct(0);
    let pct = 0;
    let msgIdx = 0;
    const iv = setInterval(() => {
      pct += Math.random() * 18 + 8;
      if (pct > 100) pct = 100;
      setAnalyzePct(pct);
      if (msgIdx < analyzeMessages.length - 1 && pct > (msgIdx + 1) * 20) {
        msgIdx++;
        setAnalyzeMsg(analyzeMessages[msgIdx]);
      }
      if (pct >= 100) {
        clearInterval(iv);
        setTimeout(() => startChat(s), 600);
      }
    }, 300);
  }

  /* ── SYSTEM PROMPT ── */
  function buildSystemPrompt(s: Scores): string {
    const tamano = ["", "negocio unipersonal", "empresa de 2–10 empleados", "empresa de 11–50 empleados", "empresa de 50+ empleados"][answers.q1_size ?? 2];
    const etapa = ["", "en etapa de arranque", "en etapa de estabilización", "en etapa de crecimiento activo", "en etapa de escala"][answers.q2_stage ?? 2];
    const flujoStr = answers.q5_cashflow === 0
      ? "problemas de flujo SEVEROS — vende pero no tiene dinero"
      : answers.q5_cashflow === 1 ? "problemas de flujo frecuentes"
      : answers.q5_cashflow === 2 ? "problemas de flujo ocasionales"
      : "flujo de caja estable";
    const margenStr = (answers.q4_margin ?? 0) >= 3 ? "conoce su margen con claridad" : (answers.q4_margin ?? 0) >= 2 ? "conoce su margen aproximadamente" : "no conoce su margen real";
    const sR = s.crec < 4 ? "🔴" : s.crec < 7 ? "🟡" : "🟢";
    const sL = s.flujo < 4 ? "🔴" : s.flujo < 7 ? "🟡" : "🟢";
    const sV = s.vis < 4 ? "🔴" : s.vis < 7 ? "🟡" : "🟢";

    return `Eres un Consultor Senior del Equipo de Yhopping — firma de Dirección Financiera y Operativa Fraccional para PyMEs mexicanas con facturación de $10M a $100M MXN. Tu tono es analítico, profesional y directo (estilo McKinsey). El cliente completó el Termómetro Financiero PyME. No repitas información que ya fue proporcionada.

Tu objetivo: validar el dolor, aportar micro-valor inmediato que demuestre expertise, y perfilar hacia el cierre. Cuando detectes un problema complejo, responde brevemente y ejecuta un CTA: "Este es un síntoma de falta de estructura operativa que El Equipo de Yhopping resuelve. Para profundizar en tu caso específico, te sugiero agendar el Diagnóstico Empresarial de 90 minutos."

═══ PERFIL DEL CLIENTE ═══
Empresa: ${tamano} ${etapa}
Flujo de caja: ${flujoStr}
Conocimiento de margen: ${margenStr}
Crecimiento vs. utilidades: ${["crece pero NO ve utilidades (alerta crítica)", "crecimiento con utilidades preocupantes", "algo de crecimiento en utilidades", "crecimiento con utilidades claras"][answers.q7_growth ?? 1]}

SEMÁFORO:
${sR} Rentabilidad/Crecimiento: ${s.crec}/10
${sL} Liquidez/Flujo: ${s.flujo}/10
${sV} Visibilidad Financiera: ${s.vis}/10
📊 Score total: ${s.total}/100

═══ METODOLOGÍA McKINSEY ═══
1. CONCLUSIÓN DIRECTA — Di la conclusión primero
2. CAUSA RAÍZ — No el síntoma, el "¿por qué?" real
3. ACCIÓN CONCRETA — 1–2 acciones priorizadas
4. COSTO DE NO ACTUAR — Cuantifica o estima
5. SIGUIENTE PASO con Yhopping — Natural, no vendedor

═══ REGLAS ═══
- Una sola pregunta por mensaje
- Máximo 120 palabras
- Cierra con UNA pregunta que avance hacia sesión
- Si pregunta precio: "El diagnóstico completo parte de $15,000 MXN. Antes de hablar de inversión, ¿me cuentas [pregunta específica]?"

═══ PIPELINE ═══
Diagnóstico Empresarial: $15,000–$35,000 MXN
CFO Fraccional: $20,000–$45,000 MXN/mes
Proyecto específico: $50,000–$200,000 MXN

TONO: Directo como un CFO. Empático como un socio. Nunca como un vendedor.`;
  }

  const callClaude = useCallback(async (systemPrompt: string, userMsg: string, prevMsgs: Message[]): Promise<string> => {
    const allMsgs = [...prevMsgs, { role: "user" as const, content: userMsg }];
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-haiku-4-5", max_tokens: 400, system: systemPrompt, messages: allMsgs }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error?.message ?? "Error");
    return data.content[0].text as string;
  }, []);

  function buildFirstMessage(s: Scores): string {
    const focus = s.flujo < s.vis ? "flujo de efectivo" : "visibilidad financiera";
    return `Acabo de completar el diagnóstico. Mi score fue ${s.total}/100. Mi área más crítica parece ser el ${focus}. ${(answers.q5_cashflow ?? 4) <= 1 ? "Me ha pasado que tengo ventas pero no dinero disponible." : ""} ¿Qué me dices?`;
  }

  function buildFallback(s: Scores): string {
    if (s.total < 45)
      return `Gracias por completar el diagnóstico. Con ${s.total}/100, hay brechas importantes.\n\nLo que más llama la atención es la distancia entre lo que vendes y lo que queda — eso tiene solución con el análisis correcto.\n\n¿Cuándo pagas proveedores o nómina, ya tienes proyectado de dónde saldrá el dinero, o lo vas resolviendo en el momento?`;
    return `Tu diagnóstico de ${s.total}/100 muestra una base razonable, pero hay puntos ciegos que pueden costarte caro.\n\n¿Qué es lo que más te quita el sueño de tus finanzas hoy?`;
  }

  async function startChat(s: Scores) {
    setMessages([]);
    setScreen("chat");
    setIsTyping(true);
    const systemPrompt = buildSystemPrompt(s);
    const firstMsg = buildFirstMessage(s);
    try {
      const reply = await callClaude(systemPrompt, firstMsg, []);
      setMessages([{ role: "user", content: firstMsg }, { role: "assistant", content: reply }]);
    } catch {
      setMessages([{ role: "user", content: firstMsg }, { role: "assistant", content: buildFallback(s) }]);
    } finally {
      setIsTyping(false);
    }
  }

  async function sendMessage() {
    const text = chatInput.trim();
    if (!text || isTyping) return;
    setChatInput("");
    const newMsgs: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMsgs);
    setIsTyping(true);
    try {
      const reply = await callClaude(buildSystemPrompt(scores), text, messages);
      setMessages([...newMsgs, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...newMsgs, { role: "assistant", content: "Lo siento, hubo un problema técnico. ¿Continuamos?" }]);
    } finally {
      setIsTyping(false);
    }
  }

  /* ── SHARED STYLES ── */
  const darkBg = { background: "#1A1D29", minHeight: "100dvh", padding: "24px 20px 48px", display: "flex", flexDirection: "column" as const };
  const card = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "28px 24px" };

  /* ── LOADING ── */
  if (screen === "loading")
    return (
      <div style={{ ...darkBg, alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 40, height: 40, border: "3px solid rgba(28,197,220,0.2)", borderTopColor: "#1CC5DC", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );

  /* ── QUIZ ── */
  if (screen === "quiz") {
    const q = allQuestions[step];
    const pct = ((step) / allQuestions.length) * 100;
    return (
      <div style={darkBg}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
          <Link href="/" style={{ color: "rgba(241,245,249,0.5)", display: "flex", alignItems: "center", gap: 6, fontSize: 14, textDecoration: "none" }}>
            <ArrowLeft size={16} /> Volver
          </Link>
          <Image src="/images/yh-logo-dark.png" alt="Yhopping" width={489} height={120} style={{ height: 28, width: "auto" }} priority />
          <span style={{ fontSize: 12, color: "rgba(241,245,249,0.4)" }}>{step + 1}/{allQuestions.length}</span>
        </div>

        {/* Progress */}
        <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 99, height: 3, marginBottom: 32 }}>
          <div style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg, #0046FF, #1CC5DC)", width: `${pct}%`, transition: "width 0.4s ease" }} />
        </div>

        <div style={{ ...card, flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <span style={{ fontSize: 28 }}>{q.icon}</span>
            <p style={{ color: "#F1F5F9", fontSize: "clamp(15px,2vw,18px)", fontWeight: 600, lineHeight: 1.4, margin: 0 }}>{q.text}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {q.options.map((opt, idx) => {
              const isActive = selected === idx;
              return (
                <button key={idx} onClick={() => selectOption(idx, opt.value)}
                  style={{
                    background: isActive ? "rgba(28,197,220,0.15)" : "rgba(255,255,255,0.04)",
                    border: isActive ? "1.5px solid #1CC5DC" : "1.5px solid rgba(255,255,255,0.08)",
                    borderRadius: 12, padding: "14px 18px",
                    color: isActive ? "#1CC5DC" : "rgba(241,245,249,0.75)",
                    fontSize: 14, fontWeight: isActive ? 600 : 400,
                    textAlign: "left", cursor: "pointer", transition: "all 0.15s ease",
                  }}>
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: 20, display: "flex", gap: 12, justifyContent: "flex-end" }}>
          {step > 0 && (
            <button onClick={() => { setStep(s => s - 1); setSelected(null); }}
              style={{ background: "transparent", border: "1.5px solid rgba(255,255,255,0.12)", borderRadius: 99, padding: "11px 22px", color: "rgba(241,245,249,0.5)", fontSize: 14, cursor: "pointer" }}>
              Atrás
            </button>
          )}
          <button onClick={quizNext} disabled={selected === null}
            style={{
              background: selected !== null ? "#1CC5DC" : "rgba(28,197,220,0.2)",
              color: selected !== null ? "#1A1D29" : "rgba(28,197,220,0.4)",
              border: "none", borderRadius: 99, padding: "12px 28px",
              fontSize: 14, fontWeight: 700, cursor: selected !== null ? "pointer" : "not-allowed",
              transition: "all 0.2s ease",
            }}>
            {step < allQuestions.length - 1 ? "Siguiente →" : "Ver diagnóstico →"}
          </button>
        </div>
      </div>
    );
  }

  /* ── ANALYZING ── */
  if (screen === "analyzing")
    return (
      <div style={{ ...darkBg, alignItems: "center", justifyContent: "center", gap: 24 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🧠</div>
          <p style={{ color: "#F1F5F9", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Analizando tu empresa</p>
          <p style={{ color: "rgba(241,245,249,0.5)", fontSize: 14 }}>{analyzeMsg}</p>
        </div>
        <div style={{ width: "min(320px, 80vw)", background: "rgba(255,255,255,0.08)", borderRadius: 99, height: 6 }}>
          <div style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg, #0046FF, #1CC5DC)", width: `${analyzePct}%`, transition: "width 0.3s ease" }} />
        </div>
        <p style={{ color: "rgba(241,245,249,0.35)", fontSize: 13 }}>{Math.round(analyzePct)}%</p>
      </div>
    );

  /* ── CHAT ── */
  if (screen === "chat") {
    const { label: sLabel, color: sColor } = scoreLabel(scores.total);
    return (
      <div style={{ ...darkBg, padding: 0 }}>
        {/* Header */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setScreen("results")} style={{ background: "transparent", border: "none", color: "rgba(241,245,249,0.5)", cursor: "pointer", display: "flex", padding: 4 }}>
            <ArrowLeft size={18} />
          </button>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#0046FF,#1CC5DC)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🤖</div>
          <div>
            <p style={{ color: "#F1F5F9", fontWeight: 600, fontSize: 14, margin: 0 }}>Consultor Yhopping</p>
            <p style={{ color: "#1CC5DC", fontSize: 12, margin: 0 }}>Score: {scores.total}/100 · {sLabel}</p>
          </div>
          <button onClick={() => setScreen("results")} style={{ marginLeft: "auto", background: "rgba(28,197,220,0.1)", border: "1px solid rgba(28,197,220,0.25)", borderRadius: 99, padding: "6px 14px", color: "#1CC5DC", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            Ver resultados
          </button>
        </div>

        {/* Messages */}
        <div ref={chatRef} style={{ flex: 1, overflowY: "auto", padding: "20px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
              <div style={{
                maxWidth: "80%", padding: "12px 16px", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                background: m.role === "user" ? "#1CC5DC" : "rgba(255,255,255,0.07)",
                color: m.role === "user" ? "#1A1D29" : "#F1F5F9",
                fontSize: 14, lineHeight: 1.6,
                whiteSpace: "pre-wrap",
              }}>
                {m.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div style={{ display: "flex", gap: 4, padding: "12px 16px", background: "rgba(255,255,255,0.07)", borderRadius: "18px 18px 18px 4px", width: "fit-content" }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{ width: 6, height: 6, background: "#1CC5DC", borderRadius: "50%", animation: `bounce 1s ease infinite ${i * 0.15}s` }} />
              ))}
              <style>{`@keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-6px)} }`}</style>
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 10, alignItems: "flex-end" }}>
          <textarea
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder="Escribe tu pregunta…"
            rows={1}
            style={{
              flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 14, padding: "12px 14px", color: "#F1F5F9", fontSize: 14,
              resize: "none", outline: "none", fontFamily: "inherit",
            }}
          />
          <button onClick={sendMessage} disabled={!chatInput.trim() || isTyping}
            style={{
              background: chatInput.trim() && !isTyping ? "#1CC5DC" : "rgba(28,197,220,0.2)",
              color: chatInput.trim() && !isTyping ? "#1A1D29" : "rgba(28,197,220,0.4)",
              border: "none", borderRadius: 12, padding: "12px 18px",
              fontSize: 14, fontWeight: 700, cursor: chatInput.trim() && !isTyping ? "pointer" : "not-allowed",
              transition: "all 0.2s", flexShrink: 0,
            }}>
            Enviar
          </button>
        </div>
      </div>
    );
  }

  /* ── RESULTS ── */
  const { label: rLabel, color: rColor } = scoreLabel(scores.total);
  const circumference = 477.52;
  const scoreOffset = circumference - (circumference * scores.total) / 100;

  return (
    <div style={darkBg}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <Link href="/" style={{ color: "rgba(241,245,249,0.5)", display: "flex", alignItems: "center", gap: 6, fontSize: 14, textDecoration: "none" }}>
          <ArrowLeft size={16} /> Inicio
        </Link>
        <Image src="/images/yh-logo-dark.png" alt="Yhopping" width={489} height={120} style={{ height: 28, width: "auto" }} />
        <span />
      </div>

      {/* Score circle */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <svg width="160" height="160" viewBox="0 0 160 160" style={{ margin: "0 auto", display: "block" }}>
          <circle cx="80" cy="80" r="76" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          <circle cx="80" cy="80" r="76" fill="none" stroke={rColor} strokeWidth="8"
            strokeDasharray={circumference} strokeDashoffset={scoreOffset}
            strokeLinecap="round" transform="rotate(-90 80 80)"
            style={{ transition: "stroke-dashoffset 1.2s ease" }} />
          <text x="80" y="74" textAnchor="middle" fill="#F1F5F9" fontSize="32" fontWeight="900">{scores.total}</text>
          <text x="80" y="96" textAnchor="middle" fill="rgba(241,245,249,0.5)" fontSize="13">/100</text>
        </svg>
        <p style={{ color: rColor, fontWeight: 700, fontSize: 16, margin: "12px 0 4px" }}>{rLabel}</p>
      </div>

      {/* Metrics */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
        {[
          { label: "Visibilidad Financiera", val: scores.vis },
          { label: "Control de Flujo", val: scores.flujo },
          { label: "Estructura de Crecimiento", val: scores.crec },
        ].map((m, i) => (
          <div key={i} style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "rgba(241,245,249,0.7)", fontSize: 13 }}>{m.label}</span>
              <span style={{ color: "#F1F5F9", fontWeight: 700, fontSize: 13 }}>{m.val}/10</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 99, height: 4 }}>
              <div style={{ height: "100%", borderRadius: 99, background: m.val < 4 ? "#ef4444" : m.val < 7 ? "#f59e0b" : "#1CC5DC", width: `${(m.val / 10) * 100}%`, transition: "width 1s ease" }} />
            </div>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {/* P1 — Calendly */}
        <button
          onClick={() => { window.open("https://calendly.com/yhopping", "_blank"); }}
          style={{ width: "100%", background: "#1CC5DC", color: "#1A1D29", border: "none", borderRadius: 14, padding: "16px", fontSize: 15, fontWeight: 800, cursor: "pointer", letterSpacing: "-0.01em" }}>
          📅 Solicitar Diagnóstico de 90 min
        </button>
        {/* P2 — Chat IA */}
        <button
          onClick={() => setScreen("chat")}
          style={{ width: "100%", background: "rgba(255,255,255,0.05)", color: "#F1F5F9", border: "1.5px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: "14px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
          💬 Hablar con el Consultor Virtual
        </button>
        {/* P3 — WhatsApp */}
        <a
          href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hola, acabo de completar el diagnóstico financiero. Mi score fue ${scores.total}/100. Me gustaría agendar una sesión.`)}`}
          target="_blank" rel="noopener noreferrer"
          style={{ width: "100%", background: "rgba(37,211,102,0.1)", color: "#25D366", border: "1.5px solid rgba(37,211,102,0.2)", borderRadius: 14, padding: "14px", fontSize: 14, fontWeight: 600, cursor: "pointer", textDecoration: "none", display: "block", textAlign: "center" }}>
          💬 Contactar por WhatsApp
        </a>
      </div>
    </div>
  );
}
