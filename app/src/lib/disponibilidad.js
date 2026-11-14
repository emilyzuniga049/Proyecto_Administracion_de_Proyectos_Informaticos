// Perfil y disponibilidad del intérprete (HU-03).
// RESPONSABLE: Dylan ("Programar la consulta de disponibilidad y la validación de traslapes").
//
// La pantalla Disponibilidad.jsx (Emily) ya llama a estas funciones.
// Solo hay que programar lo de adentro respetando lo que reciben y devuelven.
// Los datos están en ../data/datos-iniciales.json (listas "interpretes" y "disponibilidad")
// y se leen y guardan con ../lib/almacen.js (leerDatos / guardarDatos).
//
// Un bloque de disponibilidad tiene esta forma:
//   { id: 'd-1', interpreteId: 'u-3', dia: 'lunes', inicio: '08:00', fin: '12:00' }
//   dia: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo'
//   inicio y fin: 'HH:MM' en formato de 24 horas

const PENDIENTE = 'Esta función todavía no está programada (HU-03, tarea de Dylan).'

/**
 * Devuelve el perfil del intérprete:
 *   { descripcion: '...', especialidades: ['Salud', ...] }
 * o null si no existe.
 */
export function obtenerPerfil(interpreteId) {
  void interpreteId
  return null
}

/**
 * Guarda el perfil.
 * Recibe: interpreteId, { descripcion, especialidades }
 * Devuelve: { ok: true } o { ok: false, errores: { descripcion | especialidades | general: 'mensaje' } }
 */
export function guardarPerfil(interpreteId, perfil) {
  void interpreteId
  void perfil
  return { ok: false, errores: { general: PENDIENTE } }
}

/**
 * Devuelve los bloques del intérprete, ordenados por día y hora de inicio.
 * Si no tiene ninguno, devuelve [].
 */
export function listarBloques(interpreteId) {
  void interpreteId
  return []
}

/**
 * Crea un bloque (si no trae id) o edita uno existente (si trae id).
 * Recibe: interpreteId, { id?, dia, inicio, fin }
 * Devuelve:
 *   { ok: true, bloque }
 *   { ok: false, errores: { campo: 'mensaje' } }   campo: 'dia' | 'inicio' | 'fin' | 'general'
 *
 * Reglas (criterios de aceptación de HU-03):
 *   - fin tiene que ser después de inicio  → errores.fin
 *   - no se permiten bloques traslapados el mismo día → errores.general, con un mensaje
 *     que diga con cuál choca, por ejemplo "Choca con su horario del lunes de 08:00 a 12:00."
 *   - Prueba unitaria de la validación de traslapes (Vitest), según la DoD.
 */
export function guardarBloque(interpreteId, bloque) {
  void interpreteId
  void bloque
  return { ok: false, errores: { general: PENDIENTE } }
}

/**
 * Elimina un bloque.
 * Devuelve: { ok: true } o { ok: false, errores: { general: 'mensaje' } }
 */
export function eliminarBloque(interpreteId, bloqueId) {
  void interpreteId
  void bloqueId
  return { ok: false, errores: { general: PENDIENTE } }
}
