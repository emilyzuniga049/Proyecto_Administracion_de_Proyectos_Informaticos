# Acta de Sprint Review y Sprint Retrospective · Sprint 2

## Datos de la reunión

| Dato | Valor |
|---|---|
| **Sprint** | Sprint 2 (20 al 25 de noviembre de 2026) |
| **Fecha** | Martes 24 de noviembre de 2026 |
| **Duración** | 1 hora (Review y Retrospective seguidas) |
| **Asistentes** | Emily Zúñiga Solano (Product Owner + Developer) y Dylan Jiménez Alfaro (Scrum Master + Developer) |
| **Interesados externos** | No asistieron. La persona sorda y el intérprete voluntario ya habían validado la interfaz y el formulario el 23/11. |

---

## Sprint Review

### Sprint Goal y si se cumplió

**Sprint Goal:** «Que una persona sorda o un funcionario pueda buscar un intérprete, agendar una cita, que el intérprete la acepte y que ambos entren a la videollamada desde la plataforma».

**Se cumplió.** El recorrido completo funciona en la versión publicada en Vercel.

### Qué se mostró y cuáles cumplen la DoD

Se mostró el recorrido en https://proyecto-administracion-de-proyecto.vercel.app/, con la computadora y el celular:

| Ítem | Qué se mostró | Puntos | ¿Cumple la DoD? |
|---|---|---|---|
| HU-01, HU-05, HU-04, HU-03, SP-01 | Arrastre del Sprint 1: registro con rol y consentimiento, interfaz accesible, perfil y disponibilidad del intérprete y llamada de prueba. Terminados el 22 y 23/11. | 18 | Sí |
| HU-06 · Buscar intérpretes | Búsqueda por fecha, franja y trámite; solo intérpretes verificados con horas libres; sugerencia de la fecha más cercana. | 3 | Sí |
| HU-07 · Agendar una cita | Resumen, tipo de trámite obligatorio, confirmación visual y bloqueo de la hora para otras personas. | 5 | Sí |
| HU-08 · Versión simple | La cita queda confirmada sola y aparece en "Mis citas" y en la agenda del intérprete. | 3 | Sí |
| HU-11 · Unirse a la videollamada | Botón que se habilita 10 minutos antes; llamada incrustada entre computadora y celular; solo entran las dos personas de la cita. | 8 | Sí |
| MIT-02 | Datos de prueba automáticos, botón "Restablecer datos de prueba" y cita de demostración. | — | Sí |

**Puntos que cumplen la DoD: 37 de 37.** Cada historia la revisó el integrante que no la subió, en Vercel, con la checklist de la DoD en Trello.

### Retroalimentación recibida

- No hubo comentarios ni pedidos de cambio. Todo el recorrido funcionó en la reunión.

### Cambios al Product Backlog acordados

1. No se agregan historias: el release cierra con los 37 puntos comprometidos.
2. HU-08 queda en su versión simple (aceptación automática). Aceptar o rechazar a mano queda como trabajo futuro, junto con HU-02, TEC-01, HU-12 y las historias de la decisión D-02.
3. MIT-03 (video de respaldo) se graba antes de la entrega del 25/11.

### Estado del release frente al Cronograma de Entregas

| Dato | Valor |
|---|---|
| Puntos terminados en el Sprint 2 | 37 (18 del arrastre + 19 nuevos) |
| Puntos pendientes del release (de 37) | 0 |
| SPI del Sprint 2 (terminados ÷ comprometidos) | 37 ÷ 37 = 1 |

El release queda completo para la entrega del 25 de noviembre.

---

## Sprint Retrospective

**Formato usado:** Start / Stop / Continue.

### Seguimiento de acciones del Sprint anterior

| # | Acción (Retro del Sprint 1) | Responsable | Resultado |
|---|---|---|---|
| A-1 | Publicar la app en Vercel | Emily | Cumplida el 23/11. Desde ahí cada push se publicó solo y todas las revisiones se hicieron en Vercel. |
| A-2 | Revisar lo del otro en menos de 24 horas | Dylan (vigila como SM) | Cumplida. HU-06 y HU-11 se revisaron el mismo día; HU-07 y HU-08, al día siguiente de subirlas. |
| A-3 | Escribir y votar los Working Agreements | Dylan | Cumplida el 22/11 (WA-01 a WA-10, todas con 5). |

### Qué funcionó (con evidencia)

| Qué pasó | Evidencia |
|---|---|
| Se completó todo el compromiso, incluido el arrastre del Sprint 1, en 6 días. | 37 de 37 puntos en "Hecho" en Trello. |
| El trabajo se repartió en partes iguales y en paralelo. | Dylan: HU-06 y HU-11 (11 puntos). Emily: HU-07 y HU-08 (8 puntos) y el video de MIT-03. |
| Las revisiones fueron rápidas y siempre con la DoD. | Comentarios de revisión en cada tarjeta, el mismo día o al día siguiente. |
| Publicar en Vercel desde el inicio permitió probar en computadora y celular. | Llamada probada entre los dos equipos, también con datos móviles. |
| El orden de recorte se aplicó a tiempo y sin discusiones. | HU-08 en versión simple y sin opcionales (Sección 07, CR-06). |
| La validación con una persona sorda y un intérprete voluntario confirmó el diseño. | Ninguno pidió cambios (23/11). |

### Qué mejorar

| Qué pasó | Evidencia |
|---|---|
| El Daily no se registró todos los días. | El seguimiento diario tiene días "sin registro" entre el 15 y el 21/11. |

### Start / Stop / Continue

| Empezar (Start) | Dejar de hacer (Stop) | Seguir haciendo (Continue) |
|---|---|---|
| Anotar el Daily en el Excel el mismo día, aunque sea en una línea. | Acumular trabajo para los últimos días del Sprint, algo que ya se corrigió en este Sprint. | Revisar lo del otro en menos de 24 horas, con la DoD. |
| | | Publicar en Vercel antes de revisar y probar en computadora y celular. |
| | | Repartir las historias desde el Sprint Planning para trabajar en paralelo. |
| | | Dejar en cada tarjeta un comentario con el commit y qué revisar. |

### Acciones de mejora

| # | Acción | Responsable | Fecha | Cómo se verifica |
|---|---|---|---|---|
| A-4 | Grabar el video de respaldo del recorrido completo (MIT-03). | Emily | 25/11 | El video está en el repo o enlazado en el Expediente y la tarjeta pasa a "Hecho". |
| A-5 | Repasar la defensa: cada uno estudia sus secciones del Expediente. | Dylan (organiza como SM) | 25/11 | Antes de la entrega, cada uno explica sus secciones al otro. |
| A-6 | En el próximo proyecto, anotar el Daily el mismo día. | Dylan | Próximo proyecto | El seguimiento diario no tiene días "sin registro". |
