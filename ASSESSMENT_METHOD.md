# Autoevaluación empresarial Yhopping — YH-Integral-1.0

Propuesta piloto para validar con José. No constituye auditoría, diagnóstico profesional verificado ni medición estadística de riesgo. No hay muestra de validación o benchmark sectorial; los umbrales son reglas de diseño.

## Alcance

18 preguntas en seis áreas con tres preguntas por área: dirección/estrategia, finanzas/efectivo, ventas/clientes, operación/procesos, personas/responsabilidades e información/tecnología. Contexto opcional de tamaño y momento: no puntúa. Periodo de referencia: últimos tres meses, o desde el inicio si la empresa es más nueva.

Ambas rutas /diagnostico y /diagnostico-empresarial usan el mismo componente y motor. La portada dirige al cuestionario completo; desaparece el prefilling financiero previo. No se reutilizan respuestas de versiones antiguas guardadas en localStorage.

## Reglas verificables

- Opciones 0–3, de práctica ausente/ad hoc a práctica compartida, aplicada y revisada con evidencia. La pregunta de efectivo tiene anclajes específicos.
- «No lo sé» = null: no es cero ni se sustituye por un valor promedio. Una pregunta sin responder impide avanzar; desconocido permite avanzar y queda visible.
- Área = suma de valores conocidos / (número de conocidos × 3) × 100. Se requieren dos de tres conocidos.
- Global = promedio de seis puntuaciones de área. Solo se calcula con al menos 15/18 conocidas y dos conocidas en cada área. Cifras redondeadas; mismo peso por área.
- Cobertura = conocidas / 18 × 100. No se presenta como confianza, precisión o representatividad.
- Etiquetas: <40 por estructurar; 40–69 en desarrollo; >=70 más consistentes. Nunca se etiqueta a la empresa como insolvente o libre de problemas por el índice.
- Hasta tres prioridades entre áreas calculadas bajo 70. Orden ascendente por puntuación, excepto que efectivo=0 tiene precedencia. Cada prioridad muestra la respuesta más baja que la origina y su primera acción sugerida/evidencia a revisar.
- Efectivo=0 siempre genera aviso visible de revisión de planeación, aunque la calificación global sea alta o el área no sea calculable.
- Desconocidos se muestran por separado, sin esconderlos detrás de un promedio alto.
- Cruces de respuestas son hipótesis de revisión: delegación+roles, margen+validación comercial, traspasos+fuentes de información. Solo aparecen si ambos valores son conocidos y <=1. No se afirman causas raíz.
- Áreas >=70 se muestran como prácticas declaradas a conservar y contrastar, no fortalezas comprobadas.

## Resultados y datos

Resultados calculados de manera determinista sin llamadas a IA. Incluyen mapa por área, cobertura, prioridades, hipótesis condicionadas, información por verificar, metodología y las 18 respuestas. Impresión permite guardar un PDF desde el navegador del visitante.

No requiere registro. Las respuestas y el contexto permanecen en memoria de la página; recargar los borra. No se envían a una IA ni se guardan en una base de datos. El contacto es una acción posterior y separada; no se transmite el reporte automáticamente.

## Fuentes metodológicas y límites

Referencias generales para transparentar pesos, agregación y datos faltantes, no para validar este instrumento ni sus preguntas:
- OECD/EU/JRC (2008), Handbook on Constructing Composite Indicators, https://doi.org/10.1787/9789264043466-en
- Comisión Europea, Step 3: Imputation of missing data, https://knowledge-for-policy.ec.europa.eu/composite-indicators/toolkit_en/navigation-page/10-step-guide_en/step-3-imputation-missing-data_en

Antes de afirmar validez: revisar contenido con empresarios de distintos tamaños/sectores, contrastar autodeclaraciones con evidencia, registrar ambigüedades y estudiar sensibilidad de pesos/umbrales. Versionar cambios; no comparar automáticamente puntuaciones de instrumentos distintos.

## Validación técnica

`node --test tests/assessment.test.cjs tests/contact-route.test.cjs` comprueba extremos, faltantes, cobertura mínima, alertas independientes del promedio, trazabilidad, cruces y las 64 combinaciones de tres respuestas conocidas. No acredita validez estadística.
