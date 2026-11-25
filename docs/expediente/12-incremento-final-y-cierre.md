# Sección 12 · Incremento final y cierre del proyecto (Informe Final)

## 12.1 Resumen

| Dato | Valor |
|---|---|
| **Proyecto** | Plataforma web de intermediación LESCO (Puente LESCO) |
| **Equipo** | Emily Zúñiga Solano (Product Owner + Developer) y Dylan Jiménez Alfaro (Scrum Master + Developer) |
| **Entrega** | Miércoles 25 de noviembre de 2026 (Semana 11) |
| **Incremento publicado** | https://proyecto-administracion-de-proyecto.vercel.app/ |
| **Repositorio** | https://github.com/emilyzuniga049/Proyecto_Administracion_de_Proyectos_Informaticos |
| **Video del recorrido (MIT-03)** | https://drive.google.com/file/d/1qKJG8yZgsjDho2Cl2zSVYMjNAVypm3rE/view?usp=sharing |
| **Resultado** | **Product Goal cumplido.** Una persona sorda o un funcionario puede buscar un intérprete de LESCO, agendar una cita y realizarla por videollamada dentro de la plataforma. |

## 12.2 Incremento final

### Qué hace el producto

| Función | Historia | Ruta |
|---|---|---|
| Crear una cuenta con rol y consentimiento informado (Ley 8968) | HU-01, HU-05 | `/registro`, `/privacidad` |
| Iniciar sesión y ver un panel con las opciones del rol | HU-01 | `/iniciar-sesion`, `/panel` |
| Interfaz accesible: contraste AA, teclado, "Saltar al contenido", íconos con texto, celular | HU-04 | Todas |
| Perfil y horarios del intérprete, sin traslapes | HU-03 | `/disponibilidad` |
| Buscar intérpretes por fecha, franja y trámite, con sugerencia de fecha cercana | HU-06 | `/buscar` |
| Agendar una cita con confirmación y bloqueo del horario | HU-07 | `/agendar` |
| Ver las citas: "Mis citas" y "Mi agenda de citas" del intérprete | HU-08 (simple) | `/mis-citas` |
| Entrar a la videollamada de la cita (10 minutos antes, solo sus participantes) | HU-11 | `/citas/:id/llamada` |
| Llamada de prueba entre dos navegadores | SP-01 | `/videollamada-prueba` |
| Restablecer los datos de prueba y crear una cita de demostración | MIT-02 | Pie de todas las páginas |

### Cómo probarlo

- Todos los usuarios usan la contraseña `demo1234`: `ana@demo.cr` (persona sorda), `carlos@demo.cr` (funcionario), `laura@demo.cr` y `diego@demo.cr` (intérpretes) y `admin@demo.cr`.
- El botón **Restablecer datos de prueba** crea una cita entre Ana y Laura en la media hora actual, para mostrar la videollamada sin esperar.
- Instrucciones técnicas: `app/README.md`.

## 12.3 Alcance logrado frente al planificado

| Grupo | Planificado | Logrado |
|---|---|---|
| Comprometido (HU-01, 05, 04, 03, 06, 07, 08, 11 y SP-01) | 37 puntos | **37 puntos (100 %)** |
| HU-08 | Aceptar o rechazar | Versión simple (aceptación automática), según el orden de recorte de la Sección 07 |
| Opcionales (HU-02, TEC-01, HU-12) | Solo si sobraba velocidad | No entraron. El despliegue y las pruebas de accesibilidad de TEC-01 se cubrieron con MIT-01 y la DoD. |
| Trabajo futuro (HU-09, 10, 13 a 21) | Fuera del release (D-02) | Siguen en el Product Backlog |

Detalle del alcance y de los criterios de aceptación: [Sección 06](06-alcance-y-backlog.md).

## 12.4 Métricas del proyecto

| Métrica | Sprint 1 (9–19 nov) | Sprint 2 (20–25 nov) | Release |
|---|---|---|---|
| Puntos comprometidos | 18 | 37 (18 arrastrados + 19) | 37 |
| Puntos terminados según la DoD | 0 | 37 | 37 |
| Velocidad real | 0 | 37 | — |
| SPI (terminados ÷ comprometidos) | 0 | 1 | 1 al cierre |

**Otras medidas:**
- **Pruebas automáticas (Vitest):** 46 pruebas de la lógica, en 4 archivos `app/src/lib/*.test.js`; todas pasan.
- **Accesibilidad:** Lighthouse 100 en las 6 pantallas del Sprint 1 (`docs/evidencias/sprint-1/lighthouse/`). Las pantallas del Sprint 2 se revisaron con Lighthouse en la revisión cruzada (DoD, criterio 4).
- **Costo estimado del release:** ₡620 000, con la tarifa hipotética de ₡5 000 por hora de la [Sección 07](07-estimacion-y-cronograma.md). El costo en herramientas fue de ₡0.
- **Cambios de alcance registrados:** CR-01 a CR-07 y decisiones D-01 a D-06 ([Sección 11](11-decisiones-y-cambios.md)).

**Lectura:** el Sprint 1 terminó sin ningún ítem que cumpliera la DoD, sobre todo porque faltaba la publicación en Vercel y la lógica llegó tarde. El equipo lo reconoció en la Retrospective, aplicó el orden de recorte y cumplió todo el compromiso en el Sprint 2.

## 12.5 Riesgos al cierre

| Riesgo | Qué pasó |
|---|---|
| R-01 · No terminar a tiempo | Se materializó en el Sprint 1 (velocidad 0). Respuesta: alcance de 37 puntos, recorte de HU-08 y arrastre al Sprint 2. Al cierre, el compromiso está completo. |
| R-02 · Falla la videollamada | Mitigado con SP-01: la llamada funcionó en Vercel entre computadora y celular. Queda el límite de 5 minutos de meet.jit.si, con el plan B "Abrir en otra pestaña" (D-05). |
| R-05 · No conseguir usuarios para validar | No ocurrió: una persona sorda y un intérprete voluntario validaron el 23/11. |
| R-07 · Usar datos reales | Evitado: solo hay datos ficticios (`@demo.cr`). |
| R-08 · La demo se queda sin datos | Mitigado con MIT-02: botón para restablecer los datos y cita de demostración. |
| R-09 · Falla Vercel el día de la demo | Mitigado con MIT-03: video de respaldo del recorrido, grabado el 24/11 ([enlace](https://drive.google.com/file/d/1qKJG8yZgsjDho2Cl2zSVYMjNAVypm3rE/view?usp=sharing)). |
| R-11 · Red lenta en el aula | Aceptado (CR-07): la llamada se probó con datos móviles; se puede usar el celular como punto de acceso. |

## 12.6 Lecciones aprendidas

| # | Lección | De dónde salió |
|---|---|---|
| L-1 | **Publicar desde el primer día.** Sin ambiente de pruebas, ninguna historia puede cumplir la DoD aunque el código esté listo. | Retro del Sprint 1 (A-1) |
| L-2 | **Revisar en menos de 24 horas.** Las tarjetas que esperan revisión frenan todo el Sprint. Con la regla WA-05, en el Sprint 2 todas se revisaron el mismo día o al siguiente. | Retros 1 y 2 (A-2) |
| L-3 | **Repartir el trabajo desde el Sprint Planning y trabajar en paralelo.** En el Sprint 1 la lógica empezó tarde y las pantallas no se podían probar completas. | Retros 1 y 2 |
| L-4 | **Un orden de recorte acordado de antemano ahorra discusiones.** Cuando la velocidad salió baja, HU-08 pasó a su versión simple sin poner en riesgo el Product Goal. | Sección 07 y CR-06 |
| L-5 | **Probar primero lo más incierto.** La prueba de concepto de la videollamada (SP-01) bajó el riesgo técnico más alto antes de construir HU-11. | Sección 08 (R-02) |
| L-6 | **Anotar el Daily el mismo día.** Los días sin registro hacen difícil reconstruir el avance. | Retro del Sprint 2 (A-6) |
| L-7 | **Registrar los cambios y no esconderlos.** Documentar el arrastre y la entrega adelantada (CR-05 y CR-06) dejó un plan creíble y fácil de explicar. | Sección 11 |

## 12.7 Trabajo futuro recomendado

En orden de valor:
1. **Asistencia inmediata** (HU-15 y HU-16): la otra mitad del Product Goal original.
2. **Aceptar o rechazar citas** (HU-08 completa) y **cancelar o reagendar** (HU-09).
3. **Verificar la certificación del intérprete** (HU-02) y el panel del administrador (HU-20).
4. **Servidor y base de datos reales**, con autenticación segura, para dejar de usar datos en el navegador.
5. Servidor de video propio o JaaS, para no tener el límite de 5 minutos.
6. Interpretación experimental con IA (HU-21), siempre como apoyo y nunca en lugar del intérprete humano.

## 12.8 Cierre del proyecto

| Actividad de cierre | Estado |
|---|---|
| Aceptación del incremento por la Product Owner | Hecha en la Sprint Review del 24/11 ([acta](acta-sprint-2.md)): 37 de 37 puntos |
| Expediente completo (Secciones 00 a 12) | Hecho |
| Product Backlog y Trello actualizados | Hecho: todo lo comprometido en "Hecho"; opcionales y trabajo futuro en el Product Backlog |
| Evidencias | Lighthouse en `docs/evidencias/`, pruebas en `app/src/lib/*.test.js` y [video de respaldo](https://drive.google.com/file/d/1qKJG8yZgsjDho2Cl2zSVYMjNAVypm3rE/view?usp=sharing) (MIT-03, 24/11) |
| Lecciones aprendidas | 12.6 |
| Entrega al docente | 25/11/2026: enlace del repositorio, enlace de Vercel y demo en vivo |

## 12.9 Guion de la demostración

Duración aproximada: 10 minutos. Antes de empezar:
- Abrir la app en la computadora y en el celular y tocar **Restablecer datos de prueba**.
- Tener a mano el video de respaldo (MIT-03): https://drive.google.com/file/d/1qKJG8yZgsjDho2Cl2zSVYMjNAVypm3rE/view?usp=sharing

| # | Paso | Quién | Qué mostrar | Min. |
|---|---|---|---|---|
| 1 | Problema y Product Goal | Emily | Barrera de comunicación de la comunidad sorda; qué promete el prototipo (Sección 01) | 1 |
| 2 | Crear cuenta | Emily | `/registro`: rol, casilla obligatoria del aviso de privacidad, error si no se marca | 1 |
| 3 | Interfaz accesible | Emily | Navegar con Tab, "Saltar al contenido", foco visible, vista en el celular | 1 |
| 4 | Horarios del intérprete | Dylan | `laura@demo.cr` → "Mi perfil y mis horarios": agregar un bloque que choque y ver el mensaje | 1,5 |
| 5 | Buscar intérprete | Dylan | `ana@demo.cr` → "Agendar una cita": buscar el domingo (sugiere el lunes) y luego un día con resultados | 1,5 |
| 6 | Agendar | Emily | Elegir una hora, confirmar sin trámite (lo pide), elegir "Salud" y ver la confirmación | 1 |
| 7 | Agenda del intérprete | Emily | `laura@demo.cr` → "Mi agenda de citas": la cita aparece confirmada | 0,5 |
| 8 | Videollamada de la cita | Dylan | Ana en la computadora y Laura en el celular → cita de demostración → "Unirse a la llamada"; con `carlos@demo.cr` no se puede entrar | 1,5 |
| 9 | Cómo se gestionó | Dylan | Trello, velocidad (0 y 37), arrastre y recorte (Secciones 07 y 11) | 1 |

**Si algo falla:**
- Si no carga la llamada, usar **Abrir en otra pestaña**.
- Si no hay red, compartir el celular como punto de acceso.
- Si falla Vercel, mostrar el video de respaldo o correr `npm run dev`.

### Reparto propuesto para la defensa oral

Cada integrante responde por sus secciones, de acuerdo con su rol:

| Integrante | Secciones |
|---|---|
| Emily (Product Owner) | 01 Problema y Product Goal · 03 Interesados · 05 Backlog y seguimiento · 06 Alcance y criterios de aceptación · 09 Definition of Done · 12 Cierre |
| Dylan (Scrum Master) | 02 Contexto y restricciones · 04 Ciclo de vida · 07 Estimación y cronograma · 08 Riesgos y adquisiciones · 10 Comunicación y Working Agreements · 11 Decisiones y cambios |
| Los dos | 00 Portada y Scrum Team, y las actas de los Sprints |
