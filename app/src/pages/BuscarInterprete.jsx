import { useEffect, useId, useRef, useState } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import Icono from '../components/Icono.jsx'
import Seleccion from '../components/Seleccion.jsx'
import { useSesion } from '../lib/useSesion.js'
import { FRANJAS, aFecha, buscarInterpretes, textoFecha } from '../lib/citas.js'
import { ESPECIALIDADES } from '../data/catalogos.js'
import './Formularios.css'
import './Disponibilidad.css'
import './Citas.css'

// HU-06 · Buscar intérpretes por fecha y hora (Dylan).
// Los criterios quedan en la dirección (/buscar?fecha=…&franja=…&tramite=…) para poder volver
// a los resultados desde la pantalla de agendar.
const ROLES = ['persona_sorda', 'funcionario']

export default function BuscarInterprete() {
  const usuario = useSesion()
  if (!usuario) return <Navigate to="/iniciar-sesion" replace />
  if (!ROLES.includes(usuario.rol)) {
    return (
      <div className="citas">
        <h1>Buscar un intérprete</h1>
        <div className="aviso">
          <p>Esta pantalla es para personas sordas y funcionarios que necesitan agendar una cita.</p>
        </div>
        <p>
          <Link to="/panel">Volver a mi panel</Link>
        </p>
      </div>
    )
  }
  return <Busqueda />
}

function Busqueda() {
  const [parametros, setParametros] = useSearchParams()
  const [hoy] = useState(() => aFecha(new Date()))
  const [fecha, setFecha] = useState(parametros.get('fecha') ?? hoy)
  const [franja, setFranja] = useState(parametros.get('franja') ?? 'cualquiera')
  const [tramite, setTramite] = useState(parametros.get('tramite') ?? '')
  const idFecha = useId()
  const titulo = useRef(null)

  // La búsqueda se hace con lo que está en la dirección
  const criterios = parametros.get('fecha')
    ? { fecha: parametros.get('fecha'), franja: parametros.get('franja') ?? 'cualquiera', tramite: parametros.get('tramite') ?? '' }
    : null
  const resultado = criterios ? buscarInterpretes(criterios) : null

  // Al buscar, el foco pasa al título de resultados (lo anuncia el lector de pantalla)
  useEffect(() => {
    if (criterios) titulo.current?.focus()
  }, [parametros]) // eslint-disable-line react-hooks/exhaustive-deps

  function buscar(evento) {
    evento.preventDefault()
    const nuevos = { fecha, franja }
    if (tramite) nuevos.tramite = tramite
    setParametros(nuevos)
  }

  function buscarSugerencia(otraFecha) {
    setFecha(otraFecha)
    const nuevos = { fecha: otraFecha, franja }
    if (tramite) nuevos.tramite = tramite
    setParametros(nuevos)
  }

  const errores = resultado && !resultado.ok ? resultado.errores : {}

  return (
    <div className="citas">
      <h1>Buscar un intérprete</h1>
      <p className="formulario-pagina__intro">
        Elija el día y la hora que le sirven. Solo aparecen intérpretes de LESCO verificados que tienen
        ese espacio libre. Cada cita dura 1 hora.
      </p>

      <form className="formulario tarjeta seccion" onSubmit={buscar} noValidate aria-label="Buscar intérprete">
        <div className="citas__campos">
          <div className={`campo${errores.fecha ? ' campo--error' : ''}`}>
            <label htmlFor={idFecha} className="campo__etiqueta">
              Fecha
            </label>
            <div className="campo__control">
              <input
                id={idFecha}
                type="date"
                min={hoy}
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                aria-invalid={errores.fecha ? 'true' : undefined}
                aria-describedby={errores.fecha ? `${idFecha}-error` : undefined}
              />
            </div>
            {errores.fecha && (
              <p id={`${idFecha}-error`} className="campo__error">
                <Icono nombre="alerta" tamano={20} />
                {errores.fecha}
              </p>
            )}
          </div>
          <Seleccion
            etiqueta="Hora"
            valor={franja}
            alCambiar={setFranja}
            opciones={FRANJAS.map((f) => ({ valor: f.valor, texto: f.texto }))}
          />
          <Seleccion
            etiqueta="Tipo de trámite"
            opcional
            valor={tramite}
            alCambiar={setTramite}
            opciones={[{ valor: '', texto: 'Cualquiera' }, ...ESPECIALIDADES.map((e) => ({ valor: e, texto: e }))]}
            error={errores.tramite}
          />
        </div>
        <button type="submit" className="boton">
          <Icono nombre="calendario" tamano={22} />
          Buscar
        </button>
      </form>

      {resultado?.ok && (
        <section aria-labelledby="titulo-resultados" className="seccion">
          <h2 id="titulo-resultados" tabIndex={-1} ref={titulo}>
            {resultado.resultados.length === 0
              ? 'No hay intérpretes libres'
              : `${resultado.resultados.length} ${resultado.resultados.length === 1 ? 'intérprete libre' : 'intérpretes libres'}`}{' '}
            el {textoFecha(criterios.fecha)}
          </h2>

          {resultado.resultados.length === 0 ? (
            <div className="aviso">
              {resultado.sugerencia ? (
                <>
                  <p>
                    La fecha más cercana con intérpretes libres es el{' '}
                    <strong>{textoFecha(resultado.sugerencia)}</strong>.
                  </p>
                  <button type="button" className="boton" onClick={() => buscarSugerencia(resultado.sugerencia)}>
                    Buscar el {textoFecha(resultado.sugerencia)}
                  </button>
                </>
              ) : (
                <p>No hay intérpretes libres en las próximas dos semanas con estos criterios. Pruebe con otra hora o trámite.</p>
              )}
            </div>
          ) : (
            <ul className="resultados">
              {resultado.resultados.map((r) => (
                <li key={r.interpreteId} className="tarjeta resultado">
                  <div className="resultado__encabezado">
                    <span className="panel-opcion__icono" aria-hidden="true">
                      <Icono nombre="persona" />
                    </span>
                    <div>
                      <h3 className="resultado__nombre">{r.nombre}</h3>
                      <p className="resultado__verificado">
                        <Icono nombre="listo" tamano={18} /> Intérprete verificado
                      </p>
                    </div>
                  </div>
                  {r.descripcion && <p>{r.descripcion}</p>}
                  <p>
                    <strong>Trámites:</strong> {r.especialidades.join(', ')}
                  </p>
                  <p className="resultado__horas-titulo" id={`horas-${r.interpreteId}`}>
                    Elija una hora para agendar:
                  </p>
                  <ul className="horas" aria-labelledby={`horas-${r.interpreteId}`}>
                    {r.horas.map((h) => {
                      const destino = new URLSearchParams({ interprete: r.interpreteId, fecha: criterios.fecha, inicio: h })
                      if (criterios.tramite) destino.set('tramite', criterios.tramite)
                      return (
                        <li key={h}>
                          <Link
                            to={`/agendar?${destino}`}
                            className="boton boton--secundario hora"
                            aria-label={`Agendar con ${r.nombre} a las ${h}`}
                          >
                            {h}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <p>
        <Link to="/panel">Volver a mi panel</Link>
      </p>
    </div>
  )
}
