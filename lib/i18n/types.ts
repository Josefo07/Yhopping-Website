export type Lang = "es" | "en";

export interface AcademiaTranslations {
  badge: string;
  heroTitle: string;
  heroDesc: string;
  proofPoints: string[];
  startBtn: string;
  question: string;
  of: string;
  next: string;
  back: string;
  // Contact step
  contactTitle: string;
  contactDesc: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  companyLabel: string;
  companyPlaceholder: string;
  submitBtn: string;
  submitting: string;
  // Results
  resultsTitle: string;
  resultsDesc: string;
  profileLabel: string;
  whatsappBtn: string;
  emailBtn: string;
  restartBtn: string;
  disclaimer: string;
  // Questions
  questions: Array<{
    id: string;
    text: string;
    icon: string;
    options: Array<{ label: string; value: number }>;
  }>;
  // Profiles
  profiles: Array<{ min: number; label: string; sublabel: string; color: string }>;
}

export interface Translations {
  // Header / Nav
  nav: {
    services: string;
    insights: string;
    diagnostic: string;
    contact: string;
    freeDiagnostic: string;
  };
  // Footer
  footer: {
    tagline: string;
    services: string;
    contact: string;
    copyright: string;
  };
  // Home
  home: {
    badge: string;
    hero: string;
    heroSub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    problemsTitle: string;
    problemsSub: string;
    problems: Array<{ icon: string; title: string; desc: string; context: string }>;
    servicesTitle: string;
    servicesSub: string;
    services: Array<{ title: string; desc: string; bullet: string }>;
    whyTitle: string;
    whyLabel: string;
    whyReasons: string[];
    whyCta: string;
    ctaFinalTitle: string;
    ctaFinalSub: string;
    ctaFinalBtn: string;
    viewMore: string;
  };
  // Servicios
  services: {
    pageTitle: string;
    pageDesc: string;
    includes: string;
    requestInfo: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaBtn: string;
    sidebarLabels: {
      para: string;
      modalidad: string;
      inversion: string;
      resultados: string;
    };
    items: Array<{
      title: string;
      desc: string;
      incluye: string[];
      sidebar: { para: string; modalidad: string; inversion: string; resultados: string };
    }>;
  };
  // Contacto
  contact: {
    pageTitle: string;
    pageDesc: string;
    formTitle: string;
    name: string;
    nameRequired: string;
    namePlaceholder: string;
    email: string;
    emailRequired: string;
    emailInvalid: string;
    phone: string;
    phoneRequired: string;
    phoneInvalid: string;
    company: string;
    companyOptional: string;
    companyPlaceholder: string;
    message: string;
    messageRequired: string;
    messageMin: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    successTitle: string;
    successDesc: string;
    sendAnother: string;
    infoTitle: string;
    location: string;
    responseNote: string;
    freeConsult: string;
  };
  // Insights
  insights: {
    pageTitle: string;
    pageDesc: string;
    readMore: string;
    noPostsYet: string;
    filterAll: string;
    categories: {
      Operations: string;
      Technology: string;
      Leadership: string;
      Finance: string;
    };
  };
  // Diagnostico
  diagnostic: {
    badge: string;
    heroTitle: string;
    heroTitleHighlight: string;
    heroDesc: string;
    proofPoints: string[];
    painChips: Array<{ text: string; bg: string; border: string; color: string }>;
    startBtn: string;
    socialProof: string;
    question: string;
    of: string;
    next: string;
    analyzing: string;
    analyzeMessages: string[];
    chatTitle: string;
    chatSubtitle: string;
    viewResults: string;
    inputPlaceholder: string;
    sendBtn: string;
    resultsTitle: string;
    financialVisibility: string;
    cashFlow: string;
    growthStructure: string;
    total: string;
    diagnosis: string;
    yourPlan: string;
    scheduleBtn: string;
    whatsappBtn: string;
    shareBtn: string;
    restartBtn: string;
    shareLabel: string;
    scoreLabels: Array<{ label: string; sublabel: string }>;
    packages: {
      tag0: string;
      name0: string;
      items0: string[];
      tagUrgent: string;
      tagRecommended: string;
      nameCashflow: string;
      hoursCashflowUrgent: string;
      hoursCashflowNormal: string;
      priceCashflowUrgent: string;
      priceCashflowNormal: string;
      itemsCashflow: string[];
      tagHighPriority: string;
      nameDiagnostic: string;
      hoursDiagnostic: string;
      priceDiagnostic: string;
      itemsDiagnostic: string[];
      tagScale: string;
      nameProcess: string;
      hoursProcess: string;
      priceProcess: string;
      itemsProcess: string[];
    };
  };
}
