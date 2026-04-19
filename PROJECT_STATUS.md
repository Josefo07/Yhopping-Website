# PROJECT STATUS — Yhopping Web
_Última actualización: 2026-04-19_

---

## Estado general: 🟢 Deploy activo — QA visual pendiente

Último commit `8465a4b` pusheado a `main`. Vercel despliega automáticamente desde GitHub.  
Build local: 24 páginas estáticas, 0 errores TypeScript.

---

## Historial de commits recientes

| Hash | Descripción |
|---|---|
| `3ea1e0c` | feat: update brand identity — logos, favicons, OG, manifest ← **ÚLTIMO** |
| `8465a4b` | feat: dark hero, Termómetro Mini, H1, /diagnostico-empresarial |
| `a76181c` | docs: PROJECT_STATUS + Claude Design guide |
| `edd95e2` | feat: ES/EN bilingual support across all pages |

---

## Arquitectura actual de rutas

```
/                          — Home: Hero dark + Problemas + Termómetro Mini + Servicios + Por Qué + CTA
/servicios                 — 4 servicios con sidebar
/contacto                  — Formulario de contacto
/insights                  — Blog listing bilingüe
/insights/[slug]           — Post individual
/diagnostico               — Diagnóstico completo original (10 preguntas + chat)
/diagnostico-empresarial   — Flujo premium: lee prefill del Termómetro Mini → quiz corto → chat → resultados
/academia/piloto           — En desarrollo (no publicado)
/api/chat                  — Proxy a Anthropic API para chatbot
/api/academia              — En desarrollo
```

---

## Cambios completados en esta sesión ✅

### 1. Hero — Dark Navy "Serie Noir"
- Fondo: `#1A1D29` (Dark Navy)
- Eliminado: gradiente azul/cyan
- Agregado: glow cyan top-right, glow azul bottom-left, grid lines 60×60px
- Badge: fondo cyan 10% opacity, borde cyan 25%
- CTAs: Primario en `#1CC5DC` (cyan sólido), Secundario en borde blanco 35%
- Todos los CTAs del Home apuntan a `/diagnostico-empresarial`

### 2. Termómetro Financiero PyME (mini-quiz en Home)
- 3 preguntas clave: flujo de caja, margen de utilidad, crecimiento vs utilidades
- Diseño dark navy consistente con el Hero
- Barra de progreso animada (gradient azul→cyan)
- Bilingüe: usa el mismo `useLanguage()` context
- Al completar: guarda respuestas en `localStorage["yh_mini_answers"]`
- Redirige a `/diagnostico-empresarial`

### 3. Nueva ruta `/diagnostico-empresarial`
- Lee prefill del Termómetro Mini al cargar
- Quiz completo (5 preguntas complementarias)
- Pantalla "Analizando…" con barra de progreso
- Chat con Consultor Virtual (misma API `/api/chat`)
- Pantalla de resultados con:
  - Score circular SVG animado
  - 3 métricas con barras de color
  - **CTA P1:** "Solicitar Diagnóstico de 90 min" → Calendly (cyan `#1CC5DC`)
  - **CTA P2:** "Hablar con el Consultor Virtual" → chat
  - **CTA P3:** "Contactar por WhatsApp" → wa.me

### 4. H1 actualizado (bilingüe)
- **ES:** "Estabilizamos tu operación y maximizamos tu rentabilidad: Dirección Financiera y Operativa Fraccional para PyMES en crecimiento."
- **EN:** "We stabilize your operations and maximize your profitability: Fractional Financial & Operational Management for growing SMBs."
- Badge ES: "Dirección Financiera y Operativa Fraccional · PyMEs México"

### 5. System Prompt actualizado
- Eliminado: "JJ Torres, Founder de Yhopping" (ES y EN)
- Reemplazado por: "El Equipo de Yhopping" (ES) / "The Yhopping Team" (EN)

---

## Identidad de marca — archivos disponibles en el proyecto

| Archivo en `public/images/` | Uso |
|---|---|
| `yh-logo-dark.png` (520×120) | Logo sobre fondos oscuros (Diagnóstico, hero) |
| `yh-logo-light.png` (520×120) | Logo sobre fondos blancos (Header scrolled) |
| `yh-logo-dark-2x.png` (1040×240) | Versión retina dark |
| `yh-logo-light-2x.png` (1040×240) | Versión retina light |
| `yh-logo-tagline-dark.png` (520×148) | Logo + "Potenciando Empresas" (Footer) |
| `yh-logo-tagline-light.png` (520×148) | Logo + tagline sobre fondo claro |
| `yh-favicon-16.png` / `32.png` / `48.png` | Tabs del navegador |
| `yh-apple-180.png` | iOS home screen |
| `yh-android-192.png` / `512.png` | Android / PWA |
| `yh-og-image.png` (1200×630) | Open Graph — previsualización al compartir en redes |

Archivos fuera del proyecto (en Identidad de Marca, solo para uso externo):
- `email-signature-*.png`, `linkedin-banner-*.png`, `linkedin-logo-*.png`

---

## ⚠️ Pendiente — próxima sesión

### PRIORIDAD ALTA

| Tarea | Detalle |
|---|---|
| **SSL www.yhopping.com** | `ERR_SSL_PROTOCOL_ERROR` en el subdominio `www`. Fix: Vercel → Settings → Domains → agregar `www.yhopping.com` explícitamente. Vercel genera SSL automáticamente al agregarlo. |
| **Verificar ANTHROPIC_API_KEY en Vercel** | Vercel → tu proyecto → Settings → Environment Variables. Sin esta variable el chatbot falla. |
| **QA visual con Claude Design** | Ver instrucciones abajo |

### PRIORIDAD MEDIA

| Tarea | Detalle |
|---|---|
| Formulario de contacto — envío real | Actualmente muestra success sin enviar email |
| SEO metadata dinámica por idioma | `<title>` y meta description no cambian con el idioma |
| Calendly URL real en `/diagnostico-empresarial` | Actualmente apunta a `https://calendly.com/yhopping` (placeholder) |
| Academia piloto | `app/academia/` sin commitear, en desarrollo |

### PRIORIDAD BAJA

| Tarea | Detalle |
|---|---|
| Insights filter mobile overlap | `sticky top-[72px]` puede solapar el header — funcional |
| OG tags para posts EN | Open Graph no configurado para posts en inglés |

---

## SSL — Fix inmediato (sin código)

**Problema:** `www.yhopping.com` → `ERR_SSL_PROTOCOL_ERROR`

**Causa:** El subdominio `www` no está registrado en Vercel como dominio válido. Vercel solo genera SSL para los dominios que conoce explícitamente.

**Fix (2 minutos en el dashboard de Vercel):**
1. Entra a vercel.com → tu proyecto Yhopping
2. Settings → Domains
3. Agrega `www.yhopping.com` como dominio
4. Vercel mostrará el registro DNS necesario (CNAME o A record)
5. Agrégalo en tu panel de DNS (donde compraste el dominio)
6. En 5-15 min el SSL se provisiona automáticamente

---

## Claude Design — Cómo usarlo para QA visual

Claude Design permite ver screenshots del sitio, hacer clicks y validar layouts sin abrir Chrome manualmente.

**Para activarlo:**
1. Corre el servidor local:
   ```
   cd "C:\Users\jjtb_\OneDrive\Yhopping\Nuevo Yhopping Consultoria\Pagina Web\yhopping-web"
   npm run dev
   ```
2. En la siguiente sesión con Claude Code, escribe:
   - `"abre http://localhost:3000 y muéstrame el Hero"`
   - `"navega a /diagnostico-empresarial y haz click en la primera opción del quiz"`
   - `"redimensiona a 375px y verifica el Termómetro en mobile"`
3. Claude tomará screenshots en tiempo real y podrá hacer cambios inmediatos.

**QA checklist para hacer con Claude Design:**

| Pantalla | Desktop | Mobile (375px) |
|---|---|---|
| Home — Hero dark | ⬜ | ⬜ |
| Home — Termómetro Mini ES | ⬜ | ⬜ |
| Home — Termómetro Mini EN | ⬜ | ⬜ |
| /diagnostico-empresarial — quiz | ⬜ | ⬜ |
| /diagnostico-empresarial — resultados | ⬜ | ⬜ |
| /diagnostico-empresarial — chat | ⬜ | ⬜ |
| Header toggle ES/EN | ⬜ | ⬜ |
| /servicios sidebar | ⬜ | ⬜ |
| /contacto sidebar | ⬜ | ⬜ |

---

## Reglas técnicas clave (siempre respetar)

| Regla | Detalle |
|---|---|
| **Tailwind v4 + Turbopack bug** | NO usar `grid`, `mx-auto`, `gap-*` como clases CSS → usar `style={{}}` inline |
| **Todos los componentes interactivos** | Requieren `"use client"` al inicio del archivo |
| **Nuevas traducciones** | Siempre en paralelo: `lib/i18n/es.ts` Y `lib/i18n/en.ts` |
| **Sidebars** | Usar `lg:sticky lg:top-24` (nunca solo `sticky top-24`) |
| **Colores Dark** | `#1A1D29` = Dark Navy · `#1CC5DC` = Cyan · `#F1F5F9` = texto claro |

---

## Para retomar el trabajo

1. Abre: `C:\Users\jjtb_\OneDrive\Yhopping\Nuevo Yhopping Consultoria\Pagina Web\yhopping-web`
2. `npm run dev` → http://localhost:3000
3. Antes de cualquier cambio: `npm run build` para verificar 0 errores
4. Primer paso: **Fix SSL www** en el dashboard de Vercel

---

## Contexto de negocio

**Yhopping Consultoria** — Dirección Financiera y Operativa Fraccional para PyMEs mexicanas ($10M–$100M MXN).  
Filosofía: "Rigor sin rigidez". Estilo: McKinsey.  
Pricing: Diagnóstico $15K–$35K · Proyecto $50K–$200K · Retainer $20K–$45K/mes.  
Chatbot: El Equipo de Yhopping (no nombre individual).
