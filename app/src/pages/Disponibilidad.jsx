import { useId, useRef, useState } from 'react'
import Icono from '../components/Icono.jsx'
import { usuarioActual } from '../lib/sesion.js'
import {
  eliminarBloque,
  guardarBloque,
  guardarPerfil,
  listarBloques,
  obtenerPerfil,
} from '../lib/disponibilidad.js'
import { DIAS, ESPECIALIDADES } from '../data/catalogos.js'
import './Formularios.css'
import './Disponibilidad.css'

// HU-03 · Formulario de perfil y disponibilidad del intérprete (diseño: Emily).
// La lógica vive en lib/disponibilidad.js (Dylan).

// Horas cada 30 minutos, de 06:00 a 21:00
const HORAS = Array.from({ length: 31 }, (_, i) => {
  const minutos = 6 * 60 + i * 30
  const h = String(Math.floor(minutos / 60)).padStart(2, '0')
  const m = String(minutos % 60).padStart(2, '0')
  return `${h}:${m}`
})

// Mientras no exista el inicio de sesión (HU-01), la pantalla usa a una intérprete de prueba
const INTERPRETE_DE_PRUEBA = { id: 'u-3', nombre: 'Laura Vargas (ficticia)' }

const BLOQUE_VACIO = { id: null, dia: 'lunes', inicio: '08:00', fin: '12:00' }

function textoDia(valor) {
  return DIAS.find((d) => d.valor === valor)?.texto ?? valor
}

function Seleccion({ etiqueta, valor, alCambiar, opciones, error }) {
  const id = useId()
  return (
    <div className={`campo${error ? ' campo--error' : ''}`}>
      <label htmlFor={id} className="campo__etiqueta">
        {etiqueta}
      </label>
      <select
        id={id}
        className="seleccion"
        value={valor}
        onChange={(e) => alCambiar(e.target.value)}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      >
        {opciones.map((o) => (
          <option key={o.valor} value={o.valor}>
            {o.texto}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${id}-error`} className="campo__error">
          <Icono nombre="alerta" tamano={20} />
          {error}
        </p>
      )}
    </div>
  )
}

function Mensaje({ mensaje }) {
  if (!mensaje) return null
  const esError = mensaje.tipo === 'error'
  return (
    <p className={`mensaje mensaje--${mensaje.tipo}`} role={esError ? 'alert' : 'status'}>
      <Icono nombre={esError ? 'alerta' : 'listo'} tamano={22} />
      {mensaje.texto}
    </p>
  )
}

export default function Disponibilidad() {
  const usuario = usuarioActual()
  const interprete = usuario ?? INTERPRETE_DE_PRUEBA
  const enPrueba = !usuario

  const perfilGuardado = obtenerPerfil(interprete.id)
  const [descripcion, setDescripcion] = useState(perfilGuardado?.descripcion ?? '')
  const [especialidades, setEspecialidades] = useState(perfilGuardado?.especialidades ?? [])
  const [mensajePerfil, setMensajePerfil] = useState(null)

  const [bloques, setBloques] = useState(() => listarBloques(interprete.id))
  const [bloque, setBloque] = useState(BLOQUE_VACIO)
  const [erroresBloque, setErroresBloque] = useState({})
  const [mensajeBloques, setMensajeBloques] = useState(null)
  const [porEliminar, setPorEliminar] = useState(null)
  const formularioBloque = useRef(null)
  const idDescripcion = useId()

  const editando = bloque.id !== null

  function alternarEspecialidad(nombre) {
    setEspecialidades((actuales) =>
      actuales.includes(nombre) ? actuales.filter((e) => e !== nombre) : [...actuales, nombre],
    )
  }

  function enviarPerfil(evento) {
    evento.preventDefault()
    const resultado = guardarPerfil(interprete.id, {
      descripcion: descripcion.trim(),
      especialidades,
    })
    setMensajePerfil(
      resultado.ok
        ? { tipo: 'exito', texto: 'Su perfil se guardó.' }
        : { tipo: 'error', texto: Object.values(resultado.errores || {}).join(' ') },
    )
  }

  function enviarBloque(evento) {
    evento.preventDefault()
    const resultado = guardarBloque(interprete.id, bloque)
    if (resultado.ok) {
      setBloques(listarBloques(interprete.id))
      setMensajeBloques({
        tipo: 'exito',
        texto: editando ? 'Se guardaron los cambios del horario.' : 'Se agregó el horario.',
      })
      setBloque(BLOQUE_VACIO)
      setErroresBloque({})
      return
    }
    const errores = resultado.errores || {}
    setErroresBloque(errores)
    setMensajeBloques(errores.general ? { tipo: 'error', texto: errores.general } : null)
  }

  function editar(b) {
    setBloque({ id: b.id, dia: b.dia, inicio: b.inicio, fin: b.fin })
    setErroresBloque({})
    setMensajeBloques(null)
    formularioBloque.current?.scrollIntoView({ block: 'start' })
    formularioBloque.current?.querySelector('select')?.focus()
  }

  function cancelarEdicion() {
    setBloque(BLOQUE_VACIO)
    setErroresBloque({})
    setMensajeBloques(null)
  }

  function confirmarEliminar(b) {
    const resultado = eliminarBloque(interprete.id, b.id)
    setPorEliminar(null)
    if (resultado.ok) {
      setBloques(listarBloques(interprete.id))
      setMensajeBloques({ tipo: 'exito', texto: 'Se eliminó el horario.' })
    } else {
      setMensajeBloques({
        tipo: 'error',
        texto: Object.values(resultado.errores || {}).join(' '),
      })
    }
  }

  const opcionesHora = HORAS.map((h) => ({ valor: h, texto: h }))

  return (
    <div className="disponibilidad">
      <h1>Mi perfil y mis horarios</h1>
      <p className="formulario-pagina__intro">
        Las personas solo pueden agendarle en los horarios que usted publique aquí.
      </p>

      {enPrueba && (
        <div className="aviso">
          <p>
            <strong>Modo de prueba:</strong> mientras se programa el inicio de sesión, esta
            pantalla muestra a {INTERPRETE_DE_PRUEBA.nombre}.
          </p>
        </div>
      )}

      {/* ---------- Perfil ---------- */}
      <section aria-labelledby="titulo-perfil" className="tarjeta seccion">
        <h2 id="titulo-perfil">Mi perfil</h2>
        <form className="formulario" onSubmit={enviarPerfil} noValidate>
          <div className="campo">
            <label htmlFor={idDescripcion} className="campo__etiqueta">
              Sobre usted
            </label>
            <p id={`${idDescripcion}-ayuda`} className="campo__ayuda">
              Una o dos líneas sobre su experiencia. Las personas lo leen antes de agendar.
            </p>
            <textarea
              id={idDescripcion}
              className="area-texto"
              rows={3}
              maxLength={300}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              aria-describedby={`${idDescripcion}-ayuda`}
            />
          </div>

          <fieldset className="especialidades">
            <legend className="campo__etiqueta">¿En qué tipo de trámites tiene experiencia?</legend>
            <p className="campo__ayuda">Puede marcar varios.</p>
            <div className="especialidades__opciones">
              {ESPECIALIDADES.map((nombre) => (
                <label key={nombre} className="casilla">
                  <input
                    type="checkbox"
                    checked={especialidades.includes(nombre)}
                    onChange={() => alternarEspecialidad(nombre)}
                  />
                  <span>{nombre}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <Mensaje mensaje={mensajePerfil} />

          <button type="submit" className="boton">
            Guardar mi perfil
          </button>
        </form>
      </section>

      {/* ---------- Horarios ---------- */}
      <section aria-labelledby="titulo-horarios" className="tarjeta seccion">
        <h2 id="titulo-horarios">Mis horarios disponibles</h2>

        {bloques.length === 0 ? (
          <p className="vacio">
            <Icono nombre="calendario" tamano={24} />
            Todavía no tiene horarios. Agregue el primero abajo.
          </p>
        ) : (
          <ul className="bloques">
            {bloques.map((b) => {
              const descripcionBloque = `${textoDia(b.dia)} de ${b.inicio} a ${b.fin}`
              return (
                <li key={b.id} className="bloque">
                  <span className="bloque__texto">
                    <strong>{textoDia(b.dia)}</strong> · {b.inicio} a {b.fin}
                  </span>

                  {porEliminar === b.id ? (
                    <span className="bloque__acciones" role="group" aria-label={`Confirmar eliminar ${descripcionBloque}`}>
                      <span className="bloque__pregunta">¿Eliminar este horario?</span>
                      <button
                        type="button"
                        className="boton boton--peligro"
                        onClick={() => confirmarEliminar(b)}
                      >
                        Sí, eliminar
                      </button>
                      <button
                        type="button"
                        className="boton boton--secundario"
                        onClick={() => setPorEliminar(null)}
                      >
                        No
                      </button>
                    </span>
                  ) : (
                    <span className="bloque__acciones">
                      <button
                        type="button"
                        className="boton boton--secundario"
                        onClick={() => editar(b)}
                        aria-label={`Editar ${descripcionBloque}`}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="boton boton--secundario"
                        onClick={() => setPorEliminar(b.id)}
                        aria-label={`Eliminar ${descripcionBloque}`}
                      >
                        Eliminar
                      </button>
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        )}

        <Mensaje mensaje={mensajeBloques} />

        <form
          className="formulario formulario-bloque"
          onSubmit={enviarBloque}
          noValidate
          ref={formularioBloque}
          aria-labelledby="titulo-bloque"
        >
          <h3 id="titulo-bloque">{editando ? 'Cambiar horario' : 'Agregar un horario'}</h3>

          <div className="formulario-bloque__campos">
            <Seleccion
              etiqueta="Día"
              valor={bloque.dia}
              alCambiar={(dia) => setBloque({ ...bloque, dia })}
              opciones={DIAS}
              error={erroresBloque.dia}
            />
            <Seleccion
              etiqueta="Desde"
              valor={bloque.inicio}
              alCambiar={(inicio) => setBloque({ ...bloque, inicio })}
              opciones={opcionesHora}
              error={erroresBloque.inicio}
            />
            <Seleccion
              etiqueta="Hasta"
              valor={bloque.fin}
              alCambiar={(fin) => setBloque({ ...bloque, fin })}
              opciones={opcionesHora}
              error={erroresBloque.fin}
            />
          </div>

          <p className="acciones-formulario">
            <button type="submit" className="boton">
              {editando ? 'Guardar cambios' : 'Agregar horario'}
            </button>
            {editando && (
              <button type="button" className="boton boton--secundario" onClick={cancelarEdicion}>
                Cancelar
              </button>
            )}
          </p>
        </form>
      </section>
    </div>
  )
}
