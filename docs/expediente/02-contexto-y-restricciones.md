# Sección 02 · Contexto organizacional y restricciones

## 2.1 Organización y estructura

La Plataforma web de intermediación LESCO es un proyecto académico desarrollado en la Universidad Técnica Nacional, Sede de San Carlos, dentro del curso ISW-912. El trabajo lo realiza un equipo dedicado de dos personas que se autogestiona, por lo que funciona como una **estructura orientada a proyectos**: el equipo tiene autoridad alta sobre cómo organiza su trabajo, condición favorable para aplicar Scrum.

El docente cumple un papel similar al de una **PMO de control**: define las plantillas (Expediente del Proyecto), las fechas de entrega y los criterios de evaluación. En esta fase no existe una institución cliente formal; por eso la validación del producto se hará con personas sordas e intérpretes voluntarios.

## 2.2 Factores ambientales de la empresa (EEF)

Son condiciones que el equipo no controla, pero que influyen en el proyecto:

| Tipo | Factor | Impacto en el proyecto |
|---|---|---|
| Interno | Capacidad del equipo: 2 integrantes con disponibilidad parcial por otros cursos. | Limita cuánto alcance se puede comprometer en cada Sprint. |
| Interno | Infraestructura y herramientas: computadoras personales, GitHub y servicios en la nube con planes gratuitos. | Condiciona el hosting, el almacenamiento de datos y el servicio de videollamada. |
| Interno | Cultura y calendario académico: entregas semanales y cierre fijo en la Semana 13. | La fecha final no es negociable; se ajusta el alcance, no el plazo. |
| Externo | Ley 9822 de Reconocimiento y Promoción de la LESCO (sustituyó a la Ley 9049). | Respalda la necesidad y obliga a respetar la LESCO como lengua de la comunidad sorda. |
| Externo | Ley 7600 de Igualdad de Oportunidades para las Personas con Discapacidad. | La plataforma debe ser accesible en todo su recorrido. |
| Externo | Ley 8968 de Protección de la Persona frente al Tratamiento de sus Datos Personales. | Exige consentimiento informado y seguridad; las citas pueden revelar datos sensibles (salud, finanzas). |
| Externo | Escasez de intérpretes de LESCO certificados en el país. | Afecta la disponibilidad del servicio en tiempo real y la validación con intérpretes reales. |
| Externo | Baja madurez de la IA para la gramática de la LESCO. | La interpretación con IA se mantiene como función experimental, no como base del producto. |
| Externo | Conectividad de los usuarios. | La videollamada debe funcionar razonablemente con conexiones lentas. |

## 2.3 Restricciones del proyecto (actualizadas el 11/11/2026)

| Restricción | Descripción |
|---|---|
| **Tiempo** | Entrega final en la Semana 13 (7 al 13 de diciembre de 2026). Semanas 3 a 8: Sprint 0 de inicio y planificación. Semanas 9 a 12: 2 Sprints de construcción de 2 semanas. Semana 13: cierre y demo. |
| **Costo** | Sin presupuesto monetario (₡0): solo herramientas gratuitas o con licencia educativa. |
| **Recursos** | 2 integrantes con disponibilidad parcial, ya que comparten el proyecto con otros cursos. |
| **Alcance** | El incremento final es un **prototipo funcional de demostración** centrado en agendar una cita con un intérprete y realizarla por videollamada. La asistencia en tiempo real y la IA quedan como trabajo futuro. |
| **Calidad** | Accesibilidad según WCAG 2.1 nivel AA; la interfaz no debe depender del audio. |
| **Tecnología** | Aplicación web adaptable (responsive) hecha con React + Vite. Los datos se simulan en el navegador (archivo de datos inicial + `localStorage`), sin servidor propio. La videollamada se integra con Jitsi (JaaS, plan gratuito) en lugar de desarrollarla desde cero. Despliegue en un hosting gratuito (Vercel). |
| **Normativa** | Cumplimiento de la Ley 8968 (datos personales) y de la Ley 7600 (accesibilidad). En el prototipo solo se usan datos ficticios. |

> **Restricciones originales (Semana 4):** la construcción se organizaba en 5 Sprints de 2 semanas (Semanas 4 a 13) y el alcance incluía la IA como prototipo experimental. Se cambiaron por las decisiones D-01 y D-02 ([Sección 11](11-decisiones-y-cambios.md)).
