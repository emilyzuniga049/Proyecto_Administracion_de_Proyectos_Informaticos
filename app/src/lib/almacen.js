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

/** Carga los datos de prueba si todavía no hay datos guardados. */
export function iniciarDatos() {
  if (!leerCrudo()) {
    escribirCrudo(JSON.stringify(datosIniciales))
  }
}

/** Devuelve todos los datos (usuarios, intérpretes, disponibilidad, citas). */
export function leerDatos() {
  const texto = leerCrudo()
  if (!texto) return copiar(datosIniciales)
  try {
    return JSON.parse(texto)
  } catch {
    return copiar(datosIniciales)
  }
}

/** Guarda todos los datos. */
export function guardarDatos(datos) {
  escribirCrudo(JSON.stringify(datos))
}

/** Borra lo guardado y vuelve a los datos de prueba (MIT-02 · "Restablecer demo"). */
export function restablecerDatos() {
  escribirCrudo(JSON.stringify(datosIniciales))
}
