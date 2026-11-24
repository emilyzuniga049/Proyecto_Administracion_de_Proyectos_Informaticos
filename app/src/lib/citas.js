// Citas con intérprete (Sprint 2).
//   HU-06 · Buscar intérpretes por fecha y hora ............ Dylan
//   HU-07 · Agendar una cita previa ........................ Emily
//   HU-08 · Versión simple: la cita queda aceptada sola ..... Emily
//   HU-11 · Unirse a la videollamada de la cita ............ Dylan
//
// Una cita tiene esta forma:
//   { id: 'c-1', solicitanteId: 'u-1', interpreteId: 'u-3',
//     fecha: '2026-11-25', inicio: '09:00', fin: '10:00',
//     tramite: 'Salud', notas: '', estado: 'aceptada', sala: 'puente-lesco-c-1-ab12', creada: '…' }
//
// Las fechas son 'AAAA-MM-DD' y las horas 'HH:MM' (24 horas), en la hora local del navegador.
import { guardarDatos, leerDatos } from './almacen.js'
import { DIAS, ESPECIALIDADES } from '../data/catalogos.js'

/** Cada cita dura 1 hora. */
export const DURACION_MINUTOS = 60
/** El enlace de la llamada se habilita 10 minutos antes de la cita (criterio de HU-11). */
export const MINUTOS_ANTES = 10
/** Si no hay intérpretes en la fecha buscada, se revisan los días siguientes (HU-06). */
const DIAS_SUGERENCIA = 14

export const FRANJAS = [
  { valor: 'cualquiera', texto: 'Cualquier hora', desde: '00:00', hasta: '24:00' },
  { valor: 'manana', texto: 'Mañana (antes de las 12:00)', desde: '00:00', hasta: '12:00' },
  { valor: 'tarde', texto: 'Tarde (12:00 a 18:00)', desde: '12:00', hasta: '18:00' },
  { valor: 'noche', texto: 'Noche (desde las 18:00)', desde: '18:00', hasta: '24:00' },
]

const ROLES_QUE_AGENDAN = ['persona_sorda', 'funcionario']
const FORMATO_FECHA = /^\d{4}-\d{2}-\d{2}$/
const MAX_NOTAS = 200

// ---------- Fechas y horas ----------

const aMinutos = (hora) => {
  const [h, m] = hora.split(':').map(Number)
  return h * 60 + m
}

const aHora = (minutos) =>
  `${String(Math.floor(minutos / 60)).padStart(2, '0')}:${String(minutos % 60).padStart(2, '0')}`

/** Convierte un Date a 'AAAA-MM-DD' (hora local). */
export function aFecha(fecha) {
  const a = fecha.getFullYear()
  const m = String(fecha.getMonth() + 1).padStart(2, '0')
  const d = String(fecha.getDate()).padStart(2, '0')
  return `${a}-${m}-${d}`
}

/** Convierte 'AAAA-MM-DD' y 'HH:MM' en un Date (hora local). */
export function aDate(fecha, hora = '00:00') {
  const [a, m, d] = fecha.split('-').map(Number)
  const [h, min] = hora.split(':').map(Number)
  return new Date(a, m - 1, d, h, min)
}

/** Suma días a una fecha 'AAAA-MM-DD'. */
export function sumarDias(fecha, dias) {
  const f = aDate(fecha)
  f.setDate(f.getDate() + dias)
  return aFecha(f)
}

/** Día de la semana de una fecha, con los valores de catalogos.js ('lunes', 'martes', …). */
export function diaDeFecha(fecha) {
  // getDay(): 0 = domingo, 1 = lunes, …
  const indice = (aDate(fecha).getDay() + 6) % 7
  return DIAS[indice].valor
}

/** Texto para mostrar una fecha: "miércoles 25 de noviembre". */
export function textoFecha(fecha) {
  return aDate(fecha).toLocaleDateString('es-CR', { weekday: 'long', day: 'numeric', month: 'long' })
}

const fechaValida = (fecha) => FORMATO_FECHA.test(fecha ?? '') && !Number.isNaN(aDate(fecha).getTime())

// ---------- HU-06 · Buscar intérpretes ----------

/**
 * Horas de inicio libres de un intérprete en una fecha.
 * Salen de sus bloques de disponibilidad para ese día de la semana, en pasos de 1 hora,
 * sin las horas que ya tienen una cita y sin las horas que ya pasaron.
 */
export function horariosLibres(interpreteId, fecha, { datos = leerDatos(), ahora = new Date() } = {}) {
  if (!fechaValida(fecha)) return []
  const dia = diaDeFecha(fecha)
  const ocupadas = datos.citas.filter(
    (c) => c.interpreteId === interpreteId && c.fecha === fecha && c.estado !== 'cancelada',
  )
  const libres = []
  for (const bloque of datos.disponibilidad) {
    if (bloque.interpreteId !== interpreteId || bloque.dia !== dia) continue
    for (let m = aMinutos(bloque.inicio); m + DURACION_MINUTOS <= aMinutos(bloque.fin); m += DURACION_MINUTOS) {
      const inicio = aHora(m)
      const fin = aHora(m + DURACION_MINUTOS)
      const chocaConCita = ocupadas.some((c) => inicio < c.fin && c.inicio < fin)
      const yaPaso = aDate(fecha, inicio) <= ahora
      if (!chocaConCita && !yaPaso && !libres.includes(inicio)) libres.push(inicio)
    }
  }
  return libres.sort()
}

function buscarEnFecha({ fecha, franja, tramite }, datos, ahora) {
  const rango = FRANJAS.find((f) => f.valor === franja) ?? FRANJAS[0]
  return datos.interpretes
    .filter((perfil) => perfil.verificado)
    .filter((perfil) => !tramite || (perfil.especialidades ?? []).includes(tramite))
    .map((perfil) => {
      const usuario = datos.usuarios.find((u) => u.id === perfil.usuarioId)
      const horas = horariosLibres(perfil.usuarioId, fecha, { datos, ahora }).filter(
        (h) => h >= rango.desde && h < rango.hasta,
      )
      return {
        interpreteId: perfil.usuarioId,
        nombre: usuario?.nombre ?? 'Intérprete',
        descripcion: perfil.descripcion ?? '',
        especialidades: perfil.especialidades ?? [],
        horas,
      }
    })
    .filter((r) => r.horas.length > 0)
    .sort((a, b) => a.horas[0].localeCompare(b.horas[0]) || a.nombre.localeCompare(b.nombre))
}

/**
 * Busca intérpretes verificados con horas libres (HU-06).
 * criterios: { fecha: 'AAAA-MM-DD', franja: 'cualquiera' | 'manana' | 'tarde' | 'noche', tramite?: 'Salud' | … }
 * Devuelve { ok: true, resultados, sugerencia } o { ok: false, errores: { fecha | tramite } }
 *   resultados: [{ interpreteId, nombre, descripcion, especialidades, horas: ['09:00', …] }]
 *   sugerencia: si no hay resultados, la fecha más cercana (después de la buscada) que sí tiene; si no, null.
 */
export function buscarInterpretes(criterios, { ahora = new Date() } = {}) {
  const { fecha, franja = 'cualquiera', tramite = '' } = criterios || {}
  const errores = {}
  if (!fechaValida(fecha)) errores.fecha = 'Elija una fecha.'
  else if (fecha < aFecha(ahora)) errores.fecha = 'Elija hoy o una fecha futura.'
  if (tramite && !ESPECIALIDADES.includes(tramite)) errores.tramite = 'Elija un tipo de trámite de la lista.'
  if (Object.keys(errores).length > 0) return { ok: false, errores }

  const datos = leerDatos()
  const resultados = buscarEnFecha({ fecha, franja, tramite }, datos, ahora)

  let sugerencia = null
  if (resultados.length === 0) {
    for (let i = 1; i <= DIAS_SUGERENCIA; i++) {
      const otra = sumarDias(fecha, i)
      if (buscarEnFecha({ fecha: otra, franja, tramite }, datos, ahora).length > 0) {
        sugerencia = otra
        break
      }
    }
  }
  return { ok: true, resultados, sugerencia }
}

// ---------- HU-07 · Agendar una cita (y HU-08 versión simple) ----------

/**
 * Agenda una cita. Con la versión simple de HU-08 (Sección 07, orden de recorte),
 * la cita queda aceptada automáticamente y aparece en la agenda del intérprete.
 * solicitante: el usuario con sesión abierta.
 * pedido: { interpreteId, fecha, inicio, tramite, notas? }
 * Devuelve { ok: true, cita } o { ok: false, errores: { tramite | notas | general } }
 */
export function agendarCita(solicitante, pedido, { ahora = new Date() } = {}) {
  const { interpreteId, fecha, inicio, tramite, notas = '' } = pedido || {}

  if (!solicitante || !ROLES_QUE_AGENDAN.includes(solicitante.rol)) {
    return { ok: false, errores: { general: 'Solo una persona sorda o un funcionario puede agendar citas.' } }
  }

  const errores = {}
  if (!ESPECIALIDADES.includes(tramite)) errores.tramite = 'Elija el tipo de trámite.'
  if (notas.trim().length > MAX_NOTAS) errores.notas = `Escriba como máximo ${MAX_NOTAS} caracteres.`
  if (Object.keys(errores).length > 0) return { ok: false, errores }

  const datos = leerDatos()
  const perfil = datos.interpretes.find((i) => i.usuarioId === interpreteId)
  if (!perfil || !perfil.verificado) {
    return { ok: false, errores: { general: 'Ese intérprete no está disponible. Vuelva a buscar.' } }
  }

  // Bloqueo del horario: solo se puede agendar una hora que siga libre (criterio de HU-07)
  if (!horariosLibres(interpreteId, fecha, { datos, ahora }).includes(inicio)) {
    return {
      ok: false,
      errores: { general: 'Esa hora ya no está libre. Vuelva a buscar y elija otra.' },
    }
  }

  const id = `c-${Date.now()}`
  const cita = {
    id,
    solicitanteId: solicitante.id,
    interpreteId,
    fecha,
    inicio,
    fin: aHora(aMinutos(inicio) + DURACION_MINUTOS),
    tramite,
    notas: notas.trim(),
    estado: 'aceptada',
    sala: `puente-lesco-${id}-${Math.random().toString(36).slice(2, 8)}`,
    creada: ahora.toISOString(),
  }
  datos.citas.push(cita)
  guardarDatos(datos)
  return { ok: true, cita: { ...cita } }
}

/**
 * Citas de un usuario, de la más próxima a la más lejana (HU-08 · agenda del intérprete y "Mis citas").
 * Cada cita trae el nombre de la otra persona en "conQuien".
 */
export function listarCitas(usuario) {
  if (!usuario) return []
  const datos = leerDatos()
  const nombre = (id) => datos.usuarios.find((u) => u.id === id)?.nombre ?? 'Usuario'
  return datos.citas
    .filter((c) => c.solicitanteId === usuario.id || c.interpreteId === usuario.id)
    .map((c) => ({
      ...c,
      conQuien: c.interpreteId === usuario.id ? nombre(c.solicitanteId) : nombre(c.interpreteId),
    }))
    .sort((a, b) => a.fecha.localeCompare(b.fecha) || a.inicio.localeCompare(b.inicio))
}

/** Busca una cita por id. Devuelve la cita o null. */
export function obtenerCita(citaId) {
  return leerDatos().citas.find((c) => c.id === citaId) ?? null
}

// ---------- HU-11 · Unirse a la videollamada ----------

/** ¿El usuario es parte de la cita? Solo los participantes pueden entrar a la llamada. */
export function esParticipante(usuario, cita) {
  return Boolean(usuario && cita && (cita.solicitanteId === usuario.id || cita.interpreteId === usuario.id))
}

/**
 * Estado del enlace de la llamada:
 *   'pronto'    → falta más de 10 minutos para la cita
 *   'abierto'   → desde 10 minutos antes hasta que termina la cita
 *   'terminada' → la cita ya pasó
 */
export function estadoEnlace(cita, ahora = new Date()) {
  const inicio = aDate(cita.fecha, cita.inicio)
  const fin = aDate(cita.fecha, cita.fin)
  const abre = new Date(inicio.getTime() - MINUTOS_ANTES * 60 * 1000)
  if (ahora < abre) return 'pronto'
  if (ahora < fin) return 'abierto'
  return 'terminada'
}

/** Hora en que se habilita el enlace, en 'HH:MM'. */
export function horaApertura(cita) {
  return aHora(aMinutos(cita.inicio) - MINUTOS_ANTES)
}
