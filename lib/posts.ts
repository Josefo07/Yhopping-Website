export type PostLang = "es" | "en";

export interface Post {
  slug: string;
  title: string;
  category: "Operaciones" | "Tecnología" | "Liderazgo" | "Finanzas" | "Operations" | "Technology" | "Leadership" | "Finance";
  date: string;
  excerpt: string;
  content: string;
  lang: PostLang;
}

export const posts: Post[] = [
  // ─── ESPAÑOL ───────────────────────────────────────────────
  {
    slug: "coo-que-no-entiende-finanzas",
    lang: "es",
    title: "El COO que no entiende finanzas ya no compite",
    category: "Operaciones",
    date: "Febrero 2026",
    excerpt:
      "El Director de Operaciones de 2026 no solo mueve producto. Controla flujo de caja, negocia con proveedores y lee estados financieros como un CFO.",
    content: `El COO que no entiende finanzas ya no compite

El Director de Operaciones de 2026 no solo mueve producto.

Controla flujo de caja, negocia con proveedores y lee estados financieros como un CFO.

La alta dirección en México prioriza el control de costos y gastos (51%) y la optimización con IA (38%) según KPMG 2026.

Un COO sin visión financiera ya no es solo una limitación—es un riesgo operativo.

En mi experiencia liderando operaciones por más de 20 años:

✅ El mejor COO entiende cada línea del P&L
✅ El mejor COO negocia términos de pago como un CFO
✅ El mejor COO sabe cuánto cuesta cada minuto de paro

La visión 360° (Operaciones + Finanzas + Tecnología) no es opcional. Es la combinación ganadora para roles C-level hoy.

¿Tu Director de Operaciones domina el flujo de caja o solo apaga incendios?

📊 Dato: 51% de empresas mexicanas priorizan control de costos como estrategia 2026 (KPMG)`,
  },
  {
    slug: "ia-en-finanzas-hype-a-flujo-real",
    lang: "es",
    title: "IA en finanzas: de hype a flujo de caja real",
    category: "Tecnología",
    date: "Febrero 2026",
    excerpt:
      "El 50% de las empresas en México identifica la incertidumbre económica como su mayor obstáculo en 2026. Pero solo el 24% usa IA para gestionar su flujo financiero.",
    content: `IA en finanzas: de hype a flujo de caja real

El 50% de las empresas en México identifica la incertidumbre económica como su mayor obstáculo en 2026. Pero solo el 24% usa IA para gestionar su flujo financiero.

Agentes de IA ya automatizan conciliaciones, validaciones fiscales con SAT, y proyecciones de liquidez en tiempo real. No es ciencia ficción: es eficiencia operativa medible.

Empresas que integran IA en finanzas reducen errores en facturación, aceleran cierres mensuales y liberan tiempo estratégico del equipo financiero.

Muchas empresas aún cierran mes manualmente. Las que automatizan ganan semanas de ventaja estratégica.

¿Qué proceso financiero automatizarías primero?`,
  },
  {
    slug: "crecer-sin-quemar-a-tu-equipo",
    lang: "es",
    title: "Crecer sin quemar a tu equipo",
    category: "Liderazgo",
    date: "Marzo 2026",
    excerpt:
      "Hay una métrica que pocos directores rastrean: cuántas personas renunciaron no porque ganaran mal, sino porque ya no aguantaban el ritmo.",
    content: `Crecer sin quemar a tu equipo

Hay una métrica que pocos directores rastrean: cuántas personas renunciaron no porque ganaran mal, sino porque ya no aguantaban el ritmo.

En México, 6 de cada 10 empresas buscan crecer este año enfocadas en resiliencia (KPMG 2026). Pero pocas se preguntan: ¿resiliencia de la empresa o del equipo?

He visto PyMEs duplicar ventas en 18 meses y perder 40% de su talento clave en el proceso. El costo oculto del crecimiento mal gestionado no está en los estados financieros—está en el agotamiento de las personas que lo hicieron posible.

La trampa es obvia pero invisible:
- Más clientes = más presión sobre las mismas personas
- Más ingresos = expectativa de "seguir igual que funcionó"
- Más urgencias = menos tiempo para contratar y capacitar

Y cuando el equipo se quiebra, el crecimiento también.

Crecer de manera sostenible significa:

✅ Contratar ANTES de que el equipo esté al límite, no después
✅ Automatizar procesos repetitivos para liberar capacidad humana
✅ Decir NO a clientes o proyectos cuando la operación no está lista
✅ Medir agotamiento del equipo como métrica de riesgo operativo

El crecimiento que destruye a las personas que lo generan no es crecimiento—es una bomba de tiempo.`,
  },
  {
    slug: "la-empresa-que-cuidas",
    lang: "es",
    title: "La empresa que cuidas como si fuera tuya",
    category: "Liderazgo",
    date: "Febrero 2026",
    excerpt:
      "Llevo más de 20 años cuidando el dinero de otros como si fuera mío. Cero retrasos en nómina por más de 10 años.",
    content: `La empresa que cuidas como si fuera tuya (aunque no lo sea)

Llevo más de 20 años cuidando el dinero de otros como si fuera mío.

Cero retrasos en nómina por más de 10 años. ¿Por qué? Porque detrás de cada pago hay familias.

Detrás de cada factura a proveedores hay empresas pequeñas que dependen de cobrar a tiempo. Detrás de cada peso del presupuesto hay decisiones que impactan personas reales.

He trabajado en Televisa gestionando presupuestos de varios millones. En banca negociando acuerdos en LATAM. Y desde hace 7 años liderando operaciones en manufactura y servicios en Nuevo León.

En cada lugar aprendí lo mismo: cuando cuidas cada recurso de la empresa como si fuera el último, nunca te falta el que importa.

No es solo números. Es responsabilidad.

Y esa combinación—experiencia operativa + tecnología + visión estratégica—es lo que genera impacto real.`,
  },
  {
    slug: "las-decisiones-que-nadie-ve",
    lang: "es",
    title: "Las decisiones que nadie ve",
    category: "Liderazgo",
    date: "Febrero 2026",
    excerpt:
      "Un colaborador me preguntó: '¿Cuál ha sido la decisión más difícil que has tomado como Director de Operaciones?' Le respondí: 'Ninguna de las que aparecen en presentaciones.'",
    content: `Las decisiones que nadie ve

Un colaborador me preguntó: "¿Cuál ha sido la decisión más difícil que has tomado como Director de Operaciones?"

Le respondí: "Ninguna de las que aparecen en presentaciones."

Porque las decisiones más difíciles son las que nadie ve:

🔹 Decir que NO a un cliente importante porque el riesgo financiero era demasiado alto
🔹 Defender el presupuesto de capacitación cuando "había que recortar costos"
🔹 Renegociar un contrato con un proveedor de 10 años que ya no funcionaba
🔹 Implementar un sistema nuevo que nadie quería aprender

En 20+ años aprendí que el liderazgo no se mide por las decisiones fáciles que todos aplauden.

Se mide por las decisiones incómodas que proteges en silencio.`,
  },
  {
    slug: "vision-vs-validacion",
    lang: "es",
    title: "Visión vs. Validación",
    category: "Operaciones",
    date: "Febrero 2026",
    excerpt:
      "La paradoja del liderazgo operativo en 2026: necesitas pensar estratégicamente y ejecutar impecablemente al mismo tiempo.",
    content: `Visión vs. Validación

Esta semana compartí dos lecciones de dos décadas en operaciones:

1️⃣ El COO moderno necesita visión 360° (Ops + Finanzas + Tech)
2️⃣ Pero la visión sin validación automática solo genera errores caros

La paradoja del liderazgo operativo en 2026:

Necesitas pensar estratégicamente (largo plazo, transformación, IA)
Y ejecutar impecablemente (cero errores, flujo protegido, continuidad)

El equilibrio está en:
- Automatizar lo repetible (validaciones, conciliaciones, alertas)
- Liberar tiempo estratégico (para decidir, no para apagar incendios)
- Medir lo que importa (no vanity metrics)

¿De qué lado te inclinas más? ¿Visión o ejecución?`,
  },

  // ─── ENGLISH ───────────────────────────────────────────────
  {
    slug: "coo-without-finance-skills",
    lang: "en",
    title: "The COO Without Financial Skills Can't Compete Anymore",
    category: "Operations",
    date: "February 2026",
    excerpt:
      "Today's COO doesn't just move product. They control cash flow, negotiate with suppliers, and read financial statements like a CFO.",
    content: `The COO Without Financial Skills Can't Compete Anymore

Today's COO doesn't just move product.

They control cash flow, negotiate with suppliers, and read financial statements like a CFO.

Senior leadership in Mexico prioritizes cost control (51%) and AI optimization (38%) according to KPMG 2026.

A COO without financial vision isn't just a limitation — it's an operational risk.

In my 20+ years leading operations:

✅ The best COOs understand every line of the P&L
✅ The best COOs negotiate payment terms like a CFO
✅ The best COOs know exactly what each minute of downtime costs

360° vision (Operations + Finance + Technology) isn't optional. It's the winning combination for C-level roles today.

Does your COO master cash flow or just put out fires?

📊 Stat: 51% of Mexican companies prioritize cost control as their 2026 strategy (KPMG)`,
  },
  {
    slug: "ai-in-finance-hype-to-real-cash",
    lang: "en",
    title: "AI in Finance: From Hype to Real Cash Flow",
    category: "Technology",
    date: "February 2026",
    excerpt:
      "50% of companies in Mexico identify economic uncertainty as their biggest obstacle in 2026. Yet only 24% use AI to manage their financial flow.",
    content: `AI in Finance: From Hype to Real Cash Flow

50% of companies in Mexico identify economic uncertainty as their biggest obstacle in 2026. Yet only 24% use AI to manage their financial flow.

AI agents already automate reconciliations, tax validations, and real-time liquidity projections. This isn't science fiction — it's measurable operational efficiency.

Companies integrating AI in finance reduce billing errors, accelerate monthly closes, and free up strategic time for the finance team.

Many companies still close the month manually. Those that automate gain weeks of strategic advantage.

What financial process would you automate first?`,
  },
  {
    slug: "grow-without-burning-your-team",
    lang: "en",
    title: "Growing Without Burning Out Your Team",
    category: "Leadership",
    date: "March 2026",
    excerpt:
      "There's a metric few executives track: how many people quit not because of low pay, but because they couldn't keep up with the pace.",
    content: `Growing Without Burning Out Your Team

There's a metric few executives track: how many people quit not because of low pay, but because they couldn't keep up with the pace.

In Mexico, 6 out of 10 companies are focused on growth through resilience this year (KPMG 2026). But few ask: resilience of the company or of the team?

I've seen SMBs double sales in 18 months and lose 40% of their key talent in the process. The hidden cost of poorly managed growth isn't in the financial statements — it's in the burnout of the people who made it happen.

The trap is obvious but invisible:
- More clients = more pressure on the same people
- More revenue = expectation to "keep doing what worked"
- More urgencies = less time to hire and train

And when the team breaks, growth breaks with it.

Sustainable growth means:

✅ Hiring BEFORE the team hits the limit, not after
✅ Automating repetitive processes to free up human capacity
✅ Saying NO to clients or projects when operations aren't ready
✅ Measuring team burnout as an operational risk metric

Growth that destroys the people who generate it isn't growth — it's a time bomb.`,
  },
  {
    slug: "the-company-you-treat-as-your-own",
    lang: "en",
    title: "The Company You Treat as Your Own (Even When It's Not)",
    category: "Leadership",
    date: "February 2026",
    excerpt:
      "I've spent over 20 years managing other people's money as if it were my own. Zero payroll delays for over 10 years.",
    content: `The Company You Treat as Your Own (Even When It's Not)

I've spent over 20 years managing other people's money as if it were my own.

Zero payroll delays for over 10 years. Why? Because behind every payment there are families.

Behind every vendor invoice there are small companies that depend on getting paid on time. Behind every budget peso there are decisions that impact real people.

I've worked at Televisa managing multi-million dollar budgets. In banking negotiating agreements across LATAM. And for the past 7 years leading operations in manufacturing and services in Nuevo León.

In every place I learned the same thing: when you take care of every company resource as if it were your last, you never run out of what matters.

It's not just numbers. It's responsibility.

And that combination — operational experience + technology + strategic vision — is what creates real impact.`,
  },
  {
    slug: "decisions-no-one-sees",
    lang: "en",
    title: "The Decisions No One Sees",
    category: "Leadership",
    date: "February 2026",
    excerpt:
      "A colleague asked me: 'What's been the hardest decision you've made as COO?' I answered: 'None of the ones that show up in presentations.'",
    content: `The Decisions No One Sees

A colleague asked me: "What's been the hardest decision you've made as COO?"

I answered: "None of the ones that show up in presentations."

Because the hardest decisions are the ones no one sees:

🔹 Saying NO to an important client because the financial risk was too high
🔹 Defending the training budget when "we needed to cut costs"
🔹 Renegotiating a 10-year vendor contract that was no longer working
🔹 Implementing a new system that no one wanted to learn

After 20+ years I learned that leadership isn't measured by the easy decisions everyone applauds.

It's measured by the uncomfortable decisions you protect in silence.`,
  },
  {
    slug: "vision-vs-validation",
    lang: "en",
    title: "Vision vs. Validation",
    category: "Operations",
    date: "February 2026",
    excerpt:
      "The paradox of operational leadership in 2026: you need to think strategically and execute flawlessly at the same time.",
    content: `Vision vs. Validation

This week I shared two lessons from two decades in operations:

1️⃣ The modern COO needs 360° vision (Ops + Finance + Tech)
2️⃣ But vision without automatic validation only generates costly errors

The paradox of operational leadership in 2026:

You need to think strategically (long-term, transformation, AI)
And execute flawlessly (zero errors, protected flow, continuity)

The balance lies in:
- Automating the repeatable (validations, reconciliations, alerts)
- Freeing strategic time (to decide, not to put out fires)
- Measuring what matters (not vanity metrics)

Which side do you lean toward? Vision or execution?`,
  },
];

export const categoriesES = ["Todos", "Operaciones", "Tecnología", "Liderazgo", "Finanzas"] as const;
export const categoriesEN = ["All", "Operations", "Technology", "Leadership", "Finance"] as const;

export type CategoryES = (typeof categoriesES)[number];
export type CategoryEN = (typeof categoriesEN)[number];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByLang(lang: "es" | "en"): Post[] {
  return posts.filter((p) => p.lang === lang);
}
