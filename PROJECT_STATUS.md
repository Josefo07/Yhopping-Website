# PROJECT STATUS — Yhopping Web
_Última actualización: 2026-04-18_

---

## Estado general: 🟡 Cambios listos, pendiente commit + QA visual

El build de producción **pasa limpio** (`npm run build` — 21 páginas estáticas, 0 errores TypeScript).  
Los cambios están en el working tree pero **NO han sido commiteados ni pusheados** a GitHub.

---

## Qué se completó en esta sesión

### ✅ Internacionalización ES/EN (i18n)
Sistema completo de traducciones implementado con React Context:

- `lib/i18n/types.ts` — Interface `Translations` + tipo `Lang`
- `lib/i18n/es.ts` — Todas las traducciones en español
- `lib/i18n/en.ts` — Todas las traducciones en inglés
- `lib/i18n/LanguageContext.tsx` — Provider + hook `useLanguage()`
- `app/layout.tsx` — Envuelto en `<LanguageProvider>`

### ✅ Header con toggle ES/EN
- Componente `<LangToggle />` en desktop (entre nav y CTA) y mobile (junto al hamburger)
- Estilo: pill con gradiente azul para activo, gris para inactivo

### ✅ Footer bilingüe
- Convertido a client component
- Todos los textos desde `t.footer.*`

### ✅ Home traducido
- Todas las secciones: Hero, Problemas, Servicios, Por Qué, CTA Final
- Textos desde `t.home.*`

### ✅ Servicios traducido
- Iteración sobre `t.services.items` array
- Fix mobile: sidebar `lg:sticky lg:top-24`

### ✅ Contacto traducido
- Todos los labels, validaciones y placeholders desde `t.contact.*`
- Fix mobile: sidebar `lg:sticky lg:top-24`

### ✅ Blog / Insights bilingüe
- Campo `lang: "es" | "en"` en interface `Post`
- 6 posts en español + 6 posts nuevos en inglés
- `getPostsByLang(lang)` para filtrar por idioma
- Página listing adapta filtros de categoría por idioma
- Página de post individual adapta textos de navegación

### ✅ Diagnóstico — selección de idioma del chatbot
- Nueva pantalla `"lang"` antes del quiz con banderas 🇲🇽 / 🇺🇸
- Estado `chatLang: "es" | "en"`
- `buildSystemPrompt(scores, lang)` con versión completa en inglés
- `buildFirstMessage(scores, lang)` en inglés cuando corresponde

---

## ⚠️ Pendiente — DEBE hacerse antes del próximo deploy

### 1. Commit + Push a GitHub
```bash
cd "C:\Users\jjtb_\OneDrive\Yhopping\Nuevo Yhopping Consultoria\Pagina Web\yhopping-web"

git add app/contacto/page.tsx app/diagnostico/page.tsx app/insights/[slug]/page.tsx app/insights/page.tsx app/layout.tsx app/page.tsx app/servicios/page.tsx components/layout/Footer.tsx components/layout/Header.tsx lib/posts.ts lib/i18n/

git commit -m "feat: add ES/EN bilingual support with language toggle and bilingual blog posts"

git push origin main
```

### 2. QA Visual (NO se ha hecho ninguna revisión visual)
Verificar en el browser después del deploy:

| Página | ES | EN | Mobile |
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

### 3. Verificar variables de entorno en Vercel
Confirmar que `ANTHROPIC_API_KEY` está configurada en el dashboard de Vercel.  
Sin esta variable, el chatbot del diagnóstico fallará en producción.

---

## Backlog — Mejoras opcionales

| Tarea | Prioridad | Notas |
|---|---|---|
| Insights filter — `sticky top-[72px]` overlap en mobile | Baja | Funcional, solo estético |
| Agregar más posts en EN | Media | Ya hay 6, se pueden agregar más en `lib/posts.ts` |
| SEO metadata por idioma | Media | Actualmente los `<title>` son estáticos, no cambian con el idioma |
| Open Graph tags para posts EN | Baja | Posts EN no tienen OG image configurada |
| Formulario de contacto — integración real | Alta (pendiente desde antes) | Actualmente solo muestra success sin enviar email |
| Academia piloto — completar features | Media | Existe `app/academia/piloto/` y `app/api/academia/` |

---

## Archivos con cambios pendientes de commit

```
modified:   app/contacto/page.tsx
modified:   app/diagnostico/page.tsx
modified:   app/insights/[slug]/page.tsx
modified:   app/insights/page.tsx
modified:   app/layout.tsx
modified:   app/page.tsx
modified:   app/servicios/page.tsx
modified:   components/layout/Footer.tsx
modified:   components/layout/Header.tsx
modified:   lib/posts.ts
untracked:  lib/i18n/          (LanguageContext.tsx, types.ts, es.ts, en.ts, es-academia.ts, en-academia.ts)
untracked:  app/academia/      (en desarrollo separado)
untracked:  app/api/academia/  (en desarrollo separado)
```

---

## Contexto de negocio

**Yhopping Consultoria** — consultoría financiera y operativa para PyMEs mexicanas.  
Dueño: JJ (consultor individual, también trabaja en CENTRIC).  
Objetivo del sitio: captar leads para servicios de CFO Fraccional, flujo de caja, automatización Office 365, y diagnóstico financiero.  
Pricing MXN: Diagnóstico $15K-$35K · Proyecto $50K-$200K · Retainer $20K-$45K/mes.

---

## Para retomar el trabajo

1. Abre el proyecto en VS Code desde `C:\Users\jjtb_\OneDrive\Yhopping\Nuevo Yhopping Consultoria\Pagina Web\yhopping-web`
2. Corre `npm run dev` para el servidor local
3. El próximo paso inmediato es **hacer el commit y push** (ver sección arriba)
4. Luego hacer QA visual abriendo `http://localhost:3000` en Chrome
