# Publicación de Yhopping — actualización integral

Esta rama es candidata a revisión; no acredita publicación ni recepción real de consultas.

## Configuración en el hospedaje existente

El repo documenta Vercel y auto-deploy desde main; confirmar la integración actual antes de integrar la rama.

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
- [ ] Idiomas español e inglés en inicio, servicios, contacto y navegación.
- [ ] Completar ambos diagnósticos; comprobar respuestas y ruta a contacto, incluidos los casos sin clave IA.
- [ ] Confirmar chatbot activo en producción (o comunicar claramente el modo sin IA).
- [ ] Enviar consulta autorizada y confirmar recepción en buzón, no solo respuesta 200 de la API.
- [ ] Validación comercial/visual por José y publicación de la versión aprobada.
- [ ] Comprobar `yhopping.com` y `www.yhopping.com` con HTTPS y sus redirecciones.

## Límites conocidos

El preview administrado de esta sesión agrega argumentos de Vite que Next.js no acepta. No se completó QA de navegador. La versión EN del diagnóstico empresarial era parcial antes de esta rama; no se presenta como traducción completa ni como una evaluación integral nueva. No se añadieron casos, testimonios ni cifras de clientes sin evidencia.

## Recuperación

Si falla la publicación, restaurar el deployment anterior en el hospedaje. La rama conserva el diff y puede revertirse sin perder el historial previo. No eliminar claves ni cambiar DNS para revertir código.
