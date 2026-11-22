// Lógica de registro e inicio de sesión (HU-01 y HU-05).
// RESPONSABLE: Dylan.
//
// Prototipo sin servidor (decisión D-02): las cuentas se guardan en el navegador con
// almacen.js y la contraseña queda en texto plano. Solo se usan datos ficticios
// (DoD, criterio 8). En una versión real esto iría en un servidor con contraseñas cifradas.
import { guardarDatos, leerDatos } from './almacen.js'

const CLAVE_SESION = 'puente-lesco-sesion'
export const EVENTO_SESION = 'puente-lesco-sesion'

export const ROLES_REGISTRO = ['persona_sorda', 'funcionario', 'interprete']

const FORMATO_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

let sesionEnMemoria = null

function leerIdSesion() {
  try {
    return window.localStorage.getItem(CLAVE_SESION)
  } catch {
    return sesionEnMemoria
  }
}

function escribirIdSesion(id) {
  sesionEnMemoria = id
  try {
    if (id) window.localStorage.setItem(CLAVE_SESION, id)
    else window.localStorage.removeItem(CLAVE_SESION)
  } catch {
    // sin localStorage: la sesión queda solo en memoria
  }
  // Avisa a la interfaz (menú, panel) que la sesión cambió
  window.dispatchEvent(new Event(EVENTO_SESION))
}

function sinContrasena(usuario) {
  const copia = { ...usuario }
  delete copia.contrasena
  return copia
}

function hoy() {
  return new Date().toISOString().slice(0, 10)
}

/**
 * Crea una cuenta nueva y deja la sesión abierta.
 *
 * Recibe: { nombre, correo, contrasena, rol, consentimiento: { aceptado, version } }
 * Devuelve: { ok: true, usuario } o { ok: false, errores: { campo: 'mensaje' } }
 */
export function registrar(datosCuenta) {
  const { nombre = '', correo = '', contrasena = '', rol = '', consentimiento } = datosCuenta || {}
  const errores = {}
  const datos = leerDatos()

  if (!ROLES_REGISTRO.includes(rol)) {
    errores.rol = 'Elija cómo va a usar la plataforma.'
  }
  if (nombre.trim().length < 3) {
    errores.nombre = 'Escriba su nombre completo.'
  }
  if (!FORMATO_CORREO.test(correo.trim())) {
    errores.correo = 'Escriba un correo válido, por ejemplo nombre@correo.com.'
  } else if (
    datos.usuarios.some((u) => u.correo.toLowerCase() === correo.trim().toLowerCase())
  ) {
    errores.correo = 'Ya existe una cuenta con este correo. Inicie sesión o use otro correo.'
  }
  if (contrasena.length < 8) {
    errores.contrasena = 'La contraseña debe tener al menos 8 caracteres.'
  }
  if (!consentimiento?.aceptado) {
    errores.consentimiento = 'Para crear la cuenta debe aceptar el aviso de privacidad.'
  }

  if (Object.keys(errores).length > 0) {
    return { ok: false, errores }
  }

  const usuario = {
    id: `u-${Date.now()}`,
    nombre: nombre.trim(),
    correo: correo.trim().toLowerCase(),
    contrasena,
    rol,
    // HU-05: se guarda qué versión del aviso aceptó y cuándo
    consentimiento: { aceptado: true, version: consentimiento.version, fecha: hoy() },
  }
  datos.usuarios.push(usuario)

  if (rol === 'interprete') {
    // Un intérprete nuevo queda sin verificar hasta que la administración lo apruebe (HU-02)
    datos.interpretes.push({
      usuarioId: usuario.id,
      verificado: false,
      especialidades: [],
      descripcion: '',
    })
  }

  guardarDatos(datos)
  escribirIdSesion(usuario.id)
  return { ok: true, usuario: sinContrasena(usuario) }
}

/**
 * Inicia sesión.
 * Devuelve: { ok: true, usuario } o { ok: false, errores: { campo: 'mensaje' } }
 */
export function iniciarSesion(correo = '', contrasena = '') {
  const errores = {}
  if (!correo.trim()) errores.correo = 'Escriba su correo.'
  if (!contrasena) errores.contrasena = 'Escriba su contraseña.'
  if (Object.keys(errores).length > 0) return { ok: false, errores }

  const usuario = leerDatos().usuarios.find(
    (u) => u.correo.toLowerCase() === correo.trim().toLowerCase() && u.contrasena === contrasena,
  )
  if (!usuario) {
    return { ok: false, errores: { general: 'El correo o la contraseña no son correctos.' } }
  }

  escribirIdSesion(usuario.id)
  return { ok: true, usuario: sinContrasena(usuario) }
}

/** Devuelve el usuario con sesión abierta (sin contraseña), o null. */
export function usuarioActual() {
  const id = leerIdSesion()
  if (!id) return null
  const usuario = leerDatos().usuarios.find((u) => u.id === id)
  return usuario ? sinContrasena(usuario) : null
}

/** Cierra la sesión. */
export function cerrarSesion() {
  escribirIdSesion(null)
}
