import { useEffect, useId, useRef, useState } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import Icono from '../components/Icono.jsx'
import Seleccion from '../components/Seleccion.jsx'
import { useSesion } from '../lib/useSesion.js'
import { leerDatos } from '../lib/almacen.js'
import { agendarCita, horaApertura, textoFecha } from '../lib/citas.js'
import { ESPECIALIDADES } from '../data/catalogos.js'
import './Formularios.css'
import './Disponibilidad.css'
import './Citas.css'

// HU-07 · Agendar una cita previa (Emily).
// HU-08 · Versión simple: la cita queda aceptada automáticamente (orden de recorte, Sección 07).
// Llega desde la búsqueda (HU-06) con /agendar?interprete=…&fecha=…&inicio=…
const ROLES = ['persona_sorda', 'funcionario']

export default function Agendar() {
  const usuario = useSesion()
  if (!usuario) return <Navigate to="/iniciar-sesion" replace />
  if (!ROLES.includes(usuario.rol)) {
    return (
      <div className="citas">
        <h1>Agendar una cita</h1>
        <div className="aviso">
          <p>Solo una persona sorda o un funcionario puede agendar citas.</p>
        </div>
        <p>
          <Link to="/panel">Volver a mi panel</Link>
        </p>
      </div>
    )
  }
  return <FormularioCita usuario={usuario} />
}

function FormularioCita({ usuario }) {
  const [parametros] = useSearchParams()
  const interpreteId = parametros.get('interprete') ?? ''
  const fecha = parametros.get('fecha') ?? ''
  const inicio = parametros.get('inicio') ?? ''
  const tramiteBuscado = parametros.get('tramite') ?? ''

  const datos = leerDatos()
  const interprete = datos.usuarios.find((u) => u.id === interpreteId && u.rol === 'interprete')
  const perfil = datos.interpretes.find((i) => i.usuarioId === interpreteId)
  const opcionesTramite = perfil?.especialidades?.length ? perfil.especialidades : ESPECIALIDADES

  const [tramite, setTramite] = useState(opcionesTramite.includes(tramiteBuscado) ? tramiteBuscado : '')
  const [notas, setNotas] = useState('')
  const [errores, setErrores] = useState({})
  const [cita, setCita] = useState(null)
  const idNotas = useId()
  const confirmacion = useRef(null)

  useEffect(() => {
    if (cita) confirmacion.current?.focus()
  }, [cita])

  const volverABuscar = `/buscar?${new URLSearchParams({ fecha, franja: 'cualquiera', ...(tramiteBuscado ? { tramite: tramiteBuscado } : {}) })}`

  if (!interprete || !fecha || !inicio) {
    return (
      <div className="citas">
        <h1>Agendar una cita</h1>
        <div className="aviso">
          <p>Primero busque un intérprete y elija una hora.</p>
        </div>
        <p>
          <Link to="/buscar" className="boton">
            Buscar un intérprete
          </Link>
        </p>
      </div>
    )
  }

  function confirmar(evento) {
    evento.preventDefault()
    const resultado = agendarCita(usuario, { interpreteId, fecha, inicio, tramite, notas })
    if (resultado.ok) {
      setCita(resultado.cita)
      setErrores({})
    } else {
      setErrores(resultado.errores || {})
    }
  }

  // Confirmación visual (criterio de HU-07)
  if (cita) {
    return (
      <div className="citas">
        <div className="confirmacion tarjeta" role="status">
          <h1 tabIndex={-1} ref={confirmacion} className="confirmacion__titulo">
            <Icono nombre="listo" tamano={36} />
            Su cita quedó confirmada
          </h1>
          <dl className="detalle">
            <div>
              <dt>Intérprete</dt>
              <dd>{interprete.nombre}</dd>
            </div>
            <div>
              <dt>Día</dt>
              <dd>{textoFecha(cita.fecha)}</dd>
            </div>
            <div>
              <dt>Hora</dt>
              <dd>
                {cita.inicio} a {cita.fin}
              </dd>
            </div>
            <div>
              <dt>Trámite</dt>
              <dd>{cita.tramite}</dd>
            </div>
          </dl>
          <p>
            El intérprete ya la tiene en su agenda. El botón para entrar a la videollamada se habilita a las{' '}
            <strong>{horaApertura(cita)}</strong>, 10 minutos antes de la cita, en "Mis citas".
          </p>
          <p className="acciones-formulario">
            <Link to="/mis-citas" className="boton">
              <Icono nombre="video" tamano={22} />
              Ver mis citas
            </Link>
            <Link to="/buscar" className="boton boton--secundario">
              Agendar otra cita
            </Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="citas">
      <h1>Agendar una cita</h1>
      <p className="formulario-pagina__intro">Revise los datos y confirme la cita.</p>

      <section className="tarjeta seccion" aria-labelledby="titulo-resumen">
        <h2 id="titulo-resumen">Su cita</h2>
        <dl className="detalle">
          <div>
            <dt>Intérprete</dt>
            <dd>{interprete.nombre}</dd>
          </div>
          <div>
            <dt>Día</dt>
            <dd>{textoFecha(fecha)}</dd>
          </div>
          <div>
            <dt>Hora</dt>
            <dd>{inicio} (dura 1 hora)</dd>
          </div>
        </dl>
        <p>
          <Link to={volverABuscar}>Cambiar intérprete u hora</Link>
        </p>
      </section>

      <form className="formulario tarjeta seccion" onSubmit={confirmar} noValidate aria-label="Datos de la cita">
        <Seleccion
          etiqueta="Tipo de trámite"
          ayuda="Así el intérprete sabe para qué es la cita."
          valor={tramite}
          alCambiar={setTramite}
          opciones={[{ valor: '', texto: 'Elija una opción' }, ...opcionesTramite.map((e) => ({ valor: e, texto: e }))]}
          error={errores.tramite}
        />

        <div className={`campo${errores.notas ? ' campo--error' : ''}`}>
          <label htmlFor={idNotas} className="campo__etiqueta">
            Nota para el intérprete <span className="campo__opcional">(opcional)</span>
          </label>
          <p id={`${idNotas}-ayuda`} className="campo__ayuda">
            Por ejemplo: "Cita en el EBAIS por control de presión". Máximo 200 caracteres.
          </p>
          <textarea
            id={idNotas}
            className="area-texto"
            rows={3}
            maxLength={200}
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            aria-invalid={errores.notas ? 'true' : undefined}
            aria-describedby={`${idNotas}-ayuda${errores.notas ? ` ${idNotas}-error` : ''}`}
          />
          {errores.notas && (
            <p id={`${idNotas}-error`} className="campo__error">
              <Icono nombre="alerta" tamano={20} />
              {errores.notas}
            </p>
          )}
        </div>

        {errores.general && (
          <p className="mensaje mensaje--error" role="alert">
            <Icono nombre="alerta" tamano={22} />
            {errores.general}
          </p>
        )}

        <p className="acciones-formulario">
          <button type="submit" className="boton">
            <Icono nombre="listo" tamano={22} />
            Confirmar la cita
          </button>
          <Link to={volverABuscar} className="boton boton--secundario">
            Volver a la búsqueda
          </Link>
        </p>
      </form>
    </div>
  )
}
