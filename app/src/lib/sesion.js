// Lógica de registro e inicio de sesión (HU-01 y HU-05).
// RESPONSABLE: Dylan.
//
// Las pantallas (Registro.jsx e IniciarSesion.jsx) ya llaman a estas funciones.
// Solo hay que programar lo de adentro respetando lo que reciben y lo que devuelven.
// Los datos se leen y guardan con ../lib/almacen.js (leerDatos / guardarDatos).

const PENDIENTE = 'Esta función todavía no está programada (HU-01, tarea de Dylan).'

/**
 * Crea una cuenta nueva.
 *
 * Recibe:
 *   { nombre, correo, contrasena, rol, consentimiento }
 *   rol: 'persona_sorda' | 'funcionario' | 'interprete'
 *   consentimiento: { aceptado: true, version: '1.0' }   (HU-05)
 *
 * Devuelve:
 *   { ok: true, usuario }                         si se creó
 *   { ok: false, errores: { campo: 'mensaje' } }  si algún campo está mal
 *     campo puede ser: 'nombre' | 'correo' | 'contrasena' | 'rol' | 'consentimiento' | 'general'
 *
 * Reglas (criterios de aceptación de HU-01):
 *   - Un correo ya registrado devuelve errores.correo con un mensaje claro.
 *   - Cada cuenta queda con su rol.
 *   - Se guarda la fecha y la versión del aviso aceptado (HU-05).
 */
export function registrar(datos) {
  void datos
  return { ok: false, errores: { general: PENDIENTE } }
}

/**
 * Inicia sesión.
 *
 * Recibe: correo, contrasena
 * Devuelve:
 *   { ok: true, usuario }                    si los datos son correctos
 *   { ok: false, errores: { general: '...' } } si no
 */
export function iniciarSesion(correo, contrasena) {
  void correo
  void contrasena
  return { ok: false, errores: { general: PENDIENTE } }
}

/** Devuelve el usuario con sesión abierta, o null. */
export function usuarioActual() {
  return null
}

/** Cierra la sesión. */
export function cerrarSesion() {}
