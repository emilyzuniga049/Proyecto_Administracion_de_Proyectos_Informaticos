// Configuración de la videollamada (SP-01, decisión D-02).
//
// Por defecto usa el servidor público meet.jit.si: no necesita cuenta, pero las
// llamadas incrustadas se cortan a los 5 minutos (suficiente para la prueba y la demo).
// Para usar JaaS (8x8, plan gratuito sin límite de minutos), cree la cuenta, copie su
// App ID y póngalo en un archivo app/.env.local o en las variables de Vercel:
//   VITE_JAAS_APP_ID=vpaas-magic-cookie-xxxxxxxx
// Nota: JaaS puede pedir un token (JWT) para entrar a las salas. Esa es una de las
// cosas que SP-01 debe comprobar y documentar en la Sección 11.

const APP_ID = import.meta.env.VITE_JAAS_APP_ID

export const SERVIDOR = APP_ID
  ? { dominio: '8x8.vc', script: `https://8x8.vc/${APP_ID}/external_api.js`, nombre: 'JaaS (8x8)' }
  : { dominio: 'meet.jit.si', script: 'https://meet.jit.si/external_api.js', nombre: 'meet.jit.si' }

/** Nombre completo de la sala en el servidor elegido. */
export function nombreSala(sala) {
  return APP_ID ? `${APP_ID}/${sala}` : sala
}

/** Enlace para abrir la misma sala en otra pestaña (plan B del riesgo R-02). */
export function enlaceSala(sala) {
  return `https://${SERVIDOR.dominio}/${nombreSala(sala)}`
}

/** Convierte un texto en un nombre de sala seguro: minúsculas, números y guiones. */
export function limpiarSala(texto) {
  return (texto || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

let cargando = null

/** Carga el script de Jitsi una sola vez y devuelve la clase JitsiMeetExternalAPI. */
export function cargarJitsi() {
  if (window.JitsiMeetExternalAPI) return Promise.resolve(window.JitsiMeetExternalAPI)
  if (!cargando) {
    cargando = new Promise((resolver, rechazar) => {
      const script = document.createElement('script')
      script.src = SERVIDOR.script
      script.async = true
      script.onload = () => resolver(window.JitsiMeetExternalAPI)
      script.onerror = () => {
        cargando = null
        rechazar(new Error('No se pudo cargar el servicio de videollamada.'))
      }
      document.head.appendChild(script)
    })
  }
  return cargando
}
