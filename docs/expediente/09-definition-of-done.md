# Sección 09 · Calidad y Definition of Done (DoD)

**Versión:** 1.0 · **Fecha:** 11/11/2026 · **Acordada por:** Emily Zúñiga (Product Owner) y Dylan Jiménez (Scrum Master)

## 9.1 Propósito

La Definition of Done es la descripción compartida de qué significa **"terminado"** para nuestro producto. Una historia está terminada cuando cumple **sus criterios de aceptación** (hace lo correcto) **y esta DoD** (está bien hecha). Lo que no cumple la DoD no entra al Incremento ni cuenta para la velocidad: vuelve al Product Backlog.

## 9.2 Criterios de calidad (lista verificable)

Una historia está **Hecha** cuando:

1. **Criterios de aceptación cumplidos:** todos los criterios de la historia se probaron y la Product Owner los aceptó.
2. **Código integrado:** el código está en la rama `main` del repositorio y el mensaje del *commit* empieza con el ID de la historia (por ejemplo, `HU-01: registro con rol`).
3. **Revisado por el otro integrante:** quien no la programó la revisó y la probó antes de pasarla a Hecho.
4. **Accesible (WCAG 2.1 AA):** contraste mínimo de 4.5:1, toda la pantalla se usa con teclado, los íconos llevan texto, nada depende del audio, y la revisión de accesibilidad de Lighthouse da 90 o más.
5. **Adaptable:** funciona en Chrome y Firefox, en escritorio y en vista de celular.
6. **Sin errores visibles:** no hay errores en la consola del navegador al recorrer la historia.
7. **Publicado:** la versión funciona en el ambiente de pruebas (Vercel), no solo en la computadora de quien la programó.
8. **Datos ficticios:** solo se usan datos de prueba inventados; nunca datos reales de personas (Ley 8968).
9. **Registrado:** la tarjeta de Trello está en Hecho con el enlace al *commit*, y si la historia cambió algo del plan, se actualizó el Excel o el Expediente.

## 9.3 Pruebas exigidas

| Tipo | Qué se prueba | Cuándo |
|---|---|---|
| **Manuales** | Cada criterio de aceptación de la historia, uno por uno, siguiendo la lista de la tarjeta. | Al pasar la tarjeta a "En revisión". |
| **Unitarias** | Las funciones con reglas de negocio: validación de traslapes de disponibilidad (HU-03), bloqueo de horario al agendar (HU-07). Se hacen con Vitest. | Al programar esas funciones. |
| **De integración** | El recorrido completo de la demo: registro → disponibilidad → buscar → agendar → aceptar → videollamada. | Al final de cada Sprint, antes de la Sprint Review. |
| **De accesibilidad** | Lighthouse en cada pantalla nueva y, cuando se pueda, prueba con una persona sorda o un intérprete. | En cada historia con interfaz. |

## 9.4 Integración y despliegue

- **Rama principal:** `main`. Si una historia es grande, se trabaja en una rama con su ID (por ejemplo, `hu-03-disponibilidad`) y se une a `main` después de la revisión.
- **Ambiente de pruebas:** Vercel publica automáticamente cada cambio en `main`. Ese mismo enlace se usa en la Sprint Review y en la demo final.
- **Respaldo:** si el despliegue falla, la aplicación se puede ejecutar localmente con `npm run dev` (ver riesgo R-09 en la [Sección 08](08-riesgos-y-adquisiciones.md)).

## 9.5 Documentación mínima requerida

- Un `README.md` en la carpeta de la aplicación con cómo instalarla y ejecutarla, y los usuarios de prueba.
- El estado de cada ítem actualizado en el Excel y en Trello.
- Una entrada en el [historial de cambios](historial-de-cambios.md) cada vez que se modifica el Expediente.
- La decisión tecnológica de SP-01 (por qué Jitsi/JaaS) anotada en la [Sección 11](11-decisiones-y-cambios.md).

## 9.6 Acuerdo del equipo

| Rol | Nombre | Fecha |
|---|---|---|
| Product Owner | Emily Zúñiga Solano | 11/11/2026 |
| Scrum Master | Dylan Jiménez Alfaro | 11/11/2026 |

La DoD se revisa en cada Retrospectiva. Si se cambia, se sube la versión (1.1, 1.2…) y se anota en el historial de cambios.
