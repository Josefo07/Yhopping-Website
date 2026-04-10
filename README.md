# Yhopping Website MVP

Sitio profesional Next.js para consultoría financiera y operativa de PyMEs mexicanas.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — paleta Yhopping configurada en `app/globals.css`
- **React Hook Form** — formulario de contacto validado
- **Lucide React** — iconografía
- **Claude API** (Anthropic) — análisis IA en cuestionario de diagnóstico

## Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Homepage — Hero, Problemas, Servicios, Por qué Yhopping, CTA |
| `/servicios` | 4 servicios con sidebar de precios |
| `/insights` | Grid de 6 posts con filtros por categoría |
| `/insights/[slug]` | Post individual completo |
| `/diagnostico` | Cuestionario 8 preguntas + análisis IA + cotización |
| `/contacto` | Formulario React Hook Form + info de contacto |

## Setup Local

```bash
npm install
npm run dev
```

Visita [http://localhost:3000](http://localhost:3000)

## Variables de entorno

Crea `.env.local` basado en `.env.local.example`:

```env
NEXT_PUBLIC_CLAUDE_API_KEY=sk-ant-...
NEXT_PUBLIC_WA_NUMBER=5215564535862
NEXT_PUBLIC_CALENDLY_LINK=https://calendly.com/yhopping
```

> En el cuestionario, la API key también se configura tocando 3 veces el ícono ⚙️.

## Build

```bash
npm run build
npm start
```

## Deploy en Vercel

1. Sube a GitHub
2. Importar en [vercel.com](https://vercel.com)
3. Configurar variables de entorno en el dashboard
4. Deploy automático en cada push
