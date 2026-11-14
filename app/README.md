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
| `src/lib/sesion.js` | Registro e inicio de sesión. Las pantallas ya lo llaman; **la lógica está pendiente (HU-01, Dylan)** y cada función explica qué recibe y qué devuelve |
| `src/index.css` | Guía de estilo base: colores con contraste AA, tipografía, botones y foco visible |

## Reglas del equipo (Definition of Done)

- El mensaje de cada commit empieza con el ID de la historia, por ejemplo `HU-04: guía de estilo accesible`.
- Antes de pasar una tarjeta a "Hecho": accesibilidad de Lighthouse ≥ 90, sin errores en la consola, funciona en celular y la revisó el otro integrante.
- Solo datos ficticios.

Detalle completo: `docs/expediente/09-definition-of-done.md`.
