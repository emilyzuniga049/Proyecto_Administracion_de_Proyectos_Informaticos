import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icono from '../components/Icono.jsx'
import { useSesion } from '../lib/useSesion.js'
import { SERVIDOR, cargarJitsi, enlaceSala, limpiarSala, nombreSala } from '../lib/jitsi.js'
import './Formularios.css'
import './VideollamadaPrueba.css'

// SP-01 · Prueba de concepto de videollamada entre dos navegadores (Dylan).
// Cómo probar: abrir esta página en dos navegadores o dos equipos, escribir la misma sala
// y entrar en ambos. Si los dos se ven y se escuchan, la videollamada es viable.
export default function VideollamadaPrueba() {
  const usuario = useSesion()
  const idSala = useId()
  const contenedor = useRef(null)
  const api = useRef(null)
  const [sala, setSala] = useState('puente-lesco-prueba')
  const [estado, setEstado] = useState('inactiva') // inactiva | cargando | en-llamada | error
  const [mensaje, setMensaje] = useState('')

  const salaLimpia = limpiarSala(sala) || 'puente-lesco-prueba'

  // Cierra la llamada al salir de la página
  useEffect(() => () => api.current?.dispose(), [])

  async function entrar(evento) {
    evento.preventDefault()
    setEstado('cargando')
    setMensaje('')
    try {
      const JitsiMeetExternalAPI = await cargarJitsi()
      api.current?.dispose()
      api.current = new JitsiMeetExternalAPI(SERVIDOR.dominio, {
        roomName: nombreSala(salaLimpia),
        parentNode: contenedor.current,
        width: '100%',
        height: '100%',
        lang: 'es',
        userInfo: { displayName: usuario?.nombre ?? 'Invitado de prueba' },
        configOverwrite: {
          // Entra directo a la sala, sin la pantalla previa de Jitsi
          prejoinConfig: { enabled: false },
          // En el celular no ofrece abrir la app de Jitsi: todo pasa en el navegador
          disableDeepLinking: true,
        },
      })
      api.current.addListener('videoConferenceJoined', () => {
        setEstado('en-llamada')
        setMensaje(`Está en la sala "${salaLimpia}".`)
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
    setMensaje('Salió de la llamada.')
  }

  return (
    <div className="videollamada">
      <h1>Probar la videollamada</h1>
      <p className="formulario-pagina__intro">
        Prueba técnica (SP-01): abra esta página en dos navegadores, escriba la misma sala y entre
        en ambos. Servidor: <strong>{SERVIDOR.nombre}</strong>.
      </p>

      {estado !== 'en-llamada' && (
        <form className="formulario videollamada__form" onSubmit={entrar}>
          <div className="campo">
            <label htmlFor={idSala} className="campo__etiqueta">
              Nombre de la sala
            </label>
            <p id={`${idSala}-ayuda`} className="campo__ayuda">
              Use el mismo nombre en los dos navegadores. Solo letras, números y guiones.
            </p>
            <div className="campo__control">
              <input
                id={idSala}
                value={sala}
                onChange={(e) => setSala(e.target.value)}
                aria-describedby={`${idSala}-ayuda`}
              />
            </div>
          </div>
          <p className="acciones-formulario">
            <button type="submit" className="boton" disabled={estado === 'cargando'}>
              <Icono nombre="video" tamano={22} />
              {estado === 'cargando' ? 'Conectando…' : 'Entrar a la llamada'}
            </button>
            <a className="boton boton--secundario" href={enlaceSala(salaLimpia)} target="_blank" rel="noopener noreferrer">
              Abrir en otra pestaña
            </a>
          </p>
        </form>
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
        aria-label="Videollamada"
        role="region"
      />

      {estado === 'en-llamada' && (
        <p className="acciones-formulario">
          <button type="button" className="boton boton--peligro" onClick={salir}>
            Salir de la llamada
          </button>
        </p>
      )}

      <p>
        <Link to="/panel">Volver a mi panel</Link>
      </p>
    </div>
  )
}
