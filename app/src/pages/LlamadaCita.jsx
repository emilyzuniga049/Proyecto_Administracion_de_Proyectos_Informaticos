import { Link, Navigate, useParams } from 'react-router-dom'
import SalaVideo from '../components/SalaVideo.jsx'
import { useSesion } from '../lib/useSesion.js'
import { leerDatos } from '../lib/almacen.js'
import { esParticipante, estadoEnlace, horaApertura, obtenerCita, textoFecha } from '../lib/citas.js'
import './Formularios.css'
import './Citas.css'
import './VideollamadaPrueba.css'

// HU-11 · Unirse a la videollamada de la cita (Dylan).
// Criterios: el enlace se habilita 10 minutos antes; la llamada abre dentro de la plataforma;
// solo los participantes de la cita pueden entrar.
export default function LlamadaCita() {
  const usuario = useSesion()
  const { citaId } = useParams()
  if (!usuario) return <Navigate to="/iniciar-sesion" replace />

  const cita = obtenerCita(citaId)

  if (!cita || !esParticipante(usuario, cita)) {
    return (
      <Aviso titulo="Videollamada de la cita">
        Solo las dos personas de esta cita pueden entrar a la llamada.
      </Aviso>
    )
  }

  const enlace = estadoEnlace(cita)
  if (enlace === 'pronto') {
    return (
      <Aviso titulo="Todavía no es la hora">
        La llamada de su cita del {textoFecha(cita.fecha)} a las {cita.inicio} se habilita a las{' '}
        {horaApertura(cita)}, 10 minutos antes.
      </Aviso>
    )
  }
  if (enlace === 'terminada') {
    return <Aviso titulo="La cita ya terminó">La cita del {textoFecha(cita.fecha)} terminó a las {cita.fin}.</Aviso>
  }

  const datos = leerDatos()
  const otroId = cita.interpreteId === usuario.id ? cita.solicitanteId : cita.interpreteId
  const otro = datos.usuarios.find((u) => u.id === otroId)

  return (
    <div className="videollamada">
      <h1>Videollamada de su cita</h1>
      <p className="formulario-pagina__intro">
        {cita.tramite} · {textoFecha(cita.fecha)} de {cita.inicio} a {cita.fin} · con{' '}
        <strong>{otro?.nombre ?? 'la otra persona'}</strong>. La otra persona entra a la misma sala desde su cuenta.
      </p>
      <SalaVideo sala={cita.sala} nombre={usuario.nombre} />
      <p>
        <Link to="/mis-citas">Volver a mis citas</Link>
      </p>
    </div>
  )
}

function Aviso({ titulo, children }) {
  return (
    <div className="citas">
      <h1>{titulo}</h1>
      <div className="aviso">
        <p>{children}</p>
      </div>
      <p>
        <Link to="/mis-citas">Volver a mis citas</Link>
      </p>
    </div>
  )
}
