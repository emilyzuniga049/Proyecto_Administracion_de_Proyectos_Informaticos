# Sección 05 · Backlog inicial, Sprint Backlog y mecanismo de seguimiento

## 5.1 Product Backlog inicial

El Product Backlog es la lista ordenada de todo lo que necesita el producto, de lo más importante a lo menos importante. Lo administra Emily Zúñiga como Product Owner y se revisa en cada Sprint Review. Contiene 23 ítems: 21 historias de usuario, una prueba de concepto y una tarea técnica, que suman 85 puntos.

Cada ítem tiene una prioridad (Alta, Media o Baja) y una estimación en puntos, que indica el tamaño del trabajo (1 es pequeño y 8 es grande). El detalle completo, con título y criterios de aceptación, está en la hoja *Product Backlog* de [`Backlog.xlsx`](../Backlog/Backlog.xlsx).

### Distribución vigente (desde el 11/11/2026)

| Sprint | Fechas | Enfoque | Ítems | Puntos |
|---|---|---|---|---|
| Sprint 1 | 9 – 22 nov (sem. 9–10) | Cuentas y roles, consentimiento, interfaz accesible, disponibilidad del intérprete y prueba de video | HU-01, HU-05, HU-04, HU-03, SP-01 | 18 |
| Sprint 2 | 23 nov – 6 dic (sem. 11–12) | Agendar una cita y realizarla por videollamada | HU-06, HU-07, HU-08, HU-11 | 19 |
| Opcionales | Si la velocidad lo permite | Verificación del intérprete, pruebas finales y despliegue, chat en la llamada | HU-02, TEC-01, HU-12 | 9 |
| Trabajo futuro | Fuera de este release | Cancelar y reagendar, recordatorios, invitar por enlace, historial, asistencia en tiempo real, panel del admin, IA | HU-09, HU-10, HU-13, HU-14, HU-15 a HU-21 | 39 |
| | | | **Total** | **85** |

La justificación de la nueva distribución está en la [Sección 07](07-estimacion-y-cronograma.md) (velocidad y Release Plan) y en la decisión D-01 de la [Sección 11](11-decisiones-y-cambios.md).

### Distribución original (Semana 4)

| Sprint | Enfoque | Ítems | Puntos |
|---|---|---|---|
| Sprint 1 (Sem. 4–5) | Cuentas y roles, consentimiento, perfil de intérprete y prueba de video | HU-01, HU-05, SP-01, HU-02, HU-03, HU-04 | 21 |
| Sprint 2 (Sem. 6–7) | Agendamiento de citas previas | HU-06 a HU-10 | 17 |
| Sprint 3 (Sem. 8–9) | Videollamada integrada en la plataforma | HU-11 a HU-14 | 16 |
| Sprint 4 (Sem. 10–11) | Asistencia en tiempo real | HU-15 a HU-19 | 17 |
| Sprint 5 (Sem. 12–13) | Panel del administrador, IA experimental, pruebas y cierre | HU-20, HU-21, TEC-01 | 14 |
| | **Total** | | **85** |

**¿Cómo se ordenó?**

1. Primero va la base de la que depende todo lo demás: cuentas, roles, consentimiento e intérpretes verificados.
2. Después, el mayor riesgo técnico: la videollamada.
3. Luego, las funciones centrales del Product Goal: la cita previa y la asistencia inmediata.
4. Al final queda lo experimental, la interpretación con IA, con prioridad baja.

**Cambios por refinamiento respecto a la Sección 04:**

- HU-01 ahora incluye el rol de intérprete, para que coincida con el Sprint Goal.
- Se agregó HU-05, el consentimiento informado según la Ley 8968, porque el registro ya recoge datos personales.
- El criterio de HU-04 se volvió verificable con WCAG 2.1 AA: contraste mínimo, navegación con teclado y nada que dependa del audio. Su prioridad subió de Media a Alta por ser una restricción de calidad.

**Cambios por refinamiento del 11/11/2026:**

- Cada ítem tiene ahora un título corto, como pide la plantilla de historias de usuario.
- Los criterios de aceptación de HU-01 y HU-10 se ajustaron al prototipo (por ejemplo, ya no se pide guardar la contraseña cifrada en un servidor, porque no habrá servidor; ver D-02).
- Se agregaron las acciones de mitigación de riesgos (MIT-01 a MIT-04) a los Sprint Backlogs ([Sección 08](08-riesgos-y-adquisiciones.md)).

## 5.2 Sprint Backlog Sprint 1 original (Semanas 4 y 5)

> Se conserva como registro. Este Sprint no se ejecutó: las semanas 4 a 8 se usaron para la planificación (Sprint 0). Ver 5.4 para el Sprint Backlog 1 vigente.

**Sprint Goal:** Dejar construida la base de la plataforma: que una persona sorda y un intérprete puedan registrarse e iniciar sesión con su rol, que el intérprete publique su perfil y disponibilidad, y que se compruebe técnicamente que la videollamada es viable.

| ID | Ítem | Prioridad | Puntos |
|---|---|---|---|
| HU-01 | Registro e inicio de sesión con rol | Alta | 5 |
| HU-05 | Consentimiento informado (Ley 8968) | Alta | 2 |
| SP-01 | Prueba de concepto de videollamada | Alta | 3 |
| HU-02 | Verificación de la certificación del intérprete | Alta | 3 |
| HU-03 | Perfil y disponibilidad del intérprete | Alta | 5 |
| HU-04 | Interfaz base accesible | Alta | 3 |
| | **Total** | | **21** |

Estos seis ítems se dividieron en 20 tareas que sumaban 62 horas (31 para cada integrante).

## 5.3 Mecanismo de seguimiento

- **Tablero:** usamos **Trello** (antes se había planeado GitHub Projects; ver D-03). Cada tarjeta es una tarea del Sprint, tiene un responsable y lleva el enlace a su *commit*, así el tablero y el repositorio muestran el mismo avance. Lo mantiene Dylan como Scrum Master. Las columnas, el límite WIP y la regla para pasar a "Hecho" están en la [Sección 10](10-comunicaciones-y-tablero.md).
- **Daily Scrum:** es una reunión de 10 minutos por videollamada, en los días de trabajo del proyecto. Respondemos tres preguntas: qué hicimos, qué vamos a hacer y si hay algún problema. Las respuestas se anotan en la hoja *Seguimiento diario* del Excel.
- **Control del avance:** se comparan los puntos y las horas de las tareas en estado Hecho contra el total del Sprint, y se actualiza el burndown del release ([Sección 07](07-estimacion-y-cronograma.md)). Si a mitad del Sprint vamos atrasados, el equipo conversa con la Product Owner para ajustar el alcance, sin mover la fecha de entrega.
- **Cierre del Sprint:** en la Sprint Review se muestra el avance al docente. En la Retrospectiva se anota la velocidad real. Lo que se aprenda se agrega o se reordena en el Product Backlog.

## 5.4 Sprint Backlog 1 vigente (9 al 22 de noviembre)

| Dato | Valor |
|---|---|
| **Inicio** | Lunes 9 de noviembre de 2026 (Sprint Planning) |
| **Cierre** | Domingo 22 de noviembre de 2026 (Sprint Review y Retrospectiva) |
| **Sprint Goal** | Dejar construida la base de la plataforma: que una persona sorda y un intérprete puedan registrarse e iniciar sesión con su rol, que el intérprete publique su perfil y disponibilidad, y que se compruebe técnicamente que la videollamada es viable. |
| **Compromiso** | 18 puntos · 21 tareas · 56 horas |

### Ítems seleccionados

| ID | Título | Prioridad | Puntos |
|---|---|---|---|
| HU-01 | Registro e inicio de sesión con rol | Alta | 5 |
| HU-05 | Consentimiento informado (Ley 8968) | Alta | 2 |
| HU-04 | Interfaz base accesible | Alta | 3 |
| HU-03 | Perfil y disponibilidad del intérprete | Alta | 5 |
| SP-01 | Prueba de concepto de videollamada | Alta | 3 |
| | **Total** | | **18** |

HU-02 (verificación del intérprete) salió del Sprint 1 y quedó como primer opcional, porque el Sprint debe caber en la velocidad mínima estimada (ver [Sección 07](07-estimacion-y-cronograma.md)). Mientras tanto, los intérpretes de los datos de prueba ya vienen marcados como "verificados".

### Tareas por ítem

| Ítem | Tarea | Responsable | Horas |
|---|---|---|---|
| HU-01 | Crear el proyecto React + Vite en el repositorio y el tablero en Trello | Dylan | 3 |
| HU-01 | Definir los datos de prueba de usuarios y roles (archivo JSON + `localStorage`) | Dylan | 3 |
| HU-01 | Programar el registro y el inicio de sesión simulados, con menú según el rol | Dylan | 4 |
| HU-01 | Diseñar las pantallas de registro e inicio de sesión con selección de rol | Emily | 5 |
| HU-01 | Probar registro e inicio de sesión con cada rol | Emily | 2 |
| HU-05 | Redactar el aviso de privacidad en lenguaje sencillo | Emily | 2 |
| HU-05 | Agregar la casilla obligatoria y guardar fecha y versión aceptada | Dylan | 2 |
| HU-04 | Definir la guía de estilo accesible (paleta, tipografía, íconos) | Emily | 3 |
| HU-04 | Maquetar el diseño base adaptable y la navegación por teclado | Emily | 4 |
| HU-04 | Revisar la interfaz base con una persona sorda o, si no se consigue, con la lista WCAG | Emily | 2 |
| HU-03 | Definir los datos de disponibilidad por bloques horarios | Dylan | 2 |
| HU-03 | Construir el formulario de perfil y disponibilidad | Emily | 5 |
| HU-03 | Programar la consulta de disponibilidad y la validación de traslapes | Dylan | 3 |
| HU-03 | Validar el formulario con un intérprete voluntario | Emily | 2 |
| SP-01 | Comparar meet.jit.si y JaaS y crear la cuenta gratuita de JaaS | Dylan | 2 |
| SP-01 | Construir el prototipo de llamada incrustada entre dos navegadores | Dylan | 4 |
| SP-01 | Probar con conexión lenta y documentar la decisión | Emily | 2 |
| MIT-01 | Publicar una primera versión en Vercel (ambiente de pruebas) | Dylan | 2 |
| Todos | Revisión cruzada de cada historia contra la DoD | Dylan | 2 |
| Todos | Revisión de accesibilidad con Lighthouse de cada pantalla nueva | Emily | 1 |
| Todos | Preparar la Sprint Review del 22 de noviembre | Dylan | 1 |
| | **Total** (Dylan 28 h · Emily 28 h) | | **56** |

### Cómo se verifica que cada ítem cumple la DoD

1. Al terminar una tarea, su tarjeta pasa a **En revisión** en Trello.
2. El otro integrante revisa la historia con la lista de la [DoD (Sección 09)](09-definition-of-done.md), que está como *checklist* en la tarjeta 📌 DoD del tablero, y prueba los criterios de aceptación en el ambiente de pruebas (Vercel).
3. Solo si se cumplen **todos** los puntos, la tarjeta pasa a **Hecho**. Si falta algo, vuelve a **En progreso** con un comentario.
4. Una historia cuenta para la velocidad solo cuando todas sus tareas están en Hecho y la Product Owner aceptó los criterios.

### Tablero de seguimiento

Trello con las columnas **Por hacer / En progreso / En revisión / Hecho**. Detalle en la [Sección 10](10-comunicaciones-y-tablero.md).

## 5.5 Sprint 2 (preliminar, 23 de noviembre al 6 de diciembre)

**Sprint Goal propuesto:** «Que una persona sorda o un funcionario pueda buscar un intérprete, agendar una cita, que el intérprete la acepte y que ambos entren a la videollamada desde la plataforma».

| ID | Título | Puntos |
|---|---|---|
| HU-06 | Buscar intérpretes por fecha y hora | 3 |
| HU-07 | Agendar una cita previa | 5 |
| HU-08 | Aceptar o rechazar solicitudes de cita | 3 |
| HU-11 | Unirse a la videollamada de la cita | 8 |
| MIT-02 | Datos de prueba que se cargan solos y botón "Restablecer demo" | — |
| MIT-03 | Grabar un video de respaldo del recorrido completo | — |
| MIT-04 | Probar la videollamada en la red del aula y con datos móviles | — |
| | **Total** | **19** |

Las tareas de este Sprint se definen en su Sprint Planning (23 de noviembre), con la velocidad real del Sprint 1.
