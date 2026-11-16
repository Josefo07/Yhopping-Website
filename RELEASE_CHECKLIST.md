# Publicación de Yhopping — actualización integral

Esta rama es candidata a revisión (PR #1). Vercel confirmó el despliegue de preview el 2026-11-15. Esto no acredita publicación en el dominio ni recepción real de consultas.

## Configuración en el hospedaje existente

Confirmado en panel Vercel: producción desde main; rama update/consultoria-integral genera preview.

- `RESEND_API_KEY`: clave privada del proveedor de correo, solo en variables del servidor.
- `CONTACT_FROM_EMAIL`: remitente del dominio verificado en Resend, por ejemplo `Yhopping <web@yhopping.com>` si se verifica y autoriza ese remitente.
- Destinatario fijo: `atencionaclientes@yhopping.com`.
- `ANTHROPIC_API_KEY` o `CLAUDE_API_KEY`: chatbot. No usar variables `NEXT_PUBLIC_*` para secretos.
- Configurar protección de abuso/rate limiting en el hospedaje antes de exponer el formulario a tráfico abierto. El honeypot y validación de origen no sustituyen un límite de tráfico.

Sin correo configurado, la API devuelve 503, el formulario conserva datos y ofrece el correo directo. No muestra éxito falso.

## Comprobaciones

- [x] `npm run build` — compilación y TypeScript.
- [x] `node --test tests/contact-route.test.cjs` — datos inválidos, origen, proveedor ausente, fallo y aceptación simulada.
- [x] `git diff --check`.
- [ ] Preview de la rama: móvil 375 px y escritorio, sin desbordamientos, menú, contraste y foco.
- [x] Portada español/inglés y enlace principal a contacto en navegador.
- [ ] Idiomas español e inglés en servicios, contacto y navegación completa.
- [ ] Completar ambos diagnósticos; comprobar respuestas y ruta a contacto, incluidos los casos sin clave IA.
- [ ] Confirmar chatbot activo en producción (o comunicar claramente el modo sin IA).
- [ ] Enviar consulta autorizada y confirmar recepción en buzón, no solo respuesta 200 de la API.
- [ ] Validación comercial/visual por José y publicación de la versión aprobada.
- [ ] Comprobar `yhopping.com` y `www.yhopping.com` con HTTPS y sus redirecciones.

## Límites conocidos

El preview administrado de esta sesión agrega argumentos de Vite que Next.js no acepta. Acceso a Vercel completado después de autorización explícita. Portada de escritorio ES/EN y enlace principal a contacto comprobados. Revisión móvil y flujos completos pendientes. El último despliegue documental falló con next/font/Turbopack; se cambia el build a Webpack para evitar ese procesamiento. La versión EN del diagnóstico empresarial era parcial antes de esta rama; no se presenta como traducción completa ni como una evaluación integral nueva. No se añadieron casos, testimonios ni cifras de clientes sin evidencia.

## Recuperación

Si falla la publicación, restaurar el deployment anterior en el hospedaje. La rama conserva el diff y puede revertirse sin perder el historial previo. No eliminar claves ni cambiar DNS para revertir código.

## Nueva propuesta visual y autoevaluación — 2026-11-16

Portada editorial y cuestionario único de 18 preguntas. Metodología y límites en ASSESSMENT_METHOD.md. Los diagnósticos financieros antiguos fueron sustituidos en ambas rutas; no se conserva el chatbot como mecanismo de análisis. El nuevo reporte es determinista, sin transmisión de respuestas a IA o base de datos.

- [x] 13 pruebas automatizadas de cálculo y contacto.
- [x] Build de producción con Webpack.
- [ ] Validación de diseño y cuestionario por José.
- [ ] QA visual y recorrido completo de esta versión en preview, escritorio y móvil.
- [ ] Conectar el correo antes de publicar.
