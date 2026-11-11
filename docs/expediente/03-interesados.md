# Sección 03 · Interesados (stakeholders)

Los interesados son las personas, grupos u organizaciones que pueden afectar al proyecto o verse afectados por él. Poder e interés se valoran de 1 a 5; para el mapa se considera **alto** un valor de 4 o 5 y **bajo** un valor de 1 a 3.

## 3.1 Registro de interesados

| **Interesado**                                           | **Rol / relación**            | **Necesidad**                                                    | **Poder** | **Interés** | **Actitud** | **Estrategia**                                                                | **Responsable** |
|----------------------------------------------------------|-------------------------------|------------------------------------------------------------------|-----------|-------------|-------------|-------------------------------------------------------------------------------|-----------------|
| Personas sordas usuarias de LESCO                        | Usuarios finales              | Comunicarse con autonomía y privacidad en sus trámites           | 4         | 5           | Favorable   | Gestionar de cerca: validar cada incremento con ellas                         | Emily           |
| Intérpretes de LESCO certificados                        | Proveedores del servicio      | Agenda ordenada, buena calidad de video, trabajo reconocido      | 4         | 4           | Neutral     | Gestionar de cerca: involucrarlos en el diseño de la agenda y la videollamada | Emily           |
| Docente del curso                                        | Patrocinador y evaluador      | Entregables a tiempo y alineados con el curso                    | 5         | 4           | Favorable   | Gestionar de cerca: revisión en cada entrega y Sprint Review                  | Dylan           |
| Equipo de desarrollo                                     | Ejecuta el proyecto           | Alcance realista y aprobación del curso                          | 4         | 5           | Favorable   | Gestionar de cerca: Daily Scrum y Retrospectiva                               | Dylan           |
| Funcionarios de instituciones y comercios (CCSS, bancos) | Usuarios secundarios          | Atender a personas sordas sin saber LESCO, con un proceso simple | 2         | 4           | Neutral     | Mantener informados: guía rápida de uso                                       | Emily           |
| Asociaciones de personas sordas                          | Representan a la comunidad    | Que la solución respete la LESCO y la cultura sorda              | 3         | 4           | Neutral     | Mantener informadas y consultarlas en las validaciones                        | Emily           |
| CONAPDIS                                                 | Ente rector en discapacidad   | Cumplimiento de la accesibilidad (Ley 7600)                      | 4         | 2           | Neutral     | Mantener satisfecho: alinear la plataforma con la normativa de accesibilidad  | Dylan           |
| PRODHAB                                                  | Regulador de datos personales | Tratamiento legal de datos personales y sensibles                | 5         | 1           | Neutral     | Mantener satisfecho: cumplir la Ley 8968 (consentimiento, seguridad)          | Dylan           |

**Casos discutibles.** A las personas sordas se les asignó poder 4, aunque no aprueban formalmente el proyecto, porque si no adoptan la plataforma el producto fracasa. A la PRODHAB se le asignó poder 5 e interés 1: hoy no conoce el proyecto, pero podría sancionar un mal manejo de datos.

## 3.2 Mapa Poder-Interés

| | **Interés bajo** | **Interés alto** |
|---|---|---|
| **Poder alto** | **Mantener satisfecho:** CONAPDIS, PRODHAB | **Gestionar de cerca:** Personas sordas usuarias, Intérpretes de LESCO, Docente del curso, Equipo de desarrollo |
| **Poder bajo** | **Monitorear:** — | **Mantener informado:** Funcionarios de instituciones y comercios, Asociaciones de personas sordas |

*La posición de cada interesado es una hipótesis de trabajo y se revisará en cada Sprint Review.*

## 3.3 Interesados críticos y cómo los involucraremos

- **Personas sordas usuarias:** se invitará a al menos una persona sorda a probar el incremento de cada Sprint; sus observaciones entran directamente al Product Backlog.
- **Intérpretes de LESCO:** se les consultará antes de construir el formulario de disponibilidad (Sprint 1, semanas 9–10) y la agenda con videollamada (Sprint 2, semanas 11–12), porque sin su participación no existe el servicio.
- **Docente:** se le presentará el avance en cada entrega del Expediente y en la Sprint Review, para recibir aprobación y retroalimentación oportunas.

> *Actualización (11/11/2026): los números de Sprint de esta lista se ajustaron a la replanificación D-01 ([Sección 11](11-decisiones-y-cambios.md)). El plan de comunicación con cada interesado está en la [Sección 10](10-comunicaciones-y-tablero.md).*

## 3.4 Preguntas de análisis

- **¿A quién involucrar primero?** A las personas sordas y a los intérpretes, porque definen la necesidad real y la viabilidad del servicio.
- **¿Quién puede bloquear una decisión?** El docente (aprobación académica), la PRODHAB (aspectos legales) y los intérpretes (sin ellos no hay servicio).
- **¿Quién necesita información frecuente?** El docente y los intérpretes que participan en las validaciones.
- **¿A quién estamos subestimando?** A las asociaciones de personas sordas, que dan legitimidad al proyecto ante la comunidad.
- **¿Qué conflicto de expectativas puede aparecer?** Los intérpretes prefieren una agenda predecible, mientras que los usuarios quieren atención inmediata. También hay tensión entre la privacidad del usuario y el registro de sesiones.
