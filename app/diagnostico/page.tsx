"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, X, Settings } from "lucide-react";
import Image from "next/image";

/* ─── TYPES ─── */
type Screen = "landing" | "lang" | "quiz" | "analyzing" | "chat" | "results" | "quote" | "config";
type ChatLang = "es" | "en";

interface Scores {
  vis: number;
  flujo: number;
  crec: number;
  total: number;
}

interface Config {
  apiKey: string;
  waNumber: string;
  calendlyLink: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

/* ─── QUIZ DATA ─── */
const questions = [
  {
    id: "q1_size",
    text: "¿Cuántas personas trabajan en tu empresa (incluyéndote)?",
    icon: "👥",
    options: [
      { label: "Solo yo (1 persona)", value: 1 },
      { label: "2 a 10 personas", value: 2 },
      { label: "11 a 50 personas", value: 3 },
      { label: "Más de 50 personas", value: 4 },
    ],
  },
  {
    id: "q2_stage",
    text: "¿En qué etapa está tu negocio ahora mismo?",
    icon: "🚀",
    options: [
      { label: "Arrancando / menos de 1 año", value: 1 },
      { label: "Estabilizando (1–3 años)", value: 2 },
      { label: "Creciendo activamente", value: 3 },
      { label: "Buscando escalar o expandirme", value: 4 },
    ],
  },
  {
    id: "q3_statements",
    text: "¿Tienes estados financieros actualizados del mes anterior?",
    icon: "📊",
    options: [
      { label: "Sí, al día y los reviso regularmente", value: 4 },
      { label: "Los tengo pero no los reviso mucho", value: 2 },
      { label: "Están desactualizados", value: 1 },
      { label: "No sé qué son o no los tengo", value: 0 },
    ],
  },
  {
    id: "q4_margin",
    text: "¿Sabes exactamente cuál es tu margen de utilidad real?",
    icon: "💹",
    options: [
      { label: "Sí, lo calculo mensualmente", value: 4 },
      { label: "Tengo una idea aproximada", value: 2 },
      { label: "No realmente, lo calculo a ojo", value: 1 },
      { label: "No lo sé", value: 0 },
    ],
  },
  {
    id: "q5_cashflow",
    text: "¿Has tenido problemas para pagar a proveedores o nómina aunque tenías ventas?",
    icon: "💸",
    options: [
      { label: "Nunca, mi flujo es estable", value: 4 },
      { label: "Ocasionalmente, pero lo resuelvo", value: 2 },
      { label: "Sí, me pasa con frecuencia", value: 1 },
      { label: "Es mi mayor problema ahora mismo", value: 0 },
    ],
  },
  {
    id: "q6_accountant",
    text: "¿Qué hace tu contador por ti actualmente?",
    icon: "🧾",
    options: [
      { label: "Me da análisis estratégico + declaraciones", value: 4 },
      { label: "Solo declaraciones fiscales", value: 1 },
      { label: "No tengo contador formal", value: 0 },
      { label: "Llevo yo mismo mis cuentas", value: 1 },
    ],
  },
  {
    id: "q7_growth",
    text: "¿Estás creciendo en ventas pero sin saber cuándo verás utilidades reales?",
    icon: "📈",
    options: [
      { label: "No, veo mis utilidades claramente", value: 4 },
      { label: "A veces me cuesta entenderlo", value: 2 },
      { label: "Sí, me preocupa este punto", value: 1 },
      { label: "Es exactamente mi situación hoy", value: 0 },
    ],
  },
  {
    id: "q8_social",
    text: "¿Tu empresa tiene algún componente social, altruista o de impacto?",
    icon: "🌱",
    options: [
      { label: "No, es un negocio con fin de lucro", value: 0 },
      { label: "Tiene un componente social parcial", value: 1 },
      { label: "Es principalmente un proyecto de impacto social", value: 2 },
      { label: "Es ONG o proyecto 100% altruista", value: 3 },
    ],
  },
];

/* ─── SCORING ─── */
function computeScores(answers: Record<string, number>): Scores {
  const rawVis =
    (answers.q3_statements ?? 0) + (answers.q4_margin ?? 0) + (answers.q6_accountant ?? 0);
  const vis = Math.round((rawVis / 12) * 10 * 10) / 10;

  const rawFlujo = (answers.q5_cashflow ?? 0) + (answers.q7_growth ?? 0);
  const flujo = Math.round((rawFlujo / 8) * 10 * 10) / 10;

  const rawCrec = (answers.q1_size ?? 0) + (answers.q2_stage ?? 0);
  const crec = Math.round((rawCrec / 8) * 10 * 10) / 10;

  const total = Math.round(vis * 0.4 * 10 + flujo * 0.4 * 10 + crec * 0.2 * 10);
  return { vis, flujo, crec, total };
}

function buildDiagnosis(scores: Scores, answers: Record<string, number>): string {
  const texts: string[] = [];

  if (scores.vis < 5)
    texts.push(
      "Tu visibilidad financiera es limitada — tomás decisiones con información incompleta o desactualizada."
    );
  else if (scores.vis < 7.5)
    texts.push(
      "Tienes cierta visibilidad financiera pero aún hay puntos ciegos importantes que impiden decisiones óptimas."
    );
  else texts.push("Tu visibilidad financiera es sólida, buen punto de partida para optimizar.");

  if (scores.flujo < 5)
    texts.push(
      "El flujo de efectivo es tu área más crítica: vendes pero el dinero no está donde lo necesitas cuando lo necesitas."
    );
  else if (scores.flujo < 7.5)
    texts.push(
      "Tu flujo tiene inconsistencias que generan estrés financiero innecesario y frenan decisiones de inversión."
    );
  else texts.push("Tu control de flujo es relativamente bueno, aunque siempre hay margen de mejora.");

  if ((answers.q6_accountant ?? 0) <= 1)
    texts.push(
      "Tu contador actual solo registra el pasado — no hay nadie analizando el presente y proyectando el futuro de tu empresa."
    );

  return texts.join(" ");
}

/* ─── SHARE TEXT ─── */
function buildShareText(scores: Scores): string {
  const label =
    scores.total < 35
      ? "🔴 Zona de riesgo financiero"
      : scores.total < 55
      ? "🟡 Finanzas en proceso de orden"
      : scores.total < 75
      ? "🔵 Base financiera en construcción"
      : "🟢 Finanzas con estructura sólida";

  return `Acabo de hacer el Diagnóstico Financiero de Yhopping y obtuve ${scores.total}/100 — ${label}.

📊 Visibilidad financiera: ${scores.vis}/10
💸 Control de flujo: ${scores.flujo}/10
📈 Estructura de crecimiento: ${scores.crec}/10

¿Cuál es la salud financiera real de tu PyME? 👇
yhopping.com/diagnostico

#PyMEs #Finanzas #CFO #Yhopping`;
}

/* ─── SCORE LABEL ─── */
function scoreLabel(total: number): { label: string; sublabel: string; color: string } {
  if (total < 35)
    return {
      label: "Zona de riesgo financiero",
      sublabel: "Atención urgente en flujo y visibilidad",
      color: "#ef4444",
    };
  if (total < 55)
    return {
      label: "Finanzas en proceso de orden",
      sublabel: "Hay oportunidades claras de mejora",
      color: "#f59e0b",
    };
  if (total < 75)
    return {
      label: "Base financiera en construcción",
      sublabel: "Buen inicio, con áreas importantes que fortalecer",
      color: "#1CC5DC",
    };
  return {
    label: "Finanzas con estructura sólida",
    sublabel: "Listo para optimizar y escalar",
    color: "#27AE60",
  };
}

/* ─── ANALYZE MESSAGES ─── */
const analyzeMessages = [
  "Analizando visibilidad financiera…",
  "Evaluando control de flujo de efectivo…",
  "Calculando estructura de crecimiento…",
  "Generando diagnóstico personalizado con IA…",
  "¡Listo! Preparando tu resultado…",
];

/* ════════════════════════════════
   MAIN COMPONENT
════════════════════════════════ */
export default function DiagnosticoPage() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [scores, setScores] = useState<Scores>({ vis: 0, flujo: 0, crec: 0, total: 0 });
  const [diagnosisText, setDiagnosisText] = useState("");
  const [analyzeMsg, setAnalyzeMsg] = useState(analyzeMessages[0]);
  const [analyzePct, setAnalyzePct] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatLang, setChatLang] = useState<ChatLang>("es");
  const [config, setConfig] = useState<Config>({ apiKey: "", waNumber: "5215564535862", calendlyLink: "" });
  const [cfgForm, setCfgForm] = useState<Config>({ apiKey: "", waNumber: "", calendlyLink: "" });
  const [cfgTaps, setCfgTaps] = useState(0);
  const [cfgSaved, setCfgSaved] = useState(false);
  const isAltruistic = (answers.q8_social ?? 0) >= 2;
  const chatRef = useRef<HTMLDivElement>(null);
  const cfgTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Load config */
  useEffect(() => {
    const apiKey = localStorage.getItem("yh_api_key") ?? "";
    const waNumber = localStorage.getItem("yh_wa") ?? "5215564535862";
    const calendlyLink = localStorage.getItem("yh_calendly") ?? "";
    setConfig({ apiKey, waNumber, calendlyLink });
    setCfgForm({ apiKey, waNumber, calendlyLink });
  }, []);

  /* Scroll chat */
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, isTyping]);

  /* ── QUIZ ── */
  function selectOption(idx: number, value: number) {
    setSelected(idx);
    setAnswers((prev) => ({ ...prev, [questions[step].id]: value }));
  }

  function quizNext() {
    if (step < questions.length - 1) {
      setStep((s) => s + 1);
      setSelected(null);
    } else {
      const s = computeScores(answers);
      setScores(s);
      setDiagnosisText(buildDiagnosis(s, answers));
      startAnalyzing(s);
    }
  }

  function quizBack() {
    if (step > 0) {
      setStep((s) => s - 1);
      setSelected(null);
    } else {
      setScreen("landing");
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

  /* ── CHAT ── */
  function buildSystemPrompt(s: Scores, lang: ChatLang = "es"): string {
    const isEN = lang === "en";
    const tamano = isEN
      ? ["", "sole proprietorship", "2–10 employee company", "11–50 employee company", "50+ employee company"][answers.q1_size ?? 1]
      : ["", "negocio unipersonal", "empresa de 2-10 empleados", "empresa de 11-50 empleados", "empresa de 50+ empleados"][answers.q1_size ?? 1];
    const etapa = isEN
      ? ["", "in startup stage", "in stabilization stage", "in active growth stage", "in scaling stage"][answers.q2_stage ?? 1]
      : ["", "en etapa de arranque", "en etapa de estabilización", "en etapa de crecimiento", "en etapa de escala"][answers.q2_stage ?? 1];
    const estadosFinancieros = isEN
      ? ((answers.q3_statements ?? 0) >= 3 ? "up-to-date financial statements" : (answers.q3_statements ?? 0) >= 2 ? "partial or outdated statements" : "no formal financial statements")
      : ((answers.q3_statements ?? 0) >= 3 ? "estados financieros al día" : (answers.q3_statements ?? 0) >= 2 ? "estados financieros parciales o atrasados" : "sin estados financieros formales");
    const margen = isEN
      ? ((answers.q4_margin ?? 0) >= 3 ? "knows margin clearly" : (answers.q4_margin ?? 0) >= 2 ? "knows approximate margin" : "does not know real margin")
      : ((answers.q4_margin ?? 0) >= 3 ? "conoce su margen con claridad" : (answers.q4_margin ?? 0) >= 2 ? "conoce su margen aproximadamente" : "no conoce su margen real");
    const flujo = isEN
      ? (answers.q5_cashflow === 0 ? "SEVERE cash flow problems (sells but has no money)" : answers.q5_cashflow === 1 ? "frequent cash flow problems" : answers.q5_cashflow === 2 ? "occasional cash flow problems" : "stable cash flow")
      : (answers.q5_cashflow === 0 ? "problemas de flujo SEVEROS (vende pero no tiene dinero)" : answers.q5_cashflow === 1 ? "problemas de flujo frecuentes" : answers.q5_cashflow === 2 ? "problemas de flujo ocasionales" : "flujo de caja estable");
    const contador = isEN
      ? ((answers.q6_accountant ?? 0) >= 3 ? "accountant/CFO with strategic role" : (answers.q6_accountant ?? 0) >= 1 ? "accountant for tax filing only" : "no accountant")
      : ((answers.q6_accountant ?? 0) >= 3 ? "contador/CFO con rol estratégico" : (answers.q6_accountant ?? 0) >= 1 ? "contador solo para temas fiscales" : "sin contador");
    const crecimiento = isEN
      ? (answers.q7_growth === 0 ? "growing but NOT seeing profits (critical warning)" : answers.q7_growth === 1 ? "growth with concerning profits" : answers.q7_growth === 2 ? "some visible growth in profits" : "growth with clear profits")
      : (answers.q7_growth === 0 ? "crece pero NO ve utilidades (señal de alerta crítica)" : answers.q7_growth === 1 ? "crecimiento con utilidades preocupantes" : answers.q7_growth === 2 ? "algo de crecimiento visible en utilidades" : "crecimiento con utilidades claras");

    const semaforoRentabilidad = s.crec < 4 ? "🔴" : s.crec < 7 ? "🟡" : "🟢";
    const semaforoLiquidez = s.flujo < 4 ? "🔴" : s.flujo < 7 ? "🟡" : "🟢";
    const semaforoVisibilidad = s.vis < 4 ? "🔴" : s.vis < 7 ? "🟡" : "🟢";

    return isEN ? `You are Daniela Reyes, Senior Virtual CFO at Yhopping — a C-Level consulting firm for Mexican SMBs. Your expertise: structured financial diagnostics, cash flow, financial visibility, and operational transformation using consulting firm methodology (not accounting firm).

RESPOND ENTIRELY IN ENGLISH throughout this conversation.

═══ BUSINESS PROFILE (from diagnostic) ═══
Company: ${tamano} ${etapa}
Financial statements: ${estadosFinancieros}
Margin: ${margen}
Cash flow: ${flujo}
Financial support: ${contador}
Profits: ${crecimiento}
${isAltruistic ? "⭐ NOTE: Indicated social/altruistic purpose — evaluate special support." : ""}

INITIAL FINANCIAL SCORECARD:
${semaforoRentabilidad} Profitability/Growth: ${s.crec}/10
${semaforoLiquidez} Liquidity/Cash Flow: ${s.flujo}/10
${semaforoVisibilidad} Financial Visibility: ${s.vis}/10
📊 Total score: ${s.total}/100

═══ RESPONSE METHODOLOGY ═══
Apply McKinsey structure (adapted, concise):
1. DIRECT CONCLUSION — Lead with the answer, not the preamble
2. ROOT CAUSE ANALYSIS — Not the symptom, but the real "why" (use 5 Whys mentally)
3. CONCRETE ACTION — 1-2 specific actions, prioritized by impact
4. COST OF INACTION — Quantify or estimate the cost of staying the same
5. NEXT STEP with Yhopping — Natural, not salesy

═══ CONVERSATION RULES ═══
- Ask ONE question per message (never list 3 questions)
- Dig into root cause: if they say "no cash", ask "when do you collect vs when do you pay?"
- Use diagnostic data to personalize, never generic
- If they mention "I already have an accountant": "An accountant manages the fiscal past. A CFO designs the financial future. Complementary roles, not the same."
- If they ask about price: "A full diagnostic starts at $15,000 MXN. Before discussing investment, can you tell me [specific question]?"
- If altruistic: "Yhopping evaluates special support for social impact projects. Tell me more."
- Maximum 120 words per response
- Close each response with ONE question that deepens or moves toward a session

═══ YHOPPING COMMERCIAL PIPELINE ═══
Business Diagnostic: $15,000–$35,000 MXN (5-10 business days)
Fractional CFO: $20,000–$45,000 MXN/month
Specific project: $50,000–$200,000 MXN
→ Goal of this conversation: generate genuine interest in the free diagnostic session (30 min with The Yhopping Team)

═══ YHOPPING DIFFERENTIATORS (use naturally) ═══
• 20+ years of real C-Level experience (CFO/COO at $500M+ MXN companies)
• Not just diagnostic — accompaniment until results
• O365 automation included where applicable
• Consulting firm methodology, not accounting office

TONE: Direct as a CFO. Empathetic as a partner. Never like a salesperson. No unnecessary jargon. Use line breaks for readability.`
    : `Eres Daniela Reyes, CFO Virtual Senior de Yhopping — firma de consultoría C-Level para PyMEs mexicanas. Tu expertise: diagnóstico financiero estructurado, flujo de caja, visibilidad financiera, y transformación operativa con metodología de firma de consultoría (no de contador).

═══ PERFIL DEL EMPRESARIO (del diagnóstico) ═══
Empresa: ${tamano} ${etapa}
Estados financieros: ${estadosFinancieros}
Margen: ${margen}
Flujo de caja: ${flujo}
Soporte financiero: ${contador}
Utilidades: ${crecimiento}
${isAltruistic ? "⭐ NOTA: Ha indicado propósito social/altruista — evaluar apoyo especial." : ""}

SEMÁFORO FINANCIERO INICIAL:
${semaforoRentabilidad} Rentabilidad/Crecimiento: ${s.crec}/10
${semaforoLiquidez} Liquidez/Flujo: ${s.flujo}/10
${semaforoVisibilidad} Visibilidad Financiera: ${s.vis}/10
📊 Score total: ${s.total}/100

═══ TU METODOLOGÍA DE RESPUESTA ═══
Aplica siempre esta estructura McKinsey (adaptada, concisa):
1. CONCLUSIÓN DIRECTA — Di la conclusión primero, no al final
2. ANÁLISIS DE CAUSA RAÍZ — No el síntoma, sino el "¿por qué?" real (usa 5 Porqués mentalmente)
3. ACCIÓN CONCRETA — 1-2 acciones específicas, priorizadas por impacto
4. COSTO DE NO ACTUAR — Cuantifica o estima el costo de seguir igual
5. SIGUIENTE PASO con Yhopping — Natural, no vendedor

═══ REGLAS DE CONVERSACIÓN ═══
- Haz UNA sola pregunta por mensaje (no listes 3 preguntas juntas)
- Profundiza en la causa raíz: si dice "no tengo dinero", pregunta "¿cuándo cobras vs cuándo pagas?"
- Usa datos del diagnóstico para personalizar, nunca genérico
- Si menciona "ya tengo contador": "Un contador cuida el pasado fiscal. Un CFO diseña el futuro financiero. Son roles complementarios, no el mismo."
- Si pregunta precio: "El diagnóstico completo parte de $15,000 MXN. Antes de hablar de inversión, ¿me cuentas [pregunta específica]?"
- Si es altruista: "Yhopping evalúa apoyos especiales para proyectos con impacto social. Cuéntame más."
- Máximo 120 palabras por respuesta
- Cierra cada respuesta con UNA pregunta que profundice o avance hacia sesión

═══ PIPELINE COMERCIAL YHOPPING ═══
Diagnóstico Empresarial: $15,000–$35,000 MXN (5-10 días hábiles)
CFO Fraccional: $20,000–$45,000 MXN/mes
Proyecto específico: $50,000–$200,000 MXN
→ Objetivo de esta conversación: generar interés genuino en la sesión de diagnóstico gratuita (30 min con El Equipo de Yhopping)

═══ DIFERENCIADORES YHOPPING (úsalos naturalmente) ═══
• 20+ años de experiencia C-Level real (CFO/COO en empresas $500M+ MXN)
• No solo diagnóstico — acompañamiento hasta el resultado
• Automatización O365 incluida donde aplica
• Metodología de firma de consultoría, no de despacho contable

TONO: Directo como un CFO. Empático como un socio. Nunca como un vendedor. Sin tecnicismos innecesarios. Usa saltos de línea para legibilidad.`;
  }

  function buildFirstMessage(s: Scores, lang: ChatLang = chatLang): string {
    if (lang === "en") {
      const focus = s.flujo < s.vis ? "cash flow" : "financial visibility";
      return `I just completed the diagnostic. My score was ${s.total}/100. My most critical area seems to be ${focus}. ${(answers.q5_cashflow ?? 4) <= 1 ? "I've had situations where I have sales but no available cash." : ""} What can you tell me?`;
    }
    const focus = s.flujo < s.vis ? "flujo de efectivo" : "visibilidad financiera";
    return `Acabo de completar el diagnóstico. Mi score fue ${s.total}/100. Mi área más crítica parece ser el ${focus}. ${(answers.q5_cashflow ?? 4) <= 1 ? "Me ha pasado que tengo ventas pero no dinero disponible." : ""} ¿Qué me dices?`;
  }

  function buildFallbackGreeting(s: Scores): string {
    if (s.total < 45)
      return `Gracias por completar el diagnóstico. Con un score de ${s.total}/100, hay oportunidades importantes que trabajar juntos.\n\nLo que más me llama la atención es la brecha entre lo que vendes y lo que queda en tu bolsillo — eso casi siempre tiene solución con el análisis correcto.\n\n¿Cuándo pagas proveedores o nómina, ya tienes proyectado de dónde saldrá el dinero, o lo vas resolviendo en el momento?`;
    if (s.total < 70)
      return `Gracias por tu diagnóstico. Con ${s.total}/100 tienes una base razonable, pero hay puntos ciegos que pueden costarte caro.\n\nCon claridad financiera adecuada, empresas como la tuya suelen encontrar eficiencias que no sabían que tenían.\n\n¿Qué es lo que más te quita el sueño de tus finanzas hoy?`;
    return `Tu diagnóstico de ${s.total}/100 muestra que tienes buenas bases. Pero las empresas que más crecen son las que pasan de "funcionar bien" a tener una estrategia financiera activa.\n\n¿Tienes ya un CFO o alguien que analice tus números estratégicamente, o solo declaraciones fiscales?`;
  }

  const callClaude = useCallback(
    async (systemPrompt: string, userMsg: string, prevMsgs: Message[]): Promise<string> => {
      const apiKey = config.apiKey || localStorage.getItem("yh_api_key") || "";
      const allMsgs = [...prevMsgs, { role: "user" as const, content: userMsg }];

      // Always use the server-side proxy — the API key is in Vercel env vars
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _apiKey: apiKey, // server will prefer ANTHROPIC_API_KEY env var
          model: "claude-haiku-4-5",
          max_tokens: 400,
          system: systemPrompt,
          messages: allMsgs,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        const errMsg = `HTTP ${res.status} | type: ${data?.error?.type} | ${data?.error?.message || JSON.stringify(data)}`;
        console.error("[callClaude] API error:", errMsg);
        throw new Error(errMsg);
      }
      return data.content[0].text as string;
    },
    [config.apiKey]
  );

  async function startChat(s: Scores, lang: ChatLang = chatLang) {
    setMessages([]);
    setScreen("chat");
    setIsTyping(true);

    const systemPrompt = buildSystemPrompt(s, lang);
    const firstMsg = buildFirstMessage(s, lang);

    try {
      const reply = await callClaude(systemPrompt, firstMsg, []);
      setMessages([
        { role: "user", content: firstMsg },
        { role: "assistant", content: reply },
      ]);
    } catch {
      setMessages([
        { role: "user", content: firstMsg },
        { role: "assistant", content: buildFallbackGreeting(s) },
      ]);
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
      const systemPrompt = buildSystemPrompt(scores, chatLang);
      const reply = await callClaude(systemPrompt, text, messages);
      setMessages([...newMsgs, { role: "assistant", content: reply }]);
    } catch (err) {
      const errDetail = err instanceof Error ? err.message : String(err);
      setMessages([
        ...newMsgs,
        {
          role: "assistant",
          content: `Error técnico: ${errDetail}. Por favor intenta de nuevo.`,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  /* ── CONFIG ── */
  function configTap() {
    setCfgTaps((t) => {
      const next = t + 1;
      if (cfgTimer.current) clearTimeout(cfgTimer.current);
      cfgTimer.current = setTimeout(() => setCfgTaps(0), 2000);
      if (next >= 3) {
        setCfgForm({ ...config });
        setScreen("config");
        return 0;
      }
      return next;
    });
  }

  function saveConfig() {
    setConfig({ ...cfgForm });
    localStorage.setItem("yh_api_key", cfgForm.apiKey);
    localStorage.setItem("yh_wa", cfgForm.waNumber);
    localStorage.setItem("yh_calendly", cfgForm.calendlyLink);
    setCfgSaved(true);
    setTimeout(() => setCfgSaved(false), 2500);
  }

  /* ── ACTIONS ── */
  function scheduleCall() {
    const link = config.calendlyLink || "https://calendly.com/yhopping";
    window.open(link, "_blank");
  }

  function sendWhatsApp() {
    const wa = config.waNumber || "5215564535862";
    const text = encodeURIComponent(
      `Hola Yhopping, completé el diagnóstico y obtuve ${scores.total}/100. Me gustaría agendar una sesión gratuita.`
    );
    window.open(`https://wa.me/${wa}?text=${text}`, "_blank");
  }

  function shareResult() {
    const text = buildShareText(scores);
    if (navigator.share) {
      navigator.share({ text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => alert("Texto copiado al portapapeles"));
    }
  }

  /* ── QUOTE PACKAGES ── */
  const packages = [
    {
      tag: "🆓 Incluido",
      tagColor: "#27AE60",
      name: "Sesión de Diagnóstico",
      hours: "1 hora",
      price: "SIN COSTO",
      items: [
        "Análisis de tu diagnóstico IA",
        "Identificación de puntos críticos",
        "Hoja de ruta preliminar",
        "Sin compromiso de continuidad",
      ],
    },
    ...(scores.flujo < 6
      ? [
          {
            tag: scores.flujo < 3 ? "🔴 Urgente" : "🟡 Recomendado",
            tagColor: scores.flujo < 3 ? "#ef4444" : "#f59e0b",
            name: "Análisis de Flujo de Efectivo",
            hours: scores.flujo < 3 ? "16–24 horas" : "10–16 horas",
            price: scores.flujo < 3 ? "$8,000–$12,000 MXN" : "$5,000–$8,000 MXN",
            items: [
              "Diagnóstico completo de cash flow",
              "Proyección a 3 y 6 meses",
              "Plan de mejora implementable",
              "Acompañamiento en los primeros pasos",
            ],
          },
        ]
      : []),
    ...(scores.vis < 6 && (answers.q3_statements ?? 4) <= 1
      ? [
          {
            tag: "📊 Alta prioridad",
            tagColor: "#f59e0b",
            name: "Diagnóstico Financiero",
            hours: "8–14 horas",
            price: "$4,000–$7,000 MXN",
            items: [
              "Estados financieros en orden",
              "Cálculo de márgenes reales",
              "Identificación de fugas de dinero",
              "Indicadores clave (KPIs)",
            ],
          },
        ]
      : []),
    ...((answers.q2_stage ?? 0) >= 3
      ? [
          {
            tag: "⚙️ Para escalar",
            tagColor: "#8b5cf6",
            name: "Diseño de Procesos",
            hours: "12–20 horas",
            price: "$6,000–$10,000 MXN",
            items: [
              "Mapeo de procesos actuales",
              "Diseño del proceso optimizado",
              "Implementación guiada",
              "Documentación y capacitación",
            ],
          },
        ]
      : []),
  ];

  const { label: sLabel, sublabel: sSublabel, color: sColor } = scoreLabel(scores.total);
  const circumference = 477.52;
  const scoreOffset = circumference - (circumference * scores.total) / 100;

  /* ════ RENDER ════ */

  /* ── LANDING ── */
  if (screen === "landing")
    return (
      <Shell>
        <div
          style={{
            background:
              "linear-gradient(145deg,#0a1628 0%,#0f2040 40%,#0d2d4a 70%,#0a1628 100%)",
            minHeight: "100dvh",
            padding: "32px 24px 48px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Image
              src="/images/yh-logo-dark.png"
              alt="Yhopping"
              width={520}
              height={120}
              style={{ height: 36, width: "auto" }}
              priority
            />
            <button onClick={configTap} style={{ background: "transparent", border: "none", color: "#334155", fontSize: 18, cursor: "pointer", padding: 8 }}>
              ⚙️
            </button>
          </div>

          {/* Hero */}
          <div style={{ marginTop: 48, marginBottom: 32 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(6,182,212,.1)", border: "1px solid rgba(6,182,212,.25)", borderRadius: 99, padding: "6px 14px", marginBottom: 20 }}>
              <span style={{ width: 7, height: 7, background: "#06b6d4", borderRadius: "50%", display: "inline-block" }} />
              <span style={{ color: "#06b6d4", fontSize: 12, fontWeight: 600, letterSpacing: ".05em" }}>DIAGNÓSTICO GRATUITO · IA REAL</span>
            </div>
            <h1 style={{ color: "#f1f5f9", fontSize: 30, fontWeight: 900, lineHeight: 1.2, margin: "0 0 16px" }}>
              ¿Tu negocio vende bien<br />pero el dinero{" "}
              <span style={{ background: "linear-gradient(135deg,#06b6d4,#3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                nunca alcanza?
              </span>
            </h1>
            <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
              Descubre en <strong style={{ color: "#e2e8f0" }}>3 minutos</strong> qué le pasa realmente a las finanzas de tu empresa — con análisis de IA y diagnóstico personalizado.
            </p>
          </div>

          {/* Proof points */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
            {[
              "Sin registro · 100% gratis · 3 minutos",
              "Tu primera consulta con Yhopping es gratis",
              "Resultado compartible · Genera conversación real",
            ].map((txt) => (
              <div key={txt} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 22, height: 22, background: "rgba(16,185,129,.15)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <span style={{ color: "#94a3b8", fontSize: 14 }}>{txt}</span>
              </div>
            ))}
          </div>

          {/* Pain chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
            {[
              { text: '"Vendo pero no tengo dinero"', bg: "rgba(239,68,68,.08)", border: "rgba(239,68,68,.2)", color: "#fca5a5" },
              { text: '"No sé si mis números son correctos"', bg: "rgba(245,158,11,.08)", border: "rgba(245,158,11,.2)", color: "#fcd34d" },
              { text: '"Crezco pero no veo utilidades"', bg: "rgba(6,182,212,.08)", border: "rgba(6,182,212,.2)", color: "#67e8f9" },
            ].map(({ text, bg, border, color }) => (
              <span key={text} style={{ background: bg, border: `1px solid ${border}`, color, borderRadius: 99, padding: "6px 12px", fontSize: 12, fontWeight: 500 }}>
                {text}
              </span>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => setScreen("lang")}
            style={{ background: "linear-gradient(135deg,#1d4ed8,#06b6d4)", color: "#fff", border: "none", borderRadius: 14, padding: "18px 24px", fontSize: 17, fontWeight: 700, width: "100%", cursor: "pointer" }}
          >
            Iniciar diagnóstico gratis →
          </button>
          <p style={{ color: "#334155", fontSize: 12, textAlign: "center", marginTop: 12 }}>
            Más de 50 empresas ya conocen su salud financiera real
          </p>
        </div>
      </Shell>
    );

  /* ── LANG SELECTION ── */
  if (screen === "lang")
    return (
      <Shell>
        <div style={{ background: "#0a1628", minHeight: "100dvh", padding: "32px 24px 48px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: 360 }}>
            {/* Badge */}
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🌎</div>
              <h2 style={{ color: "#f1f5f9", fontSize: 22, fontWeight: 800, lineHeight: 1.3, margin: "0 0 12px" }}>
                ¿En qué idioma prefieres continuar?
              </h2>
              <p style={{ color: "#94a3b8", fontSize: 15, margin: 0 }}>
                What language would you prefer?
              </p>
            </div>

            {/* Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <button
                onClick={() => {
                  setChatLang("es");
                  setStep(0); setAnswers({}); setSelected(null);
                  setScreen("quiz");
                }}
                style={{
                  display: "flex", alignItems: "center", gap: 16,
                  background: "#111f3a", border: "1.5px solid rgba(255,255,255,.08)",
                  borderRadius: 16, padding: "20px 24px", cursor: "pointer",
                  textAlign: "left", transition: "all .18s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#06b6d4")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,.08)")}
              >
                <span style={{ fontSize: 32 }}>🇲🇽</span>
                <div>
                  <div style={{ color: "#f1f5f9", fontSize: 17, fontWeight: 700, marginBottom: 2 }}>Español</div>
                  <div style={{ color: "#64748b", fontSize: 13 }}>Continuar en español</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setChatLang("en");
                  setStep(0); setAnswers({}); setSelected(null);
                  setScreen("quiz");
                }}
                style={{
                  display: "flex", alignItems: "center", gap: 16,
                  background: "#111f3a", border: "1.5px solid rgba(255,255,255,.08)",
                  borderRadius: 16, padding: "20px 24px", cursor: "pointer",
                  textAlign: "left", transition: "all .18s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#06b6d4")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,.08)")}
              >
                <span style={{ fontSize: 32 }}>🇺🇸</span>
                <div>
                  <div style={{ color: "#f1f5f9", fontSize: 17, fontWeight: 700, marginBottom: 2 }}>English</div>
                  <div style={{ color: "#64748b", fontSize: 13 }}>Continue in English</div>
                </div>
              </button>
            </div>

            <button
              onClick={() => setScreen("landing")}
              style={{ marginTop: 24, width: "100%", background: "transparent", border: "none", color: "#334155", fontSize: 13, cursor: "pointer", padding: 8 }}
            >
              ← Volver / Go back
            </button>
          </div>
        </div>
      </Shell>
    );

  /* ── QUIZ ── */
  if (screen === "quiz") {
    const q = questions[step];
    const progress = ((step + 1) / questions.length) * 100;
    return (
      <Shell>
        <div style={{ background: "#0a1628", minHeight: "100dvh", padding: "24px 24px 40px", display: "flex", flexDirection: "column" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <button onClick={quizBack} style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 6 }}>
              <ArrowLeft size={20} />
            </button>
            <span style={{ color: "#64748b", fontSize: 13, fontWeight: 600 }}>
              Pregunta {step + 1} de {questions.length}
            </span>
            <button onClick={() => setScreen("landing")} style={{ background: "transparent", border: "none", color: "#334155", cursor: "pointer", padding: 0 }}>
              <X size={20} />
            </button>
          </div>

          {/* Progress */}
          <div style={{ height: 4, background: "#1a2f50", borderRadius: 99, overflow: "hidden", marginBottom: 28 }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,#1d4ed8,#06b6d4)", borderRadius: 99, transition: "width .4s ease" }} />
          </div>

          {/* Question */}
          <div style={{ flex: 1 }}>
            <div style={{ textAlign: "center", fontSize: 36, marginBottom: 16 }}>{q.icon}</div>
            <h2 style={{ color: "#f1f5f9", fontSize: 20, fontWeight: 800, lineHeight: 1.3, margin: "0 0 24px", textAlign: "center" }}>
              {q.text}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => selectOption(i, opt.value)}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    background: selected === i ? "#0d2540" : "#111f3a",
                    border: `1.5px solid ${selected === i ? "#06b6d4" : "rgba(255,255,255,.06)"}`,
                    borderRadius: 14, padding: 16, cursor: "pointer", textAlign: "left",
                    color: selected === i ? "#fff" : "#e2e8f0", fontSize: 15, fontWeight: 500,
                    transition: "all .18s ease", boxShadow: selected === i ? "0 0 0 1px #06b6d4" : "none",
                  }}
                >
                  <span style={{
                    width: 20, height: 20, borderRadius: "50%",
                    border: selected === i ? "none" : "2px solid #334155",
                    background: selected === i ? "#06b6d4" : "transparent",
                    flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {selected === i && <span style={{ width: 8, height: 8, background: "#fff", borderRadius: "50%", display: "block" }} />}
                  </span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Next */}
          <div style={{ marginTop: 24 }}>
            <button
              onClick={quizNext}
              disabled={selected === null}
              style={{
                background: selected !== null ? "linear-gradient(135deg,#1d4ed8,#06b6d4)" : "#1a2f50",
                color: "#fff", border: "none", borderRadius: 14, padding: "16px 24px",
                fontSize: 16, fontWeight: 700, width: "100%", cursor: selected !== null ? "pointer" : "not-allowed",
                opacity: selected !== null ? 1 : 0.5, transition: "all .2s",
              }}
            >
              Siguiente →
            </button>
          </div>
        </div>
      </Shell>
    );
  }

  /* ── ANALYZING ── */
  if (screen === "analyzing")
    return (
      <Shell>
        <div style={{ height: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center", background: "#0a1628" }}>
          <div style={{ marginBottom: 32 }}>
            <svg width="64" height="64" viewBox="0 0 100 100" fill="none" style={{ animation: "spin 2s linear infinite" }}>
              <circle cx="50" cy="50" r="44" stroke="rgba(6,182,212,.2)" strokeWidth="8" />
              <path d="M50 6 A44 44 0 0 1 94 50" stroke="url(#sg)" strokeWidth="8" strokeLinecap="round" />
              <defs><linearGradient id="sg" x1="50" y1="6" x2="94" y2="50" gradientUnits="userSpaceOnUse"><stop stopColor="#1d4ed8" /><stop offset="1" stopColor="#06b6d4" /></linearGradient></defs>
            </svg>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 12px", background: "linear-gradient(135deg,#06b6d4,#3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Analizando tu empresa
          </h2>
          <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.6 }}>{analyzeMsg}</p>
          <div style={{ marginTop: 32, width: "100%", maxWidth: 280 }}>
            <div style={{ height: 4, background: "#1a2f50", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${analyzePct}%`, background: "linear-gradient(90deg,#1d4ed8,#06b6d4)", borderRadius: 99, transition: "width .4s ease" }} />
            </div>
          </div>
          <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
        </div>
      </Shell>
    );

  /* ── CHAT ── */
  if (screen === "chat")
    return (
      <Shell>
        <div style={{ height: "100dvh", display: "flex", flexDirection: "column", background: "#0a1628" }}>
          {/* Chat header */}
          <div style={{ padding: "20px 20px 16px", background: "#0a1628", borderBottom: "1px solid rgba(255,255,255,.05)", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 42, height: 42, background: "linear-gradient(135deg,#1d4ed8,#06b6d4)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 18 }}>💼</div>
              <div>
                <div style={{ color: "#f1f5f9", fontSize: 15, fontWeight: 700 }}>Consultor Yhopping</div>
                <div style={{ color: "#06b6d4", fontSize: 12, display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ width: 6, height: 6, background: "#10b981", borderRadius: "50%", display: "inline-block" }} />
                  IA activa · Análisis financiero
                </div>
              </div>
              <button onClick={() => setScreen("results")} style={{ marginLeft: "auto", background: "rgba(6,182,212,.1)", border: "1px solid rgba(6,182,212,.3)", color: "#06b6d4", borderRadius: 10, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                Ver resultado →
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={chatRef} style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
            {messages.map((m, i) =>
              m.role === "assistant" ? (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#1d4ed8,#06b6d4)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 15 }}>💼</div>
                  <div style={{ background: "#111f3a", border: "1px solid rgba(6,182,212,.15)", borderRadius: "18px 18px 18px 4px", padding: "14px 16px", maxWidth: "85%", fontSize: 14, lineHeight: 1.6, color: "#e2e8f0", whiteSpace: "pre-wrap" }}>
                    {m.content}
                  </div>
                </div>
              ) : (
                <div key={i} style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div style={{ background: "linear-gradient(135deg,#1d4ed8,#06b6d4)", borderRadius: "18px 18px 4px 18px", padding: "14px 16px", maxWidth: "85%", fontSize: 14, lineHeight: 1.6, color: "#fff" }}>
                    {m.content}
                  </div>
                </div>
              )
            )}
            {isTyping && (
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#1d4ed8,#06b6d4)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 15 }}>💼</div>
                <div style={{ background: "#111f3a", border: "1px solid rgba(6,182,212,.15)", borderRadius: "18px 18px 18px 4px", padding: "16px 18px" }}>
                  <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}.dot{display:inline-block;width:6px;height:6px;background:#06b6d4;borderRadius:50%;margin:0 1px;animation:bounce .9s infinite}.dot:nth-child(2){animation-delay:.2s}.dot:nth-child(3){animation-delay:.4s}`}</style>
                  <span className="dot" /><span className="dot" /><span className="dot" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{ padding: "16px 16px 24px", background: "#0a1628", borderTop: "1px solid rgba(255,255,255,.05)", flexShrink: 0 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                placeholder="Escribe tu respuesta…"
                rows={1}
                style={{ flex: 1, background: "#111f3a", border: "1.5px solid rgba(255,255,255,.08)", borderRadius: 14, padding: "13px 16px", color: "#e2e8f0", fontSize: 15, fontFamily: "inherit", resize: "none", outline: "none", lineHeight: 1.5, maxHeight: 120 }}
              />
              <button onClick={sendMessage} style={{ width: 46, height: 46, background: "linear-gradient(135deg,#1d4ed8,#06b6d4)", border: "none", borderRadius: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="white"><path d="M3 10l14-7-7 14V10H3z" /></svg>
              </button>
            </div>
            <p style={{ color: "#334155", fontSize: 11, textAlign: "center", margin: "8px 0 0" }}>
              O bien →{" "}
              <button onClick={() => setScreen("results")} style={{ background: "none", border: "none", color: "#06b6d4", fontSize: 11, cursor: "pointer", textDecoration: "underline" }}>
                ver tu diagnóstico completo ahora
              </button>
            </p>
          </div>
        </div>
      </Shell>
    );

  /* ── RESULTS ── */
  if (screen === "results")
    return (
      <Shell>
        <div style={{ padding: "28px 24px 48px", background: "#0a1628", minHeight: "100dvh" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Image
                src="/images/yh-logo-dark.png"
                alt="Yhopping"
                width={520}
                height={120}
                style={{ height: 24, width: "auto" }}
              />
            </div>
            <span style={{ color: "#334155", fontSize: 12 }}>
              {new Date().toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>

          {/* Score ring */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ display: "inline-flex", position: "relative", width: 180, height: 180 }}>
              <svg width="180" height="180" viewBox="0 0 180 180">
                <defs>
                  <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1d4ed8" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                <circle cx="90" cy="90" r="76" fill="none" stroke="#1a2f50" strokeWidth="12" />
                <circle
                  cx="90" cy="90" r="76" fill="none" stroke="url(#scoreGrad)" strokeWidth="12"
                  strokeLinecap="round" strokeDasharray={circumference}
                  strokeDashoffset={scoreOffset}
                  style={{ transform: "rotate(-90deg)", transformOrigin: "90px 90px", transition: "stroke-dashoffset 1.5s ease" }}
                />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 48, fontWeight: 900, color: "#f1f5f9", lineHeight: 1 }}>{scores.total}</span>
                <span style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>/100</span>
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4, color: sColor }}>{sLabel}</div>
              <div style={{ color: "#64748b", fontSize: 13 }}>{sSublabel}</div>
            </div>
          </div>

          {/* Dimensions */}
          <div style={{ background: "#111f3a", border: "1px solid rgba(6,182,212,.12)", borderRadius: 16, padding: 20, marginBottom: 20 }}>
            <h3 style={{ color: "#e2e8f0", fontSize: 15, fontWeight: 700, margin: "0 0 18px" }}>Análisis por dimensión</h3>
            {[
              { label: "📊 Visibilidad financiera", val: scores.vis, color: "linear-gradient(90deg,#1d4ed8,#3b82f6)" },
              { label: "💸 Control de flujo", val: scores.flujo, color: "linear-gradient(90deg,#0891b2,#06b6d4)" },
              { label: "📈 Estructura de crecimiento", val: scores.crec, color: "linear-gradient(90deg,#6d28d9,#8b5cf6)" },
            ].map(({ label, val, color }) => (
              <div key={label} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ color: "#94a3b8", fontSize: 13, fontWeight: 500 }}>{label}</span>
                  <span style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 700 }}>{val}/10</span>
                </div>
                <div style={{ height: 8, borderRadius: 99, background: "#1a2f50", overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 99, background: color, width: `${val * 10}%`, transition: "width 1s ease" }} />
                </div>
              </div>
            ))}
          </div>

          {/* AI diagnosis */}
          <div style={{ background: "#111f3a", border: "1px solid rgba(6,182,212,.12)", borderRadius: 16, padding: 20, marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>🤖</span>
              <span style={{ color: "#e2e8f0", fontSize: 15, fontWeight: 700 }}>Diagnóstico IA</span>
            </div>
            <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{diagnosisText}</p>
          </div>

          {/* CTAs */}
          <button onClick={() => setScreen("quote")} style={{ width: "100%", background: "linear-gradient(135deg,#1d4ed8,#06b6d4)", color: "#fff", border: "none", borderRadius: 14, padding: "16px 24px", fontSize: 16, fontWeight: 700, cursor: "pointer", marginBottom: 12 }}>
            Ver mi cotización personalizada →
          </button>
          <button onClick={shareResult} style={{ width: "100%", background: "transparent", color: "#06b6d4", border: "1px solid rgba(6,182,212,.4)", borderRadius: 14, padding: "14px 24px", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
            📤 Compartir mi resultado en LinkedIn
          </button>
        </div>
      </Shell>
    );

  /* ── QUOTE ── */
  if (screen === "quote")
    return (
      <Shell>
        <div style={{ padding: "28px 24px 48px", background: "#0a1628", minHeight: "100dvh" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <button onClick={() => setScreen("results")} style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0 }}>
              <ArrowLeft size={22} />
            </button>
            <span style={{ color: "#e2e8f0", fontSize: 17, fontWeight: 800 }}>Tu plan Yhopping</span>
          </div>

          {/* Free session */}
          <div style={{ background: "linear-gradient(135deg,rgba(16,185,129,.12),rgba(6,182,212,.08))", border: "1.5px solid rgba(16,185,129,.3)", borderRadius: 18, padding: 20, marginBottom: 20, textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🆓</div>
            <div style={{ color: "#10b981", fontSize: 13, fontWeight: 700, letterSpacing: ".05em", marginBottom: 6 }}>SESIÓN INICIAL SIN COSTO</div>
            <div style={{ color: "#f1f5f9", fontSize: 20, fontWeight: 800, marginBottom: 6 }}>1 hora de diagnóstico gratuita</div>
            <div style={{ color: "#64748b", fontSize: 13 }}>Sin compromiso.</div>
          </div>

          {/* Packages */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
            {packages.map((p, i) => (
              <div key={i} style={{ background: "#111f3a", border: i === 0 ? "1.5px solid rgba(16,185,129,.3)" : "1px solid rgba(255,255,255,.06)", borderRadius: 16, padding: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ background: `${p.tagColor}22`, color: p.tagColor, borderRadius: 99, padding: "4px 12px", fontSize: 11, fontWeight: 700 }}>{p.tag}</span>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: i === 0 ? "#10b981" : "#e2e8f0", fontSize: 16, fontWeight: 800 }}>{p.price}</div>
                    <div style={{ color: "#334155", fontSize: 11 }}>{p.hours}</div>
                  </div>
                </div>
                <div style={{ color: "#e2e8f0", fontSize: 15, fontWeight: 700, marginBottom: 10 }}>{p.name}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {p.items.map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <svg width="14" height="14" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke={p.tagColor} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <span style={{ color: "#64748b", fontSize: 13 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {isAltruistic && (
            <div style={{ background: "rgba(245,158,11,.07)", border: "1px solid rgba(245,158,11,.25)", borderRadius: 14, padding: 16, marginBottom: 20, textAlign: "center" }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>🌱</div>
              <div style={{ color: "#fbbf24", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Proyecto social detectado</div>
              <div style={{ color: "#94a3b8", fontSize: 13 }}>En Yhopping evaluamos apoyar proyectos altruistas sin costo. Cuéntanos más en la llamada.</div>
            </div>
          )}

          <button onClick={scheduleCall} style={{ width: "100%", background: "linear-gradient(135deg,#1d4ed8,#06b6d4)", color: "#fff", border: "none", borderRadius: 14, padding: "18px 24px", fontSize: 17, fontWeight: 700, cursor: "pointer", marginBottom: 12 }}>
            📞 Agendar mi sesión gratuita
          </button>
          <button onClick={sendWhatsApp} style={{ width: "100%", background: "transparent", color: "#06b6d4", border: "1px solid rgba(6,182,212,.4)", borderRadius: 14, padding: "14px 24px", fontSize: 15, fontWeight: 600, cursor: "pointer", marginBottom: 12 }}>
            💬 Enviar por WhatsApp
          </button>
          <button onClick={shareResult} style={{ width: "100%", background: "transparent", color: "#06b6d4", border: "1px solid rgba(6,182,212,.4)", borderRadius: 14, padding: "14px 24px", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
            📤 Compartir en LinkedIn
          </button>
        </div>
      </Shell>
    );

  /* ── CONFIG ── */
  if (screen === "config")
    return (
      <Shell>
        <div style={{ padding: "28px 24px 48px", background: "#0a1628", minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
            <button onClick={() => setScreen("landing")} style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0 }}>
              <ArrowLeft size={22} />
            </button>
            <span style={{ color: "#e2e8f0", fontSize: 17, fontWeight: 800 }}>
              <Settings size={18} style={{ display: "inline", marginRight: 8 }} />
              Configuración
            </span>
          </div>

          {[
            { label: "ANTHROPIC API KEY", key: "apiKey" as const, type: "password", placeholder: "sk-ant-api03-..." },
            { label: "WHATSAPP DE CONTACTO", key: "waNumber" as const, type: "tel", placeholder: "5215512345678" },
            { label: "LINK CALENDLY (opcional)", key: "calendlyLink" as const, type: "url", placeholder: "https://calendly.com/yhopping/..." },
          ].map(({ label, key, type, placeholder }) => (
            <div key={key} style={{ background: "#111f3a", border: "1px solid rgba(6,182,212,.12)", borderRadius: 16, padding: 20, marginBottom: 16 }}>
              <label style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, letterSpacing: ".05em", display: "block", marginBottom: 8 }}>{label}</label>
              <input
                type={type}
                value={cfgForm[key]}
                onChange={(e) => setCfgForm((f) => ({ ...f, [key]: e.target.value }))}
                placeholder={placeholder}
                style={{ width: "100%", background: "#0a1628", border: "1.5px solid rgba(255,255,255,.08)", borderRadius: 10, padding: "12px 14px", color: "#e2e8f0", fontSize: 14, fontFamily: "monospace", outline: "none", boxSizing: "border-box" }}
              />
            </div>
          ))}

          <button onClick={saveConfig} style={{ background: "linear-gradient(135deg,#1d4ed8,#06b6d4)", color: "#fff", border: "none", borderRadius: 14, padding: "16px 24px", fontSize: 16, fontWeight: 700, width: "100%", cursor: "pointer" }}>
            Guardar configuración
          </button>
          {cfgSaved && <p style={{ color: "#10b981", fontSize: 13, textAlign: "center", marginTop: 12 }}>✓ Configuración guardada</p>}
        </div>
      </Shell>
    );

  return null;
}

/* ─── Shell wrapper ─── */
function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "#0a1628",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Open Sans', system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          minHeight: "100dvh",
          background: "#0a1628",
          position: "relative",
          overflowX: "hidden",
          boxShadow: "0 0 100px rgba(6,182,212,.12)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ─── Logo component ─── */
function YLogo({ small }: { small?: boolean }) {
  const s = small ? 24 : 38;
  return (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
      <path d="M50 50 L20 15 L35 15 L50 35 L65 15 L80 15 L50 50 L50 85 L38 85 L38 50 Z" fill="url(#yg1)" />
      <path d="M50 50 L65 15 L80 15 L50 50 Z" fill="url(#yg2)" opacity="0.85" />
      <defs>
        <linearGradient id="yg1" x1="20" y1="15" x2="50" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1d4ed8" /><stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
        <linearGradient id="yg2" x1="50" y1="15" x2="80" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#06b6d4" /><stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
      </defs>
    </svg>
  );
}
