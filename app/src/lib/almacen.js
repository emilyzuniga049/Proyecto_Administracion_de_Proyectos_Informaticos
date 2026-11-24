// Almacén de datos del prototipo.
// No hay servidor: los datos viven en el navegador (localStorage).
// La primera vez se cargan los datos de prueba de datos-iniciales.json.
// Todos los datos son ficticios (Ley 8968, DoD criterio 8).
import datosIniciales from '../data/datos-iniciales.json'

const CLAVE = 'puente-lesco-datos'

function copiar(objeto) {
  return JSON.parse(JSON.stringify(objeto))
}

// El navegador puede bloquear localStorage (modo privado, permisos).
// En ese caso la plataforma sigue funcionando con datos en memoria.
let memoria = null

function leerCrudo() {
  try {
    return window.localStorage.getItem(CLAVE)
  } catch {
    return memoria
  }
}

function escribirCrudo(texto) {
  memoria = texto
  try {
    window.localStorage.setItem(CLAVE, texto)
  } catch {
    // sin localStorage: queda solo en memoria
  }
}

// Cita de demostración (Sprint 2): Ana (persona sorda) con Laura (intérprete), hoy,
// empezando en la media hora actual. Así, al restablecer los datos, el botón
// "Unirse a la llamada" (HU-11) ya está habilitado para mostrarlo en la demo.
function citaDemo(ahora) {
  const minutos = Math.floor((ahora.getHours() * 60 + ahora.getMinutes()) / 30) * 30
  const hora = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
  const fecha = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}-${String(ahora.getDate()).padStart(2, '0')}`
  return {
    id: 'c-demo',
    solicitanteId: 'u-1',
    interpreteId: 'u-3',
    fecha,
    inicio: hora(minutos),
    fin: hora(Math.min(minutos + 60, 23 * 60 + 59)),
    tramite: 'Salud',
    notas: 'Cita de demostración: se crea sola al restablecer los datos de prueba.',
    estado: 'aceptada',
    sala: 'puente-lesco-cita-demo',
    creada: ahora.toISOString(),
  }
}

/** Datos de prueba: los del archivo JSON más la cita de demostración. */
export function datosDePrueba(ahora = new Date()) {
  const datos = copiar(datosIniciales)
  datos.citas = [citaDemo(ahora)]
  return datos
}

/**
 * Carga los datos de prueba si todavía no hay datos guardados.
 * Si lo guardado es de una versión anterior de los datos, se reemplaza (MIT-02).
 */
export function iniciarDatos() {
  const texto = leerCrudo()
  let version = null
  try {
    version = texto ? JSON.parse(texto).version : null
  } catch {
    version = null
  }
  if (version !== datosIniciales.version) {
    escribirCrudo(JSON.stringify(datosDePrueba()))
  }
}

/** Devuelve todos los datos (usuarios, intérpretes, disponibilidad, citas). */
export function leerDatos() {
  const texto = leerCrudo()
  if (!texto) return datosDePrueba()
  try {
    return JSON.parse(texto)
  } catch {
    return datosDePrueba()
  }
}

/** Guarda todos los datos. */
export function guardarDatos(datos) {
  escribirCrudo(JSON.stringify(datos))
}

/** Borra lo guardado y vuelve a los datos de prueba (MIT-02 · "Restablecer demo"). */
export function restablecerDatos() {
  escribirCrudo(JSON.stringify(datosDePrueba()))
}
