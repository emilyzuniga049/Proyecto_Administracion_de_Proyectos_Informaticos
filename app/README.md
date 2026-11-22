# Puente LESCO · prototipo

Prototipo de la Plataforma web de intermediación LESCO (Proyecto Incremental, ISW-912, UTN San Carlos).

Es una aplicación **React + Vite** sin servidor: los datos se simulan en el navegador (`localStorage`) y todos son ficticios. Las decisiones están en el Expediente, Secciones 02 y 11 (decisión D-02).

## Cómo ejecutarla

Requiere [Node.js](https://nodejs.org) 20 o más reciente.

```bash
cd app
npm install      # solo la primera vez
npm run dev      # abre http://localhost:5173
```

Otros comandos:

| Comando | Para qué |
|---|---|
| `npm test` | Corre las pruebas unitarias (Vitest) |
| `npm run build` | Genera la versión publicable en `dist/` |
| `npm run preview` | Sirve la versión de `dist/` para probarla |

## Pantallas

| Ruta | Pantalla | Historia |
|---|---|---|
| `/` | Inicio | — |
| `/registro` | Crear una cuenta, con rol y consentimiento obligatorio | HU-01, HU-05 |
| `/iniciar-sesion` | Iniciar sesión | HU-01 |
| `/panel` | Mi panel: opciones según el rol (requiere sesión) | HU-01 |
| `/disponibilidad` | Perfil y horarios del intérprete (solo intérpretes) | HU-03 |
| `/videollamada-prueba` | Llamada de prueba entre dos navegadores | SP-01 |
| `/privacidad` | Aviso de privacidad | HU-05 |

## Videollamada (SP-01)

Por defecto usa el servidor público **meet.jit.si**: no necesita cuenta, pero las llamadas incrustadas se cortan a los 5 minutos. Para usar **JaaS** (8x8, gratuito), cree la cuenta y ponga su App ID en `app/.env.local` (y en las variables de entorno de Vercel):

```
VITE_JAAS_APP_ID=vpaas-magic-cookie-xxxxxxxx
```

Cómo probar: abra `/videollamada-prueba` en dos navegadores o equipos, escriba la misma sala y entre en ambos. Si la llamada no carga, el botón **Abrir en otra pestaña** abre la misma sala directamente en Jitsi (plan B del riesgo R-02).

## Usuarios de prueba

Todos usan la contraseña `demo1234`. Son personas ficticias.

| Correo | Rol |
|---|---|
| ana@demo.cr | Persona sorda |
| carlos@demo.cr | Funcionario institucional |
| laura@demo.cr | Intérprete |
| diego@demo.cr | Intérprete |
| admin@demo.cr | Administración |

El botón **Restablecer datos de prueba** (al pie de cada página) borra lo guardado en el navegador y vuelve a estos datos.

## Estructura

| Carpeta | Contenido |
|---|---|
| `src/pages/` | Una pantalla por archivo. `Pendiente.jsx` marca las que todavía no se construyen. |
| `src/components/` | Partes comunes: `Layout` (encabezado, menú, pie), `Campo` (campo de formulario accesible), `SelectorRol` (tarjetas de rol) e `Icono` (íconos de línea, siempre con texto) |
| `src/data/datos-iniciales.json` | Usuarios, intérpretes y disponibilidad de prueba |
| `src/lib/almacen.js` | Leer, guardar y restablecer los datos del navegador |
| `src/lib/disponibilidad.js` | Perfil y horarios del intérprete, con la validación de traslapes (HU-03) |
| `src/lib/jitsi.js` | Configuración de la videollamada (meet.jit.si o JaaS) |
| `src/data/catalogos.js` | Listas fijas: días, especialidades y versión del aviso de privacidad |
| `src/lib/sesion.js` y `useSesion.js` | Registro, inicio y cierre de sesión, y el usuario con sesión abierta (HU-01, HU-05) |
| `src/index.css` | Guía de estilo base: colores con contraste AA, tipografía, botones y foco visible |

## Reglas del equipo (Definition of Done)

- El mensaje de cada commit empieza con el ID de la historia, por ejemplo `HU-04: guía de estilo accesible`.
- Antes de pasar una tarjeta a "Hecho": accesibilidad de Lighthouse ≥ 90, sin errores en la consola, funciona en celular y la revisó el otro integrante.
- Solo datos ficticios.

Detalle completo: `docs/expediente/09-definition-of-done.md`.
