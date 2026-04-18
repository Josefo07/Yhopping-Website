# PROJECT STATUS — Yhopping Web
_Última actualización: 2026-04-18_

---

## Estado general: 🟢 Deploy en curso — pendiente QA visual

Commit `edd95e2` pusheado a `main`. Vercel está generando el deploy automáticamente.  
Build local pasa limpio: 21 páginas estáticas, 0 errores TypeScript.

---

## Historial de commits recientes

| Hash | Descripción |
|---|---|
| `edd95e2` | feat: add ES/EN bilingual support across all pages ← **ESTE** |
| `12bb48f` | feat: upgrade diagnostic chat with McKinsey consulting methodology |
| `a2edfc7` | fix: revert to claude-haiku-4-5 (Claude 3 deprecated in 2026) |

---

## Qué se completó ✅

### Internacionalización ES/EN (i18n)
Sistema completo de traducciones con React Context:

- `lib/i18n/types.ts` — Interface `Translations` + tipo `Lang`
- `lib/i18n/es.ts` — Todas las traducciones en español
- `lib/i18n/en.ts` — Todas las traducciones en inglés
- `lib/i18n/LanguageContext.tsx` — Provider + hook `useLanguage()`
- `lib/i18n/es-academia.ts` / `en-academia.ts` — Traducciones sección Academia
- `app/layout.tsx` — Envuelto en `<LanguageProvider>`

### Páginas traducidas
- ✅ **Home** — Hero, Problemas, Servicios, Por Qué, CTA Final
- ✅ **Servicios** — 4 servicios completos con sidebar info + fix mobile sticky
- ✅ **Contacto** — Formulario, validaciones, sidebar + fix mobile sticky
- ✅ **Insights** — Listing con filtros adaptativos por idioma
- ✅ **Post individual** — Textos de navegación y CTA adaptativos
- ✅ **Diagnóstico** — Pantalla de selección de idioma antes del quiz, chatbot bilingüe

### Header / Footer
- ✅ Toggle ES/EN en Header (desktop + mobile)
- ✅ Footer convertido a client component, textos desde traducciones

### Blog bilingüe
- ✅ 6 posts en español
- ✅ 6 posts nuevos en inglés (slugs: `coo-without-finance-skills`, `ai-in-finance-hype-to-real-cash`, `grow-without-burning-your-team`, `the-company-you-treat-as-your-own`, `decisions-no-one-sees`, `vision-vs-validation`)
- ✅ `getPostsByLang(lang)` para filtrar por idioma

### Documentación
- ✅ `CLAUDE.md` — Guía completa del proyecto para Claude
- ✅ `PROJECT_STATUS.md` — Este archivo

---

## ⚠️ Pendiente

### 1. QA Visual — NO se ha hecho ninguna revisión visual
Verificar en producción (https://yhopping.com o URL de Vercel) una vez que el deploy termine:

| Página | ES ✓ | EN ✓ | Mobile ✓ |
|---|---|---|---|
| Home | ⬜ | ⬜ | ⬜ |
| Servicios | ⬜ | ⬜ | ⬜ |
| Contacto | ⬜ | ⬜ | ⬜ |
| Insights | ⬜ | ⬜ | ⬜ |
| Post individual | ⬜ | ⬜ | ⬜ |
| Diagnóstico — pantalla lang | ⬜ | ⬜ | ⬜ |
| Diagnóstico — quiz en EN | ⬜ | ⬜ | ⬜ |
| Header toggle | ⬜ | ⬜ | ⬜ |
| Footer | ⬜ | ⬜ | ⬜ |

### 2. Verificar ANTHROPIC_API_KEY en Vercel
- Dashboard Vercel → Settings → Environment Variables
- Sin esta variable el chatbot falla en producción
- Variable aceptada: `ANTHROPIC_API_KEY` o `CLAUDE_API_KEY`

---

## Backlog — Mejoras opcionales

| Tarea | Prioridad | Notas |
|---|---|---|
| Formulario de contacto — envío real de email | Alta | Actualmente muestra success sin enviar nada |
| Academia piloto — completar features | Media | Existe `app/academia/piloto/` y `app/api/academia/` (sin commitear) |
| SEO metadata dinámica por idioma | Media | `<title>` y meta description no cambian con el idioma |
| Agregar más posts en EN | Media | Agregar en `lib/posts.ts` siguiendo el patrón existente |
| Open Graph tags para posts EN | Baja | Posts EN no tienen OG image configurada |
| Insights filter overlap en mobile | Baja | `sticky top-[72px]` puede solapar el header; funcional pero estético |

---

## Archivos fuera del commit (no commiteados intencionalmente)

```
app/academia/       — En desarrollo, no está listo para producción
app/api/academia/   — En desarrollo
package.json        — Cambios menores sin impacto
package-lock.json   — Cambios menores sin impacto
```

---

## Contexto de negocio

**Yhopping Consultoria** — consultoría financiera y operativa para PyMEs mexicanas.  
Dueño: JJ (consultor individual, también trabaja en CENTRIC).  
Objetivo del sitio: captar leads para servicios de CFO Fraccional, flujo de caja, automatización Office 365, y diagnóstico financiero.  
Pricing MXN: Diagnóstico $15K-$35K · Proyecto $50K-$200K · Retainer $20K-$45K/mes.

---

## Para retomar el trabajo

1. Abre el proyecto en VS Code: `C:\Users\jjtb_\OneDrive\Yhopping\Nuevo Yhopping Consultoria\Pagina Web\yhopping-web`
2. Corre `npm run dev` → `http://localhost:3000`
3. Antes de cualquier cambio, verificar con `npm run build` que no haya errores
4. **Regla crítica Tailwind v4:** NO usar `grid`, `mx-auto`, `gap-*` como clases — usar `style={{}}` inline
5. Agregar nuevas traducciones en `lib/i18n/es.ts` Y `lib/i18n/en.ts` (siempre en paralelo)
