# Sección 11 · Decisiones y Registro de Solicitudes de Cambio

Esta sección registra las decisiones que cambian el plan del proyecto. Se completa durante los Sprints y se cierra con la entrega del 25 de noviembre. Cada decisión tiene su entrada en el [historial de cambios](historial-de-cambios.md).

| ID | Fecha | Decisión | Motivo | Impacto | Quién decidió |
|---|---|---|---|---|---|
| D-01 | 11/11/2026 | **Replanificar el ciclo de vida.** Las semanas 3 a 8 se reconocen como un Sprint 0 de inicio y planificación. La construcción se hace en 2 Sprints de 2 semanas (Sprint 1: 9–22 nov; Sprint 2: 23 nov – 6 dic) y la Semana 13 es de cierre. | Durante las semanas 4 a 8 el equipo priorizó completar el Expediente y no se construyó código, así que el plan original de 5 Sprints ya no era realista. La fecha de cierre no se puede mover. | Se ajustan las Secciones 02, 03, 04 y 05. La velocidad real de los Sprints originales 1 y 2 fue 0. Se recorta el alcance (D-02). | Equipo (PO y SM) |
| D-02 | 11/11/2026 | **El incremento final será un prototipo funcional de demostración:** React + Vite, datos simulados en el navegador (sin servidor), videollamada incrustada con Jitsi (JaaS) y publicación en Vercel. Alcance comprometido: 37 puntos (HU-01, HU-03, HU-04, HU-05, SP-01, HU-06, HU-07, HU-08, HU-11). | Con 2 Sprints y una velocidad estimada de 13 a 21 puntos, solo cabe la parte central del producto. Un servidor y una base de datos reales no caben en ese tiempo. | La asistencia en tiempo real (HU-15 a HU-19), la IA (HU-21) y otras historias pasan a trabajo futuro. Cambian criterios de aceptación de HU-01 y HU-10 y las responsabilidades de Dylan. | Equipo (PO y SM) |
| D-03 | 11/11/2026 | **El tablero se lleva en Trello** en lugar de GitHub Projects. | El equipo ya conoce Trello y el curso lo acepta como herramienta (Semana 7). | Se actualizan las Secciones 05 y 10. | Scrum Master |
| D-04 | 11/11/2026 | **Nuevo Product Goal:** prototipo web accesible para agendar una cita con un intérprete de LESCO certificado y realizarla por videollamada. | Consecuencia de D-01 y D-02: el Product Goal debe reflejar lo que de verdad se va a entregar. | Se actualiza la Sección 01; el Product Goal original queda como registro. | Product Owner |
| D-05 | 23/11/2026 | **La videollamada se hace con meet.jit.si incrustado** (resultado de SP-01). JaaS queda como alternativa futura. | En la prueba real en Vercel la llamada incrustada conectó entre computadora y celular, también con datos móviles, y se cortó a los 5 minutos, como se esperaba del servidor público. Para una demo corta el corte no estorba, y meet.jit.si no pide cuenta ni configuración. | HU-11 reutiliza el código de SP-01. Si la demo pasa de 5 minutos, se usa el botón "Abrir en otra pestaña". Riesgo R-02 baja. | Product Owner |
| D-06 | 23/11/2026 | **Ajuste de fechas de los Sprints:** Sprint 1 del 9 al 19 de noviembre y Sprint 2 del 20 al 25 de noviembre. Los 5 ítems del Sprint 1 se arrastran al Sprint 2. | La entrega final se adelantó al 25 de noviembre (CR-05) y el equipo empezó el Sprint 2 el viernes 20. Al 19 de noviembre ningún ítem cumplía la DoD. | Velocidad real del Sprint 1: 0 puntos (SPI = 0). Los 18 puntos se terminaron en el Sprint 2 (22 y 23 nov). Se actualizan las Secciones 02, 04, 05, 07, 08 y 10. | Equipo (PO y SM) |

## Registro de Solicitudes de Cambio

### Flujo de un cambio

1. **Solicitud.** Cualquier integrante o interesado puede pedir un cambio (por chat, en clase o en una Sprint Review). Quien lo recibe lo anota aquí con un ID nuevo (CR-xx).
2. **Evaluación.** El equipo estima su impacto en alcance (puntos), tiempo (Sprints), costo (horas) y riesgo, en el siguiente Sprint Planning o en una llamada de refinamiento.
3. **Decisión.** La Product Owner decide: **aprobado** (y en qué Sprint entra), **diferido** (a trabajo futuro) o **rechazado**, con su justificación. Si afecta el proceso, decide el Scrum Master (WA-08). Durante un Sprint, un cambio solo entra si sale algo de igual tamaño (WA-10).
4. **Registro y comunicación.** Se completa la fila, se actualizan el Excel y Trello, y el resultado se informa en la siguiente Sprint Review.

### Registro

| ID | Fecha | Solicitante | Descripción | Impacto (alcance · tiempo · costo · riesgo) | Decisión y justificación | Responsable | Sprint en que entra |
|---|---|---|---|---|---|---|---|
| CR-01 | 11/11/2026 | Dylan (Scrum Master) | Replanificar: dejar los 5 Sprints originales y construir en 2 Sprints, con un prototipo sin servidor de 37 puntos. | Alcance: de 85 a 37 puntos comprometidos (9 opcionales, 39 a trabajo futuro). Tiempo: la fecha de cierre no cambia. Costo: ₡0 en dinero; el esfuerzo del release queda en 2 Sprints (Sección 07). Riesgo: R-01 baja de 9 a 4. | **Aprobado.** Con las semanas 4 a 8 sin código, el plan original no cabía antes de la Semana 13 (D-01, D-02, D-04). | Emily (PO) | Sprint 1 |
| CR-02 | 11/11/2026 | Dylan (Scrum Master) | Llevar el tablero en Trello en lugar de GitHub Projects. | Alcance: 0 puntos. Tiempo y costo: sin cambio (plan gratuito). Riesgo: bajo. | **Aprobado.** El equipo ya conoce Trello y el curso lo acepta (D-03). | Dylan (SM) | Sprint 1 |
| CR-03 | 11/11/2026 | Equipo | Sacar HU-02 (verificación del intérprete) del Sprint 1 y dejarla como primer opcional. | Alcance: −3 puntos en el Sprint 1. Riesgo: en la demo no se verifica la certificación; se mitiga con intérpretes de prueba ya marcados como verificados. | **Aprobado.** El Sprint 1 debía caber en la velocidad mínima estimada (13 puntos). | Emily (PO) | Opcional del Sprint 2 |
| CR-04 | 13/11/2026 | Emily (PO) | Quitar los emojis de la interfaz y usar íconos de línea propios, siempre con texto. | Alcance: 0 puntos (dentro de HU-04). Tiempo: menos de 1 hora. Riesgo: ninguno; mejora la consistencia visual y la lectura con lector de pantalla. | **Aprobado.** No pone en riesgo el Sprint Goal. | Emily (PO) | Sprint 1 |
| CR-05 | 22/11/2026 | Docente del curso | La entrega final del proyecto pasa de la Semana 13 al miércoles 25 de noviembre (Semana 11). | Alcance: los 37 puntos se mantienen, con el orden de recorte (sin opcionales, HU-08 simple). Tiempo: el Sprint 2 pasa de 2 semanas a 6 días. Costo: menos horas disponibles. Riesgo: R-01 sube. | **Aceptado** (fecha del curso, no negociable). | Emily (PO) | Sprint 2 |
| CR-06 | 23/11/2026 | Emily (PO) | Registrar las fechas reales: Sprint 1 del 9 al 19 de noviembre y Sprint 2 del 20 al 25 de noviembre; los ítems del Sprint 1 sin terminar pasan al Sprint 2. | Alcance: 18 puntos arrastrados al Sprint 2. Tiempo: sin cambio en la entrega. Costo: 0. Riesgo: el Sprint 2 carga 37 puntos en 6 días. | **Aprobado** (D-06). | Emily (PO) | Sprint 2 |
| CR-07 | 23/11/2026 | Equipo | Quitar MIT-04 (probar la llamada en la red del aula) y hacer MIT-03 en versión mínima (grabación de pantalla de unos 3 minutos, sin editar). | Alcance: 0 puntos (son acciones de riesgo). Tiempo: libera unas 2 horas para HU-06 a HU-11. Riesgo: R-11 pasa de Mitigar a Aceptar; plan B: datos móviles como punto de acceso, "Abrir en otra pestaña" o el video de MIT-03. | **Aprobado.** La llamada ya funcionó con datos móviles el 23/11 y el tiempo del Sprint 2 se necesita para las historias. | Emily (PO) | Sprint 2 |

## Pendiente de registrar en los Sprints

- Velocidad real del Sprint 2: 37 puntos (registrada el 24/11 en la Sección 07 y en el Acta del Sprint 2).
- Cambios de alcance que se decidan en cada Sprint Planning.
