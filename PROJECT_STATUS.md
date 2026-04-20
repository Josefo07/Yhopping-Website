# PROJECT STATUS — Yhopping Web
_Última actualización: 2026-04-20_

---

## Estado general: 🟢 En producción — Header y branding estabilizados

Último commit `88bda10` en `main`. Build: 24 páginas estáticas, 0 errores TypeScript.

---

## Historial de commits recientes

| Hash | Descripción |
|---|---|
| `88bda10` | fix: header adapts to page context via usePathname ← **ÚLTIMO** |
| `5e69547` | fix: remove duplicate language selector |
| `c996a09` | fix: header logo + nav colors on dark hero |
| `30eaaa6` | fix: logo — render both variants, toggle opacity |
| `3ea1e0c` | feat: brand identity — logos, favicons, OG, manifest |
| `8465a4b` | feat: dark hero, Termómetro Mini, H1, /diagnostico-empresarial |
| `edd95e2` | feat: ES/EN bilingual support across all pages |

---

## Arquitectura de rutas

```
/                          — Home: Hero dark + Problemas + Termómetro Mini + Servicios + Por Qué + CTA
/servicios                 — 4 servicios con sidebar
/contacto                  — Formulario de contacto
/insights                  — Blog listing bilingüe
/insights/[slug]           — Post individual
/diagnostico               — Diagnóstico completo original (10 preguntas + chat)
/diagnostico-empresarial   — Flujo premium: prefill → quiz → análisis → chat → resultados
/academia/piloto           — En desarrollo (no publicado)
/api/chat                  — Proxy Anthropic API para chatbot
/api/academia              — En desarrollo
```

---

## Header — comportamiento por página

El Header detecta la ruta con `usePathname()` y adapta su estado automáticamente:

| Páginas | Comportamiento al top | Al hacer scroll |
|---|---|---|
| `/`, `/diagnostico*` | Transparente · logo blanco · links blancos | Blanco · logo azul · links grises |
| `/servicios`, `/contacto`, `/insights*` | **Blanco desde el top** · logo azul | Blanco · logo azul |

**Regla clave del Header:**
- `hasDarkHero = pathname === "/" || pathname.startsWith("/diagnostico")`
- `isDark = hasDarkHero && !scrolled`
- Logo: dos `<img>` nativos siempre en DOM, `position: absolute`, solo cambia `opacity` — NO cambiar `src` dinámicamente en Next.js `<Image>` (causa bug silencioso)
- `display` responsive: manejado SOLO por Tailwind (`hidden md:flex` / `md:hidden flex`) — nunca poner `display:flex` en `style={{}}` inline (sobreescribe Tailwind)

---

## Identidad de marca — archivos en `public/images/`

| Archivo | Dimensiones | Uso en el sitio |
|---|---|---|
| `yh-logo-dark.png` | 520×120 | Header (sin scroll sobre hero) · Diagnóstico · Diag. Empresarial |
| `yh-logo-light.png` | 520×120 | Header (con scroll / páginas blancas) |
| `yh-logo-dark-2x.png` | 1040×240 | Retina dark (disponible, no implementado aún) |
| `yh-logo-light-2x.png` | 1040×240 | Retina light (disponible, no implementado aún) |
| `yh-logo-tagline-dark.png` | 520×148 | Footer ("Potenciando Empresas") |
| `yh-logo-tagline-light.png` | 520×148 | Disponible para uso externo |
| `yh-favicon-16/32/48.png` | — | Pestaña del navegador |
| `yh-apple-180.png` | 180×180 | iOS home screen |
| `yh-android-192/512.png` | — | Android / PWA |
| `yh-og-image.png` | 1200×630 | Open Graph al compartir en redes |

Archivos externos (Identidad de Marca, no en repo):
`email-signature-*.png` · `linkedin-banner-*.png` · `linkedin-logo-*.png`

---

## ⚠️ Pendiente

### 🔴 PRIORIDAD ALTA

| Tarea | Detalle |
|---|---|
| **SSL `www.yhopping.com`** | `ERR_SSL_PROTOCOL_ERROR`. Fix: Vercel → Settings → Domains → agregar `www.yhopping.com`. Vercel provisiona SSL automáticamente (~5–15 min). |
| **Calendly URL real** | `/diagnostico-empresarial` usa `https://calendly.com/yhopping` (placeholder). Reemplazar con URL real. |
| **ANTHROPIC_API_KEY en Vercel** | Vercel → proyecto → Settings → Environment Variables. Sin esta clave el chatbot falla en producción. |

### 🟡 PRIORIDAD MEDIA

| Tarea | Detalle |
|---|---|
| Formulario de contacto — envío real de email | Actualmente muestra success sin enviar nada |
| SEO metadata dinámica por idioma | `<title>` no cambia con el toggle ES/EN |
| Academia piloto | `app/academia/` sin commitear, en desarrollo |

### 🟢 PRIORIDAD BAJA

| Tarea | Detalle |
|---|---|
| Retina logos `@2x` | `yh-logo-dark-2x` y `light-2x` disponibles, no implementados con `srcSet` aún |
| OG tags dinámicos por post EN | Posts en inglés sin Open Graph individual |
| Insights filter mobile | `sticky top-[72px]` puede solapar header levemente |

---

## SSL — Fix sin código (2 minutos)

1. vercel.com → tu proyecto → **Settings → Domains**
2. Agregar `www.yhopping.com`
3. Vercel muestra el DNS record necesario → agregarlo en tu proveedor de dominio
4. SSL se provisiona automáticamente en 5–15 min

---

## Claude Design — QA visual

Con el servidor local corriendo (`npm run dev`), en la siguiente sesión escribe:
- `"abre http://localhost:3000 y muéstrame el Hero"`
- `"navega a /insights y verifica el header"`
- `"redimensiona a 375px y prueba el Termómetro Mini"`

**QA pendiente:**

| Pantalla | Desktop | Mobile |
|---|---|---|
| Home Hero dark + logo blanco | ⬜ | ⬜ |
| Home Termómetro Mini | ⬜ | ⬜ |
| Header scroll transition (Home) | ⬜ | ⬜ |
| Header blanco en /insights | ⬜ | ⬜ |
| Header blanco en /contacto | ⬜ | ⬜ |
| /diagnostico-empresarial — quiz | ⬜ | ⬜ |
| /diagnostico-empresarial — resultados | ⬜ | ⬜ |
| Toggle ES/EN en todas las páginas | ⬜ | ⬜ |
| Footer con logo tagline | ⬜ | ⬜ |

---

## Reglas técnicas (críticas — siempre respetar)

| Regla | Detalle |
|---|---|
| **Tailwind v4 + Turbopack** | NO usar `grid`, `mx-auto`, `gap-*` como clases → `style={{}}` inline |
| **`display` responsive** | SOLO Tailwind (`hidden md:flex`, `md:hidden flex`) — nunca en `style={{display:...}}` |
| **Next.js `<Image>` src dinámico** | Nunca cambiar `src` con estado — usar `<img>` nativo + opacidad |
| **Componentes interactivos** | Siempre `"use client"` al inicio |
| **Traducciones** | Siempre en paralelo: `lib/i18n/es.ts` Y `lib/i18n/en.ts` |
| **Sidebars** | `lg:sticky lg:top-24` (nunca solo `sticky`) |
| **Colores** | `#1A1D29` Dark Navy · `#1CC5DC` Cyan · `#F1F5F9` texto claro |

---

## Para retomar

```
cd "C:\Users\jjtb_\OneDrive\Yhopping\Nuevo Yhopping Consultoria\Pagina Web\yhopping-web"
npm run dev      → http://localhost:3000
npm run build    → verificar 0 errores antes de cualquier commit
```

---

## Contexto de negocio

**Yhopping** — Dirección Financiera y Operativa Fraccional para PyMEs mexicanas ($10M–$100M MXN).  
Filosofía: "Rigor sin rigidez". Estilo McKinsey. Chatbot: "El Equipo de Yhopping".  
Pricing: Diagnóstico $15K–$35K · Proyecto $50K–$200K · Retainer $20K–$45K/mes.
