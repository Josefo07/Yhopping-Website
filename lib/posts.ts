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
  {
    "slug": "coo-que-no-entiende-finanzas",
    "lang": "es",
    "category": "Operaciones",
    "title": "Operaciones y finanzas: una misma conversación",
    "excerpt": "Una decisión operativa conviene revisarla también por su efecto en efectivo, margen y capacidad.",
    "date": "Revisado: 16 noviembre 2026",
    "content": "Criterio editorial de Yhopping · Guía de reflexión, no caso de éxito.\n\nAntes de comprometer una entrega, conviene revisar qué recursos exige, cuándo se paga y cuándo se cobra.\n\nPropuesta de revisión:\n- ¿Qué capacidad está disponible?\n- ¿Qué desembolsos requiere el compromiso?\n- ¿Quién valida margen, plazo y condiciones?\n\nEl objetivo es conectar decisiones entre áreas. No implica que un puesto deba sustituir al otro."
  },
  {
    "slug": "ia-en-finanzas-hype-a-flujo-real",
    "lang": "es",
    "category": "Tecnología",
    "title": "Antes de automatizar, define qué vas a validar",
    "excerpt": "La tecnología es un habilitador. El proceso, los datos y los controles necesitan una definición previa.",
    "date": "Revisado: 16 noviembre 2026",
    "content": "Criterio editorial de Yhopping · Guía de reflexión, no caso de éxito.\n\nUna automatización financiera requiere definir entradas, reglas, responsables y excepciones antes de evaluar herramientas.\n\nLista de revisión propuesta:\n- Identificar el origen de los datos.\n- Acordar quién valida y quién corrige.\n- Probar casos ordinarios y excepciones.\n- Medir tiempo y errores antes y después.\n\nNo se presupone ahorro ni precisión por usar IA. Cualquier beneficio debe comprobarse en el proceso concreto."
  },
  {
    "slug": "crecer-sin-quemar-a-tu-equipo",
    "lang": "es",
    "category": "Liderazgo",
    "title": "Revisar la capacidad antes de prometer más",
    "excerpt": "Más compromisos requieren revisar carga de trabajo, responsabilidades y recursos.",
    "date": "Revisado: 16 noviembre 2026",
    "content": "Criterio editorial de Yhopping · Guía de reflexión, no caso de éxito.\n\nAntes de aceptar más trabajo, proponemos contrastar el compromiso comercial con la capacidad disponible.\n\nPreguntas de revisión:\n- ¿Qué entregables ya están comprometidos?\n- ¿Dónde se acumulan pendientes o retrabajo?\n- ¿Quién puede autorizar un cambio de prioridad?\n- ¿Qué recursos exige el nuevo compromiso?\n\nEsta es una guía de conversación, no una medición del bienestar del equipo ni una garantía de crecimiento."
  },
  {
    "slug": "la-empresa-que-cuidas",
    "lang": "es",
    "category": "Liderazgo",
    "title": "Cuidar los recursos también requiere criterios",
    "excerpt": "Prioridades de pago, autorizaciones y excepciones deben ser claras para quienes ejecutan.",
    "date": "Revisado: 16 noviembre 2026",
    "content": "Criterio editorial de Yhopping · Guía de reflexión, no caso de éxito.\n\nProponemos documentar los criterios con los que se administran recursos y compromisos.\n\nUna revisión puede incluir vencimientos, efectivo disponible, obligaciones asumidas y responsables de autorización.\n\nEl resultado buscado es una decisión trazable: qué se decidió, con qué información y quién dará seguimiento. No se afirma un historial de pagos ni resultados de clientes."
  },
  {
    "slug": "las-decisiones-que-nadie-ve",
    "lang": "es",
    "category": "Liderazgo",
    "title": "Qué conviene dejar de escalar al dueño",
    "excerpt": "Delegar exige acordar qué puede decidir el equipo y qué necesita una excepción.",
    "date": "Revisado: 16 noviembre 2026",
    "content": "Criterio editorial de Yhopping · Guía de reflexión, no caso de éxito.\n\nComo punto de partida, conviene elegir una decisión recurrente y documentar sus límites.\n\n- Qué información necesita quien decide.\n- Qué monto, plazo o condición puede autorizar.\n- Cuándo debe escalar una excepción.\n- Cómo queda registro y seguimiento.\n\nEs un ejercicio propuesto para revisar con la dirección. No representa una conversación real ni un caso de cliente."
  },
  {
    "slug": "vision-vs-validacion",
    "lang": "es",
    "category": "Operaciones",
    "title": "De la información a una decisión con responsable",
    "excerpt": "Un tablero debe ayudar a identificar qué acción revisar y quién la atenderá.",
    "date": "Revisado: 16 noviembre 2026",
    "content": "Criterio editorial de Yhopping · Guía de reflexión, no caso de éxito.\n\nEl Método YHOPPING propone conectar información, decisiones y responsables.\n\nPara revisar un indicador, sugerimos preguntar:\n- ¿De dónde sale el dato y cuándo se actualiza?\n- ¿Qué decisión ayuda a tomar?\n- ¿Quién debe actuar y en qué plazo?\n- ¿Cómo se verifica lo que cambió?\n\nEsta es una propuesta de trabajo. Un tablero por sí solo no acredita mejoras ni elimina errores."
  },
  {
    "slug": "coo-without-finance-skills",
    "lang": "en",
    "category": "Operations",
    "title": "Operations and finance: one conversation",
    "excerpt": "Review operational decisions for their effects on cash, margins and capacity.",
    "date": "Reviewed: 16 November 2026",
    "content": "Yhopping editorial perspective · Discussion guide, not a client success story.\n\nBefore committing to a delivery, review the required resources, payment dates and collection dates.\n\nSuggested questions:\n- What capacity is available?\n- What cash outlays does the commitment require?\n- Who validates margin, timing and terms?\n\nThe aim is to connect decisions across teams. It does not mean one role should replace another."
  },
  {
    "slug": "ai-in-finance-hype-to-real-cash",
    "lang": "en",
    "category": "Technology",
    "title": "Define validation before automation",
    "excerpt": "Technology enables a process; it does not replace clear data, rules and controls.",
    "date": "Reviewed: 16 November 2026",
    "content": "Yhopping editorial perspective · Discussion guide, not a client success story.\n\nBefore evaluating automation tools, define inputs, rules, ownership and exceptions.\n\nSuggested review:\n- Identify data sources.\n- Agree who validates and corrects data.\n- Test ordinary cases and exceptions.\n- Measure time and errors before and after.\n\nAI use does not establish savings or accuracy. Benefits must be verified in the specific process."
  },
  {
    "slug": "grow-without-burning-your-team",
    "lang": "en",
    "category": "Leadership",
    "title": "Review capacity before committing to more",
    "excerpt": "More commitments call for a review of workload, ownership and resources.",
    "date": "Reviewed: 16 November 2026",
    "content": "Yhopping editorial perspective · Discussion guide, not a client success story.\n\nBefore accepting additional work, compare the sales commitment with available capacity.\n\nReview questions:\n- What deliverables are already committed?\n- Where do backlogs or rework accumulate?\n- Who can authorize a priority change?\n- What resources does the new commitment require?\n\nThis is a discussion guide, not a measurement of team wellbeing or a growth guarantee."
  },
  {
    "slug": "the-company-you-treat-as-your-own",
    "lang": "en",
    "category": "Leadership",
    "title": "Managing resources requires clear criteria",
    "excerpt": "Payment priorities, approvals and exceptions should be clear to those executing them.",
    "date": "Reviewed: 16 November 2026",
    "content": "Yhopping editorial perspective · Discussion guide, not a client success story.\n\nWe propose documenting the criteria used to manage resources and commitments.\n\nA review may cover due dates, available cash, existing obligations and approval owners.\n\nThe intended output is a traceable decision: what was decided, with what information and who follows up. This article makes no claim about payment history or client outcomes."
  },
  {
    "slug": "decisions-no-one-sees",
    "lang": "en",
    "category": "Leadership",
    "title": "Which decisions can stop escalating to the owner?",
    "excerpt": "Delegation requires agreement on decision limits and exceptions.",
    "date": "Reviewed: 16 November 2026",
    "content": "Yhopping editorial perspective · Discussion guide, not a client success story.\n\nStart by selecting a recurring decision and documenting its limits.\n\n- What information the decision-maker needs.\n- What amount, timing or terms they may authorize.\n- When to escalate an exception.\n- How decisions and follow-up are recorded.\n\nThis is a proposed exercise to review with management, not a real conversation or client case."
  },
  {
    "slug": "vision-vs-validation",
    "lang": "en",
    "category": "Operations",
    "title": "From information to a decision with an owner",
    "excerpt": "A dashboard should help identify an action to review and its owner.",
    "date": "Reviewed: 16 November 2026",
    "content": "Yhopping editorial perspective · Discussion guide, not a client success story.\n\nThe YHOPPING Method proposes connecting information, decisions and ownership.\n\nSuggested questions for an indicator:\n- What is the data source and update frequency?\n- What decision does it support?\n- Who should act and when?\n- How will the change be checked?\n\nThis is a working proposal. A dashboard alone does not establish improvement or eliminate errors."
  }
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
