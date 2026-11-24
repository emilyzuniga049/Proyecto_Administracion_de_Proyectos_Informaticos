import { useEffect, useRef, useState } from 'react'
import Icono from './Icono.jsx'
import { SERVIDOR, cargarJitsi, enlaceSala, nombreSala } from '../lib/jitsi.js'

// Videollamada incrustada con Jitsi (HU-11). Reutiliza la configuración probada en SP-01
// (lib/jitsi.js, decisión D-05: meet.jit.si). Si no carga, queda el botón para abrirla
// en otra pestaña (plan B del riesgo R-02).
export default function SalaVideo({ sala, nombre, alSalir }) {
  const contenedor = useRef(null)
  const api = useRef(null)
  const [estado, setEstado] = useState('inactiva') // inactiva | cargando | en-llamada | error
  const [mensaje, setMensaje] = useState('')

  // Cierra la llamada al salir de la página
  useEffect(() => () => api.current?.dispose(), [])

  async function entrar() {
    setEstado('cargando')
    setMensaje('')
    try {
      const JitsiMeetExternalAPI = await cargarJitsi()
      api.current?.dispose()
      api.current = new JitsiMeetExternalAPI(SERVIDOR.dominio, {
        roomName: nombreSala(sala),
        parentNode: contenedor.current,
        width: '100%',
        height: '100%',
        lang: 'es',
        userInfo: { displayName: nombre },
        configOverwrite: {
          prejoinConfig: { enabled: false },
          disableDeepLinking: true,
        },
      })
      api.current.addListener('readyToClose', salir)
      setEstado('en-llamada')
    } catch (error) {
      setEstado('error')
      setMensaje(error.message)
    }
  }

  function salir() {
    api.current?.dispose()
    api.current = null
    setEstado('inactiva')
    setMensaje('Salió de la llamada. Puede volver a entrar mientras dure la cita.')
    alSalir?.()
  }

  return (
    <div className="sala-video">
      {estado !== 'en-llamada' && (
        <p className="acciones-formulario">
          <button type="button" className="boton" onClick={entrar} disabled={estado === 'cargando'}>
            <Icono nombre="video" tamano={22} />
            {estado === 'cargando' ? 'Conectando…' : 'Entrar a la llamada'}
          </button>
          <a className="boton boton--secundario" href={enlaceSala(sala)} target="_blank" rel="noopener noreferrer">
            Abrir en otra pestaña
          </a>
        </p>
      )}

      {mensaje && (
        <p className={`mensaje mensaje--${estado === 'error' ? 'error' : 'exito'}`} role={estado === 'error' ? 'alert' : 'status'}>
          <Icono nombre={estado === 'error' ? 'alerta' : 'listo'} tamano={22} />
          {mensaje}
          {estado === 'error' && ' Pruebe con el botón "Abrir en otra pestaña".'}
        </p>
      )}

      <div
        ref={contenedor}
        className={`videollamada__marco${estado === 'en-llamada' ? ' videollamada__marco--activo' : ''}`}
        aria-label="Videollamada de la cita"
        role="region"
      />

      {estado === 'en-llamada' && (
        <p className="acciones-formulario">
          <button type="button" className="boton boton--peligro" onClick={salir}>
            Salir de la llamada
          </button>
          <a className="boton boton--secundario" href={enlaceSala(sala)} target="_blank" rel="noopener noreferrer">
            Abrir en otra pestaña
          </a>
        </p>
      )}
    </div>
  )
}
