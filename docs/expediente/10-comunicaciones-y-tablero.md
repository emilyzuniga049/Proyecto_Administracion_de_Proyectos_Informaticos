# Sección 10 · Plan de Comunicaciones y Tablero de Trabajo

## 10.1 Plan de Comunicaciones

En esta fase no hay un cliente formal; el **docente** cumple el papel de patrocinador y evaluador. Los interesados y su poder e interés vienen de la [Sección 03](03-interesados.md).

| Interesado | Poder / Interés | Qué información necesita | Frecuencia y evento | Canal | Responsable |
|---|---|---|---|---|---|
| **Docente del curso** | 5 / 4 | Avance del Expediente, Incremento de cada Sprint, cambios de alcance y riesgos altos | Cada clase (entrega de la sección), Sprint Review (22 nov y 6 dic), entrega final (Semana 13) | Clase presencial, campus virtual y repositorio de GitHub | Dylan |
| **Equipo (Emily y Dylan)** | 4 / 5 | Qué hizo cada uno, qué sigue, impedimentos | Daily de 10 minutos en cada día de trabajo; Sprint Planning, Review y Retrospectiva | Videollamada y WhatsApp; Trello para el estado de las tareas | Dylan |
| **Personas sordas usuarias** | 4 / 5 | El Incremento para probar, en lenguaje sencillo y con apoyo visual | Al final de cada Sprint (validación del Incremento) | Videollamada o presencial; mensajes de texto (nunca solo audio) | Emily |
| **Intérpretes de LESCO** | 4 / 4 | El formulario de disponibilidad (Sprint 1) y el recorrido de cita y llamada (Sprint 2) | Una vez por Sprint, antes de la Review | Correo o WhatsApp para coordinar; videollamada para la prueba | Emily |
| **Asociaciones de personas sordas** | 3 / 4 | Resumen del proyecto e invitación a validar | Una vez al inicio del Sprint 1 y otra al cierre | Correo | Emily |
| **Funcionarios de instituciones y comercios** | 2 / 4 | Cómo usar la plataforma para atender a una persona sorda | Al cierre (la guía rápida HU-19 queda como trabajo futuro) | Documento o enlace | Emily |
| **CONAPDIS** | 4 / 2 | Que la plataforma cumple la accesibilidad (Ley 7600) | Al cierre; no se contacta durante el proyecto académico | Evidencias de accesibilidad en el Expediente | Dylan |
| **PRODHAB** | 5 / 1 | Que se cumple la Ley 8968 | Al cierre; no se contacta durante el proyecto académico | Aviso de privacidad y uso de datos ficticios documentados en el Expediente | Dylan |

### Reglas del equipo

- **Tiempo de respuesta:** los mensajes del proyecto en WhatsApp se responden en menos de 12 horas en días de trabajo.
- **Dónde se decide qué:**
  - El **alcance** (qué entra o sale del Sprint) solo se decide en el Sprint Planning o con la Product Owner, y se anota en la [Sección 11](11-decisiones-y-cambios.md).
  - Las **decisiones técnicas** se anotan como comentario en la tarjeta de Trello.
  - Lo que se acuerde por chat se pasa a Trello el mismo día; si no está en Trello, no está acordado.
- **Fuente única de verdad:** el estado de las tareas está en Trello; el plan y las decisiones, en el Expediente.

### Cómo se escala un impedimento o un conflicto

1. El impedimento se dice en el Daily (o por WhatsApp si es urgente).
2. El Scrum Master (Dylan) busca resolverlo en menos de 24 horas.
3. Si no se resuelve, se conversa con la Product Owner (Emily) para ajustar el alcance del Sprint, sin mover la fecha.
4. Si pone en riesgo una entrega del curso, se consulta al docente en la siguiente clase.

**Conflictos:** primero se conversan directamente. Si no hay acuerdo, en temas del producto decide la Product Owner y en temas del proceso decide el Scrum Master. La decisión se anota en la Sección 11.

## 10.2 Tablero de Trabajo (Trello)

**Enlace al tablero:** https://trello.com/b/VFrpoQuT/plataforma-lesco-tablero-scrum (tablero "Plataforma LESCO · Tablero Scrum", creado el 11/11/2026)

### Columnas y su significado

| Columna en Trello | Significado | Límite WIP |
|---|---|---|
| **Product Backlog** | Ítems que no están en el Sprint actual: los del Sprint 2, los opcionales, las acciones de riesgo del Sprint 2 y una tarjeta resumen del trabajo futuro. | Sin límite |
| **Por hacer (Sprint 1)** | Tareas del Sprint Backlog que todavía nadie empezó. Arriba está la tarjeta 📌 de la DoD. | Sin límite |
| **En progreso (máx. 2)** | Tareas que alguien está trabajando ahora. | **2** (1 por persona) |
| **En revisión (máx. 2)** | Tareas terminadas por su responsable que esperan que el otro integrante las revise contra la DoD. | **2** |
| **Hecho** | Tareas que cumplen la DoD y fueron revisadas. | Sin límite |

Trello no bloquea automáticamente al pasar el límite, por eso el WIP va escrito en el nombre de la columna y se respeta como regla del equipo.

**¿Por qué estos límites WIP?** Somos dos personas: si cada uno tiene una sola tarea en progreso, se termina más y se empieza menos. El límite de 2 en "En revisión" obliga a revisar el trabajo del compañero antes de empezar algo nuevo, para que nada se quede sin revisar al final del Sprint. La columna "En revisión" existe por el criterio 3 de la DoD.

### Cómo es cada tarjeta

- **Título:** ID de la historia, tarea, responsable y horas, por ejemplo `HU-01 · Diseñar las pantallas de registro… — Emily (5 h)`. Así el responsable se ve sin abrir la tarjeta.
- **Miembro asignado:** además, cada integrante se asigna como miembro en sus tarjetas.
- **Descripción:** historia a la que pertenece, puntos, responsable, horas y Sprint.
- **Fecha límite:** el cierre del Sprint (22 de noviembre para el Sprint 1).
- **Adjunto:** el enlace al *commit* en GitHub.

La DoD está en una tarjeta fija al inicio de "Por hacer" (📌 *Definition of Done v1.0*) con el checklist de los 9 criterios de la [Sección 09](09-definition-of-done.md). Quien revisa una tarjeta la recorre punto por punto antes de moverla.

### Regla para mover una tarjeta a "Hecho"

Una tarjeta pasa a **Hecho** solo si cumple los 9 puntos de la DoD y **el otro integrante** la revisó. Quien programó la tarea no puede pasarla a Hecho por su cuenta.

### Historias del Sprint Backlog 1 cargadas

En **Por hacer (Sprint 1)** están cargadas las 21 tareas del Sprint 1 ([Sección 05, apartado 5.4](05-backlog-y-seguimiento.md#54-sprint-backlog-1-vigente-9-al-22-de-noviembre)), agrupadas por estas historias:

| Historia | Tareas | Responsables |
|---|---|---|
| HU-01 · Registro e inicio de sesión con rol | 5 | Dylan, Emily |
| HU-05 · Consentimiento informado | 2 | Emily, Dylan |
| HU-04 · Interfaz base accesible | 3 | Emily |
| HU-03 · Perfil y disponibilidad del intérprete | 4 | Dylan, Emily |
| SP-01 · Prueba de concepto de videollamada | 3 | Dylan, Emily |
| MIT-01 · Primera versión en Vercel | 1 | Dylan |
| Revisión, accesibilidad y Sprint Review | 3 | Dylan, Emily |
