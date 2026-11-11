# Sección 08 · Riesgos y adquisiciones

## 8.1 Matriz de Riesgos (Registro de Riesgos)

**Escala:** probabilidad (P) e impacto (I) de 1 a 3 (1 = bajo, 2 = medio, 3 = alto). **Prioridad = P × I:** 6 a 9 alta 🔴 · 3 a 4 media 🟡 · 1 a 2 baja 🟢.

| ID | Riesgo ("si ocurre X, entonces Y") | Categoría | Tipo | P | I | Prioridad | Dueño |
|---|---|---|---|---|---|---|---|
| R-01 | Si el equipo no termina el Sprint 1 a tiempo (ya se perdieron las semanas 4 a 8 de construcción), entonces el recorrido de la demo no queda listo para la Semana 13. | Alcance | Amenaza | 3 | 3 | 🔴 9 | Dylan |
| R-02 | Si el servicio de videollamada (Jitsi/JaaS) cambia sus condiciones, falla o no permite incrustar la llamada, entonces la videollamada no funciona en la demo. | Tercero | Amenaza | 2 | 3 | 🔴 6 | Dylan |
| R-03 | Si el equipo tarda en aprender React, entonces la velocidad del Sprint 1 baja y se atrasa el Sprint 2. | Técnico | Amenaza | 2 | 2 | 🟡 4 | Dylan |
| R-04 | Si coinciden entregas y exámenes de otros cursos a fin de cuatrimestre, entonces se pierden horas del Sprint. | Equipo | Amenaza | 3 | 2 | 🔴 6 | Dylan |
| R-05 | Si no se consigue una persona sorda o un intérprete voluntario, entonces la accesibilidad y la agenda no se validan con usuarios reales. | Negocio | Amenaza | 2 | 2 | 🟡 4 | Emily |
| R-06 | Si no se revisan contraste, teclado y textos en cada pantalla, entonces el prototipo incumple WCAG 2.1 AA y la Ley 7600. | Técnico | Amenaza | 2 | 2 | 🟡 4 | Emily |
| R-07 | Si se usan datos reales de personas en el prototipo, entonces se incumple la Ley 8968. | Negocio | Amenaza | 1 | 3 | 🟡 3 | Dylan |
| R-08 | Si se borra el almacenamiento del navegador o se cambia de computadora, entonces la demo se queda sin datos. | Técnico | Amenaza | 2 | 2 | 🟡 4 | Dylan |
| R-09 | Si el hosting gratuito (Vercel) falla el día de la demo, entonces no se puede mostrar el enlace público. | Tercero | Amenaza | 1 | 2 | 🟢 2 | Dylan |
| R-10 | Si se intenta agregar la asistencia en tiempo real o la IA durante los Sprints, entonces crece el alcance sin control y no se termina lo comprometido. | Alcance | Amenaza | 2 | 2 | 🟡 4 | Emily |
| R-11 | Si la red del aula es lenta el día de la demo, entonces la videollamada se corta o se ve mal. | Tercero | Amenaza | 2 | 3 | 🔴 6 | Dylan |
| R-12 | Si el Sprint 1 se termina antes de lo previsto, entonces se pueden incluir los opcionales (HU-02, TEC-01, HU-12) en el Sprint 2. | Alcance | Oportunidad | 2 | 2 | 🟡 4 | Emily |

### Mapa de calor

| Probabilidad ↓ / Impacto → | **1 · Bajo** | **2 · Medio** | **3 · Alto** |
|---|---|---|---|
| **3 · Alta** | 🟡 | 🔴 R-04 | 🔴 **R-01** |
| **2 · Media** | 🟢 | 🟡 R-03, R-05, R-06, R-08, R-10, R-12* | 🔴 R-02, R-11 |
| **1 · Baja** | 🟢 | 🟢 R-09 | 🟡 R-07 |

\* R-12 es una oportunidad.

**Zona roja:** R-01, R-02, R-04 y R-11. R-01 es el más peligroso porque ya se materializó en parte: las semanas 4 a 8 se usaron para planificar y no se construyó código. No se había visto antes porque el plan original asumía que la construcción empezaba en la Semana 4 en paralelo con el Expediente.

## 8.2 Plan de Mitigación

### Riesgos en zona roja

| ID | Estrategia | Acciones concretas (ítem del backlog) | Disparador | Contingencia | Revisión | Riesgo residual |
|---|---|---|---|---|---|---|
| **R-01** | Mitigar | Alcance reducido a 37 puntos (D-01 y D-02); prototipo sin servidor; Daily de 10 minutos; orden de recorte definido en la [Sección 07](07-estimacion-y-cronograma.md). | A mitad del Sprint 1 (16 nov) hay menos de la mitad de las horas en Hecho, o el Sprint 1 cierra con menos de 13 puntos. | Aplicar el orden de recorte: sin opcionales, HU-11 en pestaña nueva, HU-08 con aceptación automática. | 16 nov y 22 nov | P 2 · I 2 = 4 🟡 |
| **R-02** | Mitigar | Probar la llamada en el Sprint 1 (**SP-01**); usar JaaS en lugar de incrustar meet.jit.si; ensayar en el Sprint 2 (**MIT-04**). | SP-01 no logra conectar dos navegadores, o JaaS pide pago o corta la llamada. | Botón "Unirse a la llamada" que abre la sala en meet.jit.si en otra pestaña. Video de respaldo de la demo (**MIT-03**). | 22 nov | P 1 · I 2 = 2 🟢 |
| **R-04** | Mitigar | Fijar en el calendario un bloque semanal de horas para el proyecto; WIP de 1 tarea por persona; avisar en el Daily cualquier semana cargada. | Un integrante anuncia una semana con entregas de otros cursos o hay 2 Dailies seguidos sin avance. | Mover tareas al otro integrante y aplicar el orden de recorte. | Cada Daily | P 2 · I 2 = 4 🟡 |
| **R-11** | Mitigar | Probar la videollamada con la red del aula y con datos móviles (**MIT-04**); grabar un video del recorrido completo (**MIT-03**). | En la prueba, la llamada tarda más de 10 segundos en conectar o se corta. | Usar datos móviles del celular como punto de acceso o mostrar el video de respaldo. | 6 dic | P 1 · I 2 = 2 🟢 |

### Otros riesgos

| ID | Estrategia | Acción (ítem del backlog) | Disparador | Contingencia |
|---|---|---|---|---|
| R-03 | Mitigar | Usar la plantilla oficial de Vite y componentes simples; el primer día del Sprint 1, ambos hacen el tutorial oficial de React. | Al 13 nov no está lista la primera pantalla. | Hacer las pantallas que faltan con HTML y JavaScript simple dentro del mismo proyecto. |
| R-05 | Mitigar | Contactar a una asociación de personas sordas y a intérpretes desde la primera semana (Sección 10). | Al 18 nov no hay ningún voluntario confirmado. | Revisión con la lista WCAG y Lighthouse; se documenta como limitación. |
| R-06 | Evitar | La accesibilidad es parte de la DoD (criterio 4): Lighthouse 90 o más en cada pantalla. | Una pantalla da menos de 90. | Corregir antes de pasar a Hecho. |
| R-07 | Evitar | Solo datos ficticios (criterio 8 de la DoD); aviso de privacidad (HU-05). | Aparece un dato real en los datos de prueba. | Borrarlo de inmediato. |
| R-08 | Mitigar | Datos de prueba que se cargan solos y botón "Restablecer demo" (**MIT-02**). | La demo se abre sin datos. | Presionar "Restablecer demo". |
| R-09 | Aceptar | Publicar desde el Sprint 1 para detectar problemas temprano (**MIT-01**). | El enlace no carga. | Ejecutar la aplicación localmente con `npm run dev`. |
| R-10 | Evitar | Lo que no está en el Sprint Backlog no entra; los cambios solo se deciden en el Sprint Planning y se anotan en la Sección 11. | Alguien empieza una tarea que no está en el tablero. | La PO la devuelve al Product Backlog. |
| R-12 | Explotar | Tener HU-02, TEC-01 y HU-12 refinadas y listas para tomarlas. | Al 20 nov el Sprint 1 está casi terminado. | — |

### Acciones de mitigación agregadas al Sprint Backlog

| ID | Acción | Riesgo | Sprint | Responsable |
|---|---|---|---|---|
| MIT-01 | Publicar una primera versión en Vercel (ambiente de pruebas) | R-09, R-01 | Sprint 1 | Dylan |
| MIT-02 | Datos de prueba que se cargan solos y botón "Restablecer demo" | R-08 | Sprint 2 | Dylan |
| MIT-03 | Grabar un video de respaldo del recorrido completo | R-02, R-11 | Sprint 2 | Emily |
| MIT-04 | Probar la videollamada en la red del aula y con datos móviles | R-02, R-11 | Sprint 2 | Dylan |

## 8.3 Adquisiciones críticas

Con presupuesto ₡0, todas las adquisiciones son servicios con plan gratuito. El "contrato" son los términos de uso que se aceptan al crear la cuenta (contrato de adhesión).

| Servicio | Proveedor | Para qué | Tipo de contrato | Plan de salida |
|---|---|---|---|---|
| Videollamada (JaaS) | 8x8 / Jitsi | Incrustar la llamada en la plataforma | Plan gratuito, términos de uso | Abrir la sala en meet.jit.si en otra pestaña; video de respaldo. |
| Hosting | Vercel | Ambiente de pruebas y enlace de la demo | Plan gratuito (Hobby), términos de uso | Netlify o GitHub Pages; o ejecutar localmente. |
| Repositorio | GitHub | Código, Expediente e historial de cambios | Cuenta gratuita | Cada integrante tiene una copia local completa del repositorio. |
| Tablero | Trello | Seguimiento del Sprint | Plan gratuito | Exportar el tablero; el Excel tiene el mismo Sprint Backlog. |
| Librerías | React, Vite (código abierto, licencia MIT) | Construir la interfaz | Licencia abierta | No aplica. |

**Dependencia de terceros más crítica:** la videollamada (R-02). Por eso se prueba primero (SP-01) y tiene dos respaldos.
