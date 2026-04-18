@AGENTS.md

# Yhopping Consultoria — Sitio Web

## Stack
- **Next.js 16.2.3** con App Router + Turbopack
- **React 19** — todos los componentes interactivos son `"use client"`
- **Tailwind v4** — ver advertencia crítica abajo
- **TypeScript 5**
- **Lucide React** para iconos
- **Framer Motion** para animaciones
- **@anthropic-ai/sdk** para el chatbot del diagnóstico (`/api/chat`)
- **react-hook-form** para formularios

---

## ⚠️ REGLA CRÍTICA — Tailwind v4 + Turbopack

Las siguientes clases de Tailwind **NO generan CSS** en esta configuración y provocan layouts rotos silenciosamente:

```
mx-auto   grid   grid-cols-*   gap-*   col-span-*
```

**Solución obligatoria:** usar `style={{}}` inline para cualquier CSS de layout crítico:

```tsx
// MAL — no genera CSS:
<div className="grid grid-cols-2 gap-8 mx-auto max-w-5xl">

// BIEN:
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", maxWidth: "80rem", margin: "0 auto" }}>
```

Tailwind sí funciona para colores, tipografía, padding/margin en elementos inline, flexbox básico, y responsive prefixes (`lg:`, `md:`).

---

## Arquitectura de i18n (ES / EN)

El sitio es completamente bilingüe. El idioma se maneja con **React Context** — sin next-intl, sin cambios de URL.

### Archivos clave

| Archivo | Propósito |
|---|---|
| `lib/i18n/types.ts` | Interface `Translations` + tipo `Lang = "es" \| "en"` |
| `lib/i18n/es.ts` | Objeto con todas las traducciones en español |
| `lib/i18n/en.ts` | Objeto con todas las traducciones en inglés |
| `lib/i18n/LanguageContext.tsx` | Context Provider + hook `useLanguage()` |
| `lib/i18n/es-academia.ts` | Traducciones ES para la sección Academia |
| `lib/i18n/en-academia.ts` | Traducciones EN para la sección Academia |

### Uso en componentes

```tsx
"use client";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function MiComponente() {
  const { t, lang, setLang } = useLanguage();
  return <h1>{t.home.hero}</h1>;
}
```

### Persistencia
- El idioma se guarda en `localStorage` con la clave `yh_lang`
- Default: `"es"`
- El `LanguageProvider` está en `app/layout.tsx` envolviendo todo el árbol

---

## Estructura de rutas

```
app/
  layout.tsx          — Root layout con LanguageProvider + Header + Footer
  page.tsx            — Home (/)
  servicios/page.tsx  — Servicios (/servicios)
  contacto/page.tsx   — Contacto (/contacto)
  insights/
    page.tsx          — Blog listing (/insights)
    [slug]/page.tsx   — Post individual (/insights/:slug)
  diagnostico/page.tsx — Diagnóstico interactivo con chatbot (/diagnostico)
  academia/
    piloto/page.tsx   — Piloto Academia (acceso restringido)
  api/
    chat/route.ts     — API route para chatbot (llama a Anthropic)
    academia/route.ts — API route para Academia
```

---

## Blog / Insights

- **Fuente:** `lib/posts.ts` — array estático de posts (no CMS externo)
- **Campo `lang`:** cada post tiene `lang: "es" | "en"`
- **Función clave:** `getPostsByLang(lang)` filtra por idioma
- **Slugs ES:** `coo-que-no-entiende-finanzas`, `ia-en-finanzas-hype-a-flujo-real`, `crecer-sin-quemar-a-tu-equipo`, `la-empresa-que-tratas-como-propia`, `decisiones-que-nadie-ve`, `vision-vs-validacion`
- **Slugs EN:** `coo-without-finance-skills`, `ai-in-finance-hype-to-real-cash`, `grow-without-burning-your-team`, `the-company-you-treat-as-your-own`, `decisions-no-one-sees`, `vision-vs-validation`
- Para agregar posts: añadir objeto al array `allPosts` en `lib/posts.ts`

---

## Diagnóstico + Chatbot

El diagnóstico (`app/diagnostico/page.tsx`) es el componente más complejo (~1,100 líneas).

### Pantallas (tipo `Screen`)
```
"landing" → "lang" → "quiz" → "analyzing" → "chat" → "results" → "quote"
```
También existe `"config"` para configurar la API key.

### Selección de idioma del chat
- Antes del quiz aparece la pantalla `"lang"` con botones 🇲🇽 / 🇺🇸
- El estado `chatLang: "es" | "en"` controla el idioma del chatbot
- `buildSystemPrompt(scores, chatLang)` retorna el system prompt en el idioma seleccionado

### API del chatbot
- Ruta: `POST /api/chat`
- Variables de entorno aceptadas: `ANTHROPIC_API_KEY` o `CLAUDE_API_KEY`
- Modelo: `claude-haiku-4-5` (haiku por costo/velocidad)

---

## Componentes de layout

### Header (`components/layout/Header.tsx`)
- Toggle ES/EN: componente `<LangToggle />` embebido
  - Desktop: entre los nav links y el CTA
  - Mobile: junto al ícono hamburger
- Nav links usan `t.nav.*`

### Footer (`components/layout/Footer.tsx`)
- Requiere `"use client"` (usa `useLanguage`)
- Links de servicios construidos dinámicamente desde `t.services.items`

---

## Patrones mobile importantes

Los sidebars deben usar `lg:sticky lg:top-24` (NO `sticky top-24` que causa pegarse en mobile):

```tsx
// MAL — se pega en mobile:
<aside className="sticky top-24">

// BIEN:
<aside className="lg:sticky lg:top-24">
```

---

## Variables de entorno

```env
ANTHROPIC_API_KEY=sk-ant-...   # Para el chatbot del diagnóstico
```

Crear `.env.local` en la raíz del proyecto. No commitear.

---

## Deploy

- **Plataforma:** Vercel
- **Repo:** GitHub (branch `main` → auto-deploy)
- **Build command:** `npm run build`
- **Framework:** Next.js (autodetectado por Vercel)

---

## Comandos útiles

```bash
npm run dev      # Servidor local en http://localhost:3000
npm run build    # Build de producción (verificar antes de push)
npm run lint     # ESLint
```
