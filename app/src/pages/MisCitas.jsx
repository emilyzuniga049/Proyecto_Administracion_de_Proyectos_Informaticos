import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Icono from '../components/Icono.jsx'
import { useSesion } from '../lib/useSesion.js'
import { estadoEnlace, horaApertura, listarCitas, textoFecha } from '../lib/citas.js'
import './Formularios.css'
import './Citas.css'

// "Mis citas" de la persona sorda o el funcionario, y "Mi agenda de citas" del intérprete.
// HU-08 (versión simple, Emily): las citas llegan ya aceptadas a la agenda del intérprete.
// HU-11 (Dylan): cada cita tiene su botón "Unirse a la llamada", que se habilita 10 minutos antes.
export default function MisCitas() {
  const usuario = useSesion()
  // Se vuelve a dibujar cada 30 segundos para habilitar el botón a tiempo
  const [ahora, setAhora] = useState(() => new Date())
  useEffect(() => {
    const reloj = setInterval(() => setAhora(new Date()), 30 * 1000)
    return () => clearInterval(reloj)
  }, [])

  if (!usuario) return <Navigate to="/iniciar-sesion" replace />
  if (usuario.rol === 'admin') return <Navigate to="/panel" replace />

  const esInterprete = usuario.rol === 'interprete'
  const citas = listarCitas(usuario).map((c) => ({ ...c, enlace: estadoEnlace(c, ahora) }))
  const proximas = citas.filter((c) => c.enlace !== 'terminada')
  const pasadas = citas.filter((c) => c.enlace === 'terminada').reverse()

  return (
    <div className="citas">
      <h1>{esInterprete ? 'Mi agenda de citas' : 'Mis citas'}</h1>
      <p className="formulario-pagina__intro">
        {esInterprete
          ? 'Estas son las citas que le agendaron. Quedan aceptadas automáticamente.'
          : 'Desde aquí entra a la videollamada con su intérprete.'}{' '}
        El botón para entrar se habilita 10 minutos antes de cada cita.
      </p>

      <section aria-labelledby="titulo-proximas" className="seccion">
        <h2 id="titulo-proximas">Próximas</h2>
        {proximas.length === 0 ? (
          <div className="vacio-bloque">
            <p className="vacio">
              <Icono nombre="calendario" tamano={24} />
              {esInterprete ? 'Todavía no le han agendado citas.' : 'No tiene citas próximas.'}
            </p>
            {!esInterprete && (
              <Link to="/buscar" className="boton">
                Buscar un intérprete
              </Link>
            )}
          </div>
        ) : (
          <ul className="lista-citas">
            {proximas.map((c) => (
              <TarjetaCita key={c.id} cita={c} esInterprete={esInterprete} />
            ))}
          </ul>
        )}
      </section>

      {pasadas.length > 0 && (
        <section aria-labelledby="titulo-pasadas" className="seccion">
          <h2 id="titulo-pasadas">Anteriores</h2>
          <ul className="lista-citas">
            {pasadas.map((c) => (
              <TarjetaCita key={c.id} cita={c} esInterprete={esInterprete} />
            ))}
          </ul>
        </section>
      )}

      <p className="acciones-formulario">
        {!esInterprete && proximas.length > 0 && (
          <Link to="/buscar" className="boton boton--secundario">
            Agendar otra cita
          </Link>
        )}
        <Link to="/panel">Volver a mi panel</Link>
      </p>
    </div>
  )
}

function TarjetaCita({ cita, esInterprete }) {
  const descripcion = `${cita.tramite}, ${textoFecha(cita.fecha)} a las ${cita.inicio}`
  return (
    <li className="tarjeta cita">
      <div className="cita__datos">
        <p className="cita__cuando">
          <strong>{textoFecha(cita.fecha)}</strong> · {cita.inicio} a {cita.fin}
        </p>
        <p>
          {esInterprete ? 'Solicitada por' : 'Intérprete'}: <strong>{cita.conQuien}</strong>
        </p>
        <p>Trámite: {cita.tramite}</p>
        {cita.notas && <p className="cita__notas">Nota: {cita.notas}</p>}
        <p className="estado estado--aceptada">
          <Icono nombre="listo" tamano={18} />
          Confirmada
        </p>
      </div>

      <div className="cita__accion">
        {cita.enlace === 'abierto' && (
          <Link to={`/citas/${cita.id}/llamada`} className="boton" aria-label={`Unirse a la llamada: ${descripcion}`}>
            <Icono nombre="video" tamano={22} />
            Unirse a la llamada
          </Link>
        )}
        {cita.enlace === 'pronto' && (
          <p className="cita__espera">
            <Icono nombre="video" tamano={22} />
            El botón para unirse se habilita a las {horaApertura(cita)}.
          </p>
        )}
        {cita.enlace === 'terminada' && <p className="cita__espera">Esta cita ya terminó.</p>}
      </div>
    </li>
  )
}
