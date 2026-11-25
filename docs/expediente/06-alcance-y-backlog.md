# Sección 06 · Alcance, Product Backlog priorizado y criterios de aceptación

Esta sección define qué entra y qué no entra en el release que se entrega el 25 de noviembre de 2026. Lo que no está en el Product Backlog comprometido queda fuera por definición. Los cambios de alcance se registran en la [Sección 11](11-decisiones-y-cambios.md).

## 6.1 Declaración del alcance

| Elemento | Detalle |
|---|---|
| **Product Goal** | Entregar un prototipo web funcional y accesible en el que una persona sorda o un funcionario institucional pueda agendar una cita con un intérprete de LESCO certificado y realizarla por videollamada dentro de la plataforma ([Sección 01](01-problema-y-product-goal.md)). |
| **Usuarios** | Personas sordas usuarias de LESCO, funcionarios de instituciones y comercios, e intérpretes de LESCO ([Sección 03](03-interesados.md)). |
| **Release** | 37 puntos en 2 Sprints: Sprint 1 (9–19 nov) y Sprint 2 (20–25 nov). |

### Entregables

| # | Entregable | Dónde está |
|---|---|---|
| E-1 | Prototipo web publicado (React + Vite, datos de prueba en el navegador) | https://proyecto-administracion-de-proyecto.vercel.app/ y carpeta `app/` |
| E-2 | Expediente del proyecto, Secciones 00 a 12 | `docs/expediente/` |
| E-3 | Product Backlog, Sprint Backlogs y seguimiento diario | `docs/Backlog/Backlog.xlsx` y tablero de Trello |
| E-4 | Evidencias: reportes de Lighthouse, pruebas automáticas y video de respaldo de la demo | `docs/evidencias/`, `app/src/lib/*.test.js` y [video en Google Drive](https://drive.google.com/file/d/1qKJG8yZgsjDho2Cl2zSVYMjNAVypm3rE/view?usp=sharing) |
| E-5 | Actas de Sprint Review y Retrospective | [acta-sprint-1.md](acta-sprint-1.md) y [acta-sprint-2.md](acta-sprint-2.md) |

### Qué incluye el alcance

1. Registro e inicio de sesión con tres roles (persona sorda, funcionario e intérprete), con consentimiento informado obligatorio según la Ley 8968.
2. Interfaz accesible según WCAG 2.1 AA: contraste, teclado, íconos con texto y nada que dependa del audio.
3. Perfil y horarios del intérprete, sin bloques traslapados.
4. Búsqueda de intérpretes por fecha, franja y trámite.
5. Agendar una cita con bloqueo del horario. La cita queda aceptada automáticamente (versión simple de HU-08).
6. Videollamada de la cita dentro de la plataforma con Jitsi (meet.jit.si), solo para sus participantes y desde 10 minutos antes.

### Qué queda fuera (exclusiones explícitas)

| Fuera del alcance | Por qué | Dónde quedó |
|---|---|---|
| Servidor y base de datos reales; los datos viven en el navegador (`localStorage`) | Es un prototipo académico de 2 Sprints | Restricción de la [Sección 02](02-contexto-y-restricciones.md) |
| Datos personales reales | Solo se usan datos ficticios (`@demo.cr`), Ley 8968 | DoD, criterio 8 |
| Grabar o guardar las videollamadas | Privacidad de las personas usuarias | Aviso de privacidad (HU-05) |
| Verificar la certificación del intérprete (HU-02) | Opcional; los intérpretes de prueba vienen verificados | Opcional (no entró por velocidad) |
| Aceptar o rechazar citas a mano (HU-08 completa) | Orden de recorte de la [Sección 07](07-estimacion-y-cronograma.md) | Trabajo futuro |
| Chat en la llamada (HU-12) y pruebas finales de accesibilidad (TEC-01) | Opcionales | Opcional (no entraron por velocidad) |
| Asistencia inmediata, cancelar o reagendar, recordatorios, historial, calificación, panel del administrador (HU-09, HU-10, HU-13 a HU-20) | Fuera del release por tiempo (decisión D-02) | Trabajo futuro |
| Interpretación con IA (HU-21) | Experimental; nunca reemplaza al intérprete humano | Trabajo futuro |
| Correos o notificaciones por fuera de la plataforma | Requieren servidor | Trabajo futuro |

### Supuestos y restricciones

- El equipo es de dos personas, con un costo de ₡0 en herramientas: GitHub, Vercel Hobby, Trello y Jitsi.
- La videollamada usa el servidor público meet.jit.si, que corta las llamadas incrustadas a los 5 minutos (decisión D-05). Si falla, se abre en otra pestaña.
- La entrega del 25 de noviembre es fija (CR-05).

## 6.2 Estructura de desglose del trabajo (EDT)

Desglose por épicas: épica → historia de usuario → tareas del Sprint (las tareas están en la [Sección 05](05-backlog-y-seguimiento.md) y en Trello). Cumple la regla del 100 %: cubre todo el alcance comprometido y nada más.

```
Puente LESCO · release del 25/11/2026
├── 1. Cuentas y acceso
│   ├── HU-01 Registro e inicio de sesión con rol (5)
│   └── HU-05 Consentimiento informado, Ley 8968 (2)
├── 2. Interfaz accesible
│   └── HU-04 Interfaz base accesible (3)
├── 3. Intérpretes
│   └── HU-03 Perfil y disponibilidad del intérprete (5)
├── 4. Citas
│   ├── HU-06 Buscar intérpretes por fecha y hora (3)
│   ├── HU-07 Agendar una cita previa (5)
│   └── HU-08 Cita aceptada automáticamente, versión simple (3)
├── 5. Videollamada
│   ├── SP-01 Prueba de concepto de videollamada (3)
│   └── HU-11 Unirse a la videollamada de la cita (8)
└── 6. Gestión del proyecto
    ├── Expediente (Secciones 00 a 12), Product Backlog y Trello
    ├── Sprint Reviews y Retrospectives (actas)
    └── Mitigaciones: MIT-01 Vercel, MIT-02 datos de prueba, MIT-03 video de respaldo
```

## 6.3 Product Backlog priorizado

**Cómo se ordenó:**
1. Valor para el Product Goal: sin cita y videollamada no hay producto.
2. Dependencias: no se puede agendar sin cuentas ni horarios.
3. Riesgo técnico: la videollamada se probó primero, con SP-01.
4. Obligaciones legales: el consentimiento (Ley 8968) y la accesibilidad (Ley 7600) van primero.

Prioridad: **Alta** = imprescindible · **Media** = importante · **Baja** = deseable. Puntos en escala Fibonacci; la historia de referencia es HU-06, con 3 puntos.

### Comprometido en el release (37 puntos)

| Orden | ID | Título | Prioridad | Puntos | Sprint | Estado |
|---|---|---|---|---|---|---|
| 1 | HU-01 | Registro e inicio de sesión con rol | Alta | 5 | S1 (terminada en S2) | Hecho |
| 2 | HU-05 | Consentimiento informado (Ley 8968) | Alta | 2 | S1 (terminada en S2) | Hecho |
| 3 | HU-04 | Interfaz base accesible | Alta | 3 | S1 (terminada en S2) | Hecho |
| 4 | SP-01 | Prueba de concepto de videollamada | Alta | 3 | S1 (terminada en S2) | Hecho |
| 5 | HU-03 | Perfil y disponibilidad del intérprete | Alta | 5 | S1 (terminada en S2) | Hecho |
| 6 | HU-06 | Buscar intérpretes por fecha y hora | Alta | 3 | S2 | Hecho |
| 7 | HU-07 | Agendar una cita previa | Alta | 5 | S2 | Hecho |
| 8 | HU-08 | Aceptar solicitudes de cita (versión simple: automática) | Alta | 3 | S2 | Hecho |
| 9 | HU-11 | Unirse a la videollamada de la cita | Alta | 8 | S2 | Hecho |
| | | **Total comprometido** | | **37** | | **37 en Hecho** |

### Opcionales (entraban solo si sobraba velocidad)

| Orden | ID | Título | Prioridad | Puntos | Estado |
|---|---|---|---|---|---|
| 10 | HU-02 | Verificación de la certificación del intérprete | Alta | 3 | No entró |
| 11 | TEC-01 | Pruebas de accesibilidad y despliegue final | Alta | 3 | No entró como historia: el despliegue se hizo con MIT-01 y las pruebas de accesibilidad son parte de la DoD |
| 12 | HU-12 | Chat de texto en la videollamada | Media | 3 | No entró |

### Trabajo futuro (fuera del release)

| ID | Título | Prioridad | Puntos |
|---|---|---|---|
| HU-15 | Solicitar asistencia inmediata | Alta | 5 |
| HU-16 | Estado "disponible ahora" del intérprete | Alta | 5 |
| HU-09 | Cancelar o reagendar una cita | Media | 3 |
| HU-10 | Recordatorios visuales de citas | Media | 3 |
| HU-13 | Invitar al funcionario por enlace | Media | 3 |
| HU-17 | Posición en la fila y tiempo de espera | Media | 3 |
| HU-19 | Guía rápida para funcionarios | Media | 2 |
| HU-20 | Panel del administrador | Media | 3 |
| HU-14 | Historial de sesiones | Baja | 2 |
| HU-18 | Calificar la sesión | Baja | 2 |
| HU-21 | Interpretación experimental con IA | Baja | 8 |

El backlog completo, con la historia de usuario de cada ítem, está en `docs/Backlog/Backlog.xlsx` (hoja *Product Backlog*): 85 puntos en total, de los cuales 37 son el release.

## 6.4 Criterios de aceptación de las historias del release

Formato *Dado que / Cuando / Entonces*. Una historia está terminada solo si cumple sus criterios de aceptación **y** la Definition of Done ([Sección 09](09-definition-of-done.md)).

| ID | Criterios de aceptación | Cómo se verificó |
|---|---|---|
| **HU-01** | **Dado que** una persona abre "Crear cuenta", **cuando** escribe nombre, correo, contraseña y elige su rol, **entonces** la cuenta se crea y entra a su panel. **Dado que** el correo ya está registrado, **cuando** intenta registrarse, **entonces** ve un mensaje claro y visible. **Dado que** inicia sesión, **cuando** entra al panel, **entonces** ve solo las opciones de su rol. | `sesion.test.js` y revisión de Emily en Vercel (23/11) |
| **HU-05** | **Dado que** se está registrando, **cuando** no marca la casilla del aviso de privacidad, **entonces** la cuenta no se crea. **Cuando** la marca, **entonces** se guardan la fecha y la versión del aviso aceptado. El aviso usa frases cortas. | `sesion.test.js` y revisión de Emily (23/11) |
| **HU-04** | **Dado que** cualquier pantalla está abierta, **cuando** se revisa con Lighthouse, **entonces** la accesibilidad es de 90 o más y el contraste es de al menos 4,5:1. **Cuando** se usa solo el teclado, **entonces** se llega a todo con el foco visible. Ninguna información depende del audio, los íconos llevan texto y el diseño se adapta al celular. | Lighthouse 100 en las pantallas del Sprint 1 y revisión con una persona sorda (23/11) |
| **SP-01** | **Dado que** dos personas abren la misma sala en dos navegadores, **cuando** entran, **entonces** se ven y se escuchan. **Cuando** se prueba con una conexión lenta (datos móviles), **entonces** la llamada se mantiene. La tecnología elegida y el porqué quedan documentados. | Prueba en Vercel entre computadora y celular (23/11) y decisión D-05 |
| **HU-03** | **Dado que** un intérprete está en "Mi perfil y mis horarios", **cuando** agrega, edita o elimina un bloque, **entonces** el cambio se guarda y se ve en la lista. **Cuando** un bloque choca con otro, **entonces** no se guarda y dice con cuál choca. | `disponibilidad.test.js`, revisión de Emily (23/11) y validación con un intérprete voluntario |
| **HU-06** | **Dado que** una persona sorda o un funcionario busca por fecha, franja y trámite, **cuando** pulsa "Buscar", **entonces** solo aparecen intérpretes verificados con horas libres en ese momento. **Cuando** no hay resultados, **entonces** se sugiere la fecha más cercana con espacio. | `citas.test.js` y revisión de Emily (23/11) |
| **HU-07** | **Dado que** eligió un intérprete y una hora, **cuando** confirma con el tipo de trámite, **entonces** la cita guarda fecha, hora, intérprete y trámite, y se muestra una confirmación visual. **Cuando** otra persona busca ese mismo día, **entonces** esa hora ya no aparece. | `citas.test.js` (bloqueo del horario) y revisión de Dylan (24/11) |
| **HU-08** (versión simple) | **Dado que** se agendó una cita, **cuando** el intérprete abre "Mi agenda de citas", **entonces** la ve como "Confirmada", con el nombre de quien la pidió y el trámite. | `citas.test.js` y revisión de Dylan (24/11) |
| **HU-11** | **Dado que** falta más de 10 minutos para la cita, **cuando** la persona abre "Mis citas", **entonces** el botón para entrar aún no está habilitado. **Cuando** faltan 10 minutos o menos, **entonces** el botón abre la llamada dentro de la plataforma. **Dado que** alguien no es parte de la cita, **cuando** intenta abrir su llamada, **entonces** no puede entrar. | `citas.test.js` y revisión de Emily en computadora y celular (23/11) |

### Requisitos no funcionales

Son iguales para todas las historias y están en la DoD ([Sección 09](09-definition-of-done.md)):

| Requisito | Medida verificable |
|---|---|
| Accesibilidad | Lighthouse de accesibilidad ≥ 90 por pantalla; contraste ≥ 4,5:1; uso completo con teclado |
| Compatibilidad | Funciona en Chrome y Firefox, en escritorio y celular |
| Calidad del código | Pruebas automáticas (Vitest) de la lógica; sin errores en la consola |
| Privacidad | Solo datos ficticios; consentimiento con fecha y versión; las llamadas no se graban |
| Disponibilidad para la demo | Publicado en Vercel; cada push a `main` se publica solo |

## 6.5 Matriz de trazabilidad

| Requisito | Origen | Historia | Entregable (dónde está) | Prueba |
|---|---|---|---|---|
| Cada rol ve sus propias funciones | Personas sordas, intérpretes y funcionarios (Sección 03) | HU-01 | `lib/sesion.js`, `pages/Registro.jsx`, `pages/Panel.jsx` | `sesion.test.js` |
| Consentimiento informado | Ley 8968 / PRODHAB | HU-05 | `pages/Privacidad.jsx`, casilla en `Registro.jsx` | `sesion.test.js` |
| Interfaz accesible | Ley 7600 / CONAPDIS; personas sordas | HU-04 | `index.css`, `components/Layout.jsx` | Lighthouse (`docs/evidencias/`) |
| Videollamada viable | Riesgo R-02 (Sección 08) | SP-01 | `lib/jitsi.js`, `pages/VideollamadaPrueba.jsx` | Prueba en Vercel (D-05) |
| Horarios del intérprete | Intérpretes de LESCO | HU-03 | `lib/disponibilidad.js`, `pages/Disponibilidad.jsx` | `disponibilidad.test.js` |
| Encontrar intérprete con espacio | Personas sordas y funcionarios | HU-06 | `lib/citas.js`, `pages/BuscarInterprete.jsx` | `citas.test.js` |
| Reservar sin choques de horario | Personas sordas, funcionarios e intérpretes | HU-07 | `lib/citas.js`, `pages/Agendar.jsx` | `citas.test.js` |
| El intérprete ve sus citas | Intérpretes de LESCO | HU-08 | `pages/MisCitas.jsx` | `citas.test.js` |
| Interpretación por video sin instalar nada | Product Goal; Ley 9822 (LESCO) | HU-11 | `pages/LlamadaCita.jsx`, `components/SalaVideo.jsx` | `citas.test.js` y prueba en Vercel |

## 6.6 Validación y control del alcance

- **Validación:** en cada Sprint Review la Product Owner acepta o rechaza el incremento con los criterios de 6.4 y la DoD. Sprint 1: 0 puntos aceptados al 19/11, terminados como arrastre en el Sprint 2. Sprint 2: 37 de 37 puntos aceptados el 24/11 ([actas](acta-sprint-2.md)).
- **Validación con usuarios:** el 23/11 una persona sorda revisó la interfaz (HU-04) y un intérprete voluntario revisó el perfil y los horarios (HU-03). Ninguno pidió cambios.
- **Control de cambios:** todo cambio de alcance pasa por el Registro de Solicitudes de Cambio (CR-01 a CR-07, [Sección 11](11-decisiones-y-cambios.md)). Los principales cambios del release fueron:
  - el Product Goal más acotado (D-01 y D-02);
  - la entrega adelantada al 25/11 (CR-05);
  - el arrastre del Sprint 1 (CR-06);
  - HU-08 en versión simple, por el orden de recorte.
