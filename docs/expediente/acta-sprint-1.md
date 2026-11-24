# Acta de Sprint Review y Sprint Retrospective · Sprint 1

## Datos de la reunión

| Dato | Valor |
|---|---|
| **Sprint** | Sprint 1 (9 al 19 de noviembre de 2026) |
| **Fecha** | Viernes 20 de noviembre de 2026 |
| **Duración** | 2 horas (Review y Retrospective seguidas) |
| **Asistentes** | Emily Zúñiga Solano (Product Owner + Developer) y Dylan Jiménez Alfaro (Scrum Master + Developer) |
| **Interesados externos** | No asistieron. La validación con una persona sorda y con un intérprete voluntario se hizo después, el 23/11 (ver Retroalimentación). |

---

## Sprint Review

### Sprint Goal y si se cumplió

**Sprint Goal:** «Dejar construida la base de la plataforma: que una persona sorda y un intérprete puedan registrarse e iniciar sesión con su rol, que el intérprete publique su perfil y disponibilidad, y que se compruebe técnicamente que la videollamada es viable».

**No se cumplió.** Al cierre del 19 de noviembre estaban hechas las pantallas, pero faltaba la lógica (registro, consentimiento, traslapes), la prueba de la videollamada y la publicación en Vercel.

### Qué se mostró y cuáles cumplen la DoD

Se mostró el trabajo terminado del Sprint 1 (todavía no estaba publicado en Vercel):

| Historia | Qué se mostró | ¿Cumple la DoD? |
|---|---|---|
| HU-01 · Registro e inicio de sesión (5) | Proyecto base React + Vite, datos de prueba y pantallas de registro e inicio de sesión con selección de rol. Al enviar salía el aviso de "pendiente": faltaba la lógica. | No (faltaba lógica, revisión y Vercel) |
| HU-05 · Consentimiento (2) | Aviso de privacidad en lenguaje sencillo (versión 1.0), enlazado en el pie. Faltaba la casilla obligatoria. | No |
| HU-04 · Interfaz accesible (3) | Guía de estilo, diseño adaptable, navegación por teclado y "Saltar al contenido". Lighthouse: accesibilidad 100 en las 6 pantallas. | No (faltaban la revisión con una persona sorda y Vercel) |
| HU-03 · Perfil y disponibilidad (5) | Formulario de perfil y de horarios. Faltaban guardar y la validación de traslapes. | No |
| SP-01 · Prueba de videollamada (3) | No se mostró: el prototipo no estaba hecho. | No |

**Puntos que cumplen la DoD: 0 de 18.** El criterio 7 (funciona en Vercel) no lo cumplía ninguna historia, porque MIT-01 seguía pendiente.

### Retroalimentación recibida

- **De los interesados:** no participaron en la reunión. La validación se movió a cuando la app estuviera publicada. El 23/11 se hizo con una persona sorda (interfaz) y con un intérprete voluntario (perfil y disponibilidad): **ninguno pidió cambios**.

### Cambios al Product Backlog acordados

1. Los 5 ítems del Sprint 1 (18 puntos) pasan al Sprint 2 como trabajo arrastrado (CR-06, D-06).
2. El Sprint 2 va del 20 al 25 de noviembre, porque la entrega final se adelantó al 25/11 (CR-05).
3. Se aplica desde ya el orden de recorte de la Sección 07: no se toman opcionales (HU-02, TEC-01, HU-12) y HU-08 se hace en versión simple (aceptación automática).
4. MIT-01 (publicar en Vercel) pasa a Emily, porque el repositorio está en su cuenta de GitHub.

### Estado del release frente al Cronograma de Entregas

| Dato | Plan | Real al 19/11 |
|---|---|---|
| Puntos terminados | 18 | 0 |
| Puntos pendientes del release (de 37) | 19 | 37 |
| SPI (terminados ÷ planificados) | 1 | 0 |

Vamos atrasados: quedan 37 puntos para un Sprint de 6 días. Por eso se aplica el orden de recorte (Sección 07).

---

## Sprint Retrospective

**Formato usado:** Start / Stop / Continue.

**Seguimiento de acciones del Sprint anterior:** no aplica. Es el primer Sprint de construcción; el Sprint 0 fue solo de planificación.

### Qué funcionó y qué no (con evidencia)

| | Qué pasó | Evidencia |
|---|---|---|
| Funcionó | Las pantallas y la guía de estilo se terminaron temprano y con buena calidad. | Commits de Emily del 13 y 14/11; Lighthouse 100 en las 6 pantallas. |
| Funcionó | El tablero de Trello con la DoD como checklist dejó claro qué faltaba en cada tarjeta. | Tarjeta 📌 DoD y comentarios en cada tarjeta. |
| No funcionó | El trabajo quedó desbalanceado: la lógica empezó tarde y las pantallas no se pudieron probar completas. | Seguimiento diario del 13/11: "Dylan aún no empieza su parte de código". Lógica subida el 22/11. |
| No funcionó | Las tareas terminadas esperaron días sin revisión. | Tarjetas de Emily en cola desde el 14/11; revisadas el 22/11. |
| No funcionó | Sin publicar en Vercel, ninguna historia podía cumplir la DoD (criterio 7). | MIT-01 seguía en "Por hacer" al 19/11. |
| No funcionó | El Daily no se registró todos los días. | El Excel solo tiene filas del 11, 13 y 14/11. |

### Start / Stop / Continue

| Empezar (Start) | Dejar de hacer (Stop) | Seguir haciendo (Continue) |
|---|---|---|
| Publicar en Vercel al inicio del Sprint, no al final. | Dejar tarjetas en "En revisión" más de un día. | Correr Lighthouse en cada pantalla nueva. |
| Revisar el trabajo del otro en menos de 24 horas. | Dejar la lógica y la integración para los últimos días. | Usar la DoD de Trello como checklist antes de mover a "Hecho". |
| Tener reglas de trabajo escritas y acordadas por los dos. | Coordinar solo por chat sin pasar los acuerdos a Trello. | Dejar en cada tarjeta un comentario con el commit y qué revisar. |

### Acciones de mejora

| # | Acción | Responsable | Fecha | Cómo se verifica | Seguimiento al 23/11 |
|---|---|---|---|---|---|
| A-1 | Publicar la app en Vercel (MIT-01) para que las historias puedan cumplir el criterio 7 de la DoD. | Emily | 23/11 | La URL funciona y aparece en Trello y en el README. | Cumplida: https://proyecto-administracion-de-proyecto.vercel.app/ |
| A-2 | Revisar toda tarjeta en "En revisión" en menos de 24 horas. | Dylan (vigila como SM); cada uno revisa lo del otro | Desde el 20/11 | Fecha de la tarjeta en "En revisión" contra la del comentario de revisión. | Cumplida: Dylan revisó las tareas de Emily el 22/11 y Emily las de Dylan el 23/11, al día siguiente de subirlas. |
| A-3 | Escribir los Working Agreements y votarlos con puño de cinco. | Dylan | 22/11 | Sección 10.3 con las 10 reglas y los votos. | Cumplida: WA-01 a WA-10, todas con 5. |

### Acciones incorporadas al Sprint Backlog 2

- MIT-01 (A-1) se trabajó dentro del Sprint 2 como parte del arrastre del Sprint 1.
- A-2 quedó como regla WA-05 de los Working Agreements.
- A-3 quedó en la Sección 10.3 del Expediente.
