// Perfil y disponibilidad del intérprete (HU-03).
// RESPONSABLE: Dylan ("Programar la consulta de disponibilidad y la validación de traslapes").
//
// La pantalla Disponibilidad.jsx (Emily) llama a estas funciones.
// Los datos están en ../data/datos-iniciales.json (listas "interpretes" y "disponibilidad")
// y se leen y guardan con ../lib/almacen.js.
//
// Un bloque de disponibilidad tiene esta forma:
//   { id: 'd-1', interpreteId: 'u-3', dia: 'lunes', inicio: '08:00', fin: '12:00' }
//   dia: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo'
//   inicio y fin: 'HH:MM' en formato de 24 horas
import { guardarDatos, leerDatos } from './almacen.js'
import { DIAS, ESPECIALIDADES } from '../data/catalogos.js'

const FORMATO_HORA = /^([01]\d|2[0-3]):[0-5]\d$/
const MAX_DESCRIPCION = 300

const ordenDia = (dia) => DIAS.findIndex((d) => d.valor === dia)
const textoDia = (dia) => (DIAS.find((d) => d.valor === dia)?.texto ?? dia).toLowerCase()

/**
 * ¿El bloque choca con alguno de los otros bloques del mismo día?
 * Dos bloques que solo se tocan (uno termina a las 12:00 y el otro empieza a las 12:00) no chocan.
 * Devuelve el bloque con el que choca, o null.
 */
export function buscarTraslape(bloque, otros) {
  return (
    otros.find(
      (o) =>
        o.id !== bloque.id &&
        o.dia === bloque.dia &&
        bloque.inicio < o.fin &&
        o.inicio < bloque.fin,
    ) ?? null
  )
}

/** Devuelve el perfil del intérprete ({ descripcion, especialidades, verificado }) o null. */
export function obtenerPerfil(interpreteId) {
  const perfil = leerDatos().interpretes.find((i) => i.usuarioId === interpreteId)
  if (!perfil) return null
  return {
    descripcion: perfil.descripcion ?? '',
    especialidades: perfil.especialidades ?? [],
    verificado: Boolean(perfil.verificado),
  }
}

/**
 * Guarda el perfil.
 * Devuelve { ok: true } o { ok: false, errores: { descripcion | especialidades: 'mensaje' } }
 */
export function guardarPerfil(interpreteId, perfil) {
  const descripcion = (perfil?.descripcion ?? '').trim()
  const especialidades = (perfil?.especialidades ?? []).filter((e) => ESPECIALIDADES.includes(e))
  const errores = {}

  if (descripcion.length > MAX_DESCRIPCION) {
    errores.descripcion = `Escriba como máximo ${MAX_DESCRIPCION} caracteres.`
  }
  if (especialidades.length === 0) {
    errores.especialidades = 'Marque al menos un tipo de trámite.'
  }
  if (Object.keys(errores).length > 0) return { ok: false, errores }

  const datos = leerDatos()
  const existente = datos.interpretes.find((i) => i.usuarioId === interpreteId)
  if (existente) {
    existente.descripcion = descripcion
    existente.especialidades = especialidades
  } else {
    datos.interpretes.push({ usuarioId: interpreteId, verificado: false, descripcion, especialidades })
  }
  guardarDatos(datos)
  return { ok: true }
}

/** Devuelve los bloques del intérprete, ordenados por día y hora de inicio. */
export function listarBloques(interpreteId) {
  return leerDatos()
    .disponibilidad.filter((b) => b.interpreteId === interpreteId)
    .sort((a, b) => ordenDia(a.dia) - ordenDia(b.dia) || a.inicio.localeCompare(b.inicio))
}

/**
 * Crea un bloque (si no trae id) o edita uno existente (si trae id).
 * Devuelve { ok: true, bloque } o { ok: false, errores: { dia | inicio | fin | general } }
 */
export function guardarBloque(interpreteId, bloque) {
  const { id = null, dia, inicio, fin } = bloque || {}
  const errores = {}

  if (ordenDia(dia) === -1) errores.dia = 'Elija un día.'
  if (!FORMATO_HORA.test(inicio ?? '')) errores.inicio = 'Elija una hora de inicio.'
  if (!FORMATO_HORA.test(fin ?? '')) errores.fin = 'Elija una hora de fin.'
  if (!errores.inicio && !errores.fin && fin <= inicio) {
    errores.fin = 'La hora de fin debe ser después de la hora de inicio.'
  }
  if (Object.keys(errores).length > 0) return { ok: false, errores }

  const datos = leerDatos()
  const propios = datos.disponibilidad.filter((b) => b.interpreteId === interpreteId)

  if (id && !propios.some((b) => b.id === id)) {
    return { ok: false, errores: { general: 'Ese horario ya no existe. Recargue la página.' } }
  }

  const choque = buscarTraslape({ id, dia, inicio, fin }, propios)
  if (choque) {
    return {
      ok: false,
      errores: {
        general: `Choca con su horario del ${textoDia(choque.dia)} de ${choque.inicio} a ${choque.fin}.`,
      },
    }
  }

  let guardado
  if (id) {
    guardado = datos.disponibilidad.find((b) => b.id === id)
    Object.assign(guardado, { dia, inicio, fin })
  } else {
    guardado = { id: `d-${Date.now()}`, interpreteId, dia, inicio, fin }
    datos.disponibilidad.push(guardado)
  }
  guardarDatos(datos)
  return { ok: true, bloque: { ...guardado } }
}

/** Elimina un bloque. Devuelve { ok: true } o { ok: false, errores: { general } } */
export function eliminarBloque(interpreteId, bloqueId) {
  const datos = leerDatos()
  const antes = datos.disponibilidad.length
  datos.disponibilidad = datos.disponibilidad.filter(
    (b) => !(b.id === bloqueId && b.interpreteId === interpreteId),
  )
  if (datos.disponibilidad.length === antes) {
    return { ok: false, errores: { general: 'Ese horario ya no existe. Recargue la página.' } }
  }
  guardarDatos(datos)
  return { ok: true }
}
