import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Campo from '../components/Campo.jsx'
import Icono from '../components/Icono.jsx'
import { iniciarSesion } from '../lib/sesion.js'
import './Formularios.css'

// HU-01 · Pantalla de inicio de sesión (diseño: Emily).
// La lógica vive en lib/sesion.js (Dylan). El rol viene de la cuenta,
// así que aquí no se elige: el panel muestra el menú de cada rol.
export default function IniciarSesion() {
  const navegar = useNavigate()
  const resumen = useRef(null)
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [errores, setErrores] = useState({})

  function enviar(evento) {
    evento.preventDefault()
    const resultado = iniciarSesion(correo.trim(), contrasena)
    if (resultado.ok) {
      navegar('/panel')
      return
    }
    setErrores(resultado.errores || {})
    setTimeout(() => resumen.current?.focus(), 0)
  }

  const hayErrores = Object.keys(errores).length > 0

  return (
    <div className="formulario-pagina">
      <h1>Iniciar sesión</h1>

      {hayErrores && (
        <div className="resumen-errores" role="alert" tabIndex={-1} ref={resumen}>
          <p className="resumen-errores__titulo">
            <Icono nombre="alerta" tamano={22} />
            No pudimos iniciar sesión
          </p>
          <ul>
            {Object.values(errores).map((mensaje) => (
              <li key={mensaje}>{mensaje}</li>
            ))}
          </ul>
        </div>
      )}

      <form className="formulario" onSubmit={enviar} noValidate>
        <Campo
          etiqueta="Correo electrónico"
          tipo="email"
          autoComplete="email"
          valor={correo}
          alCambiar={setCorreo}
          error={errores.correo}
        />

        <Campo
          etiqueta="Contraseña"
          tipo="password"
          autoComplete="current-password"
          valor={contrasena}
          alCambiar={setContrasena}
          error={errores.contrasena}
        />

        <button type="submit" className="boton boton--ancho">
          Entrar
        </button>
      </form>

      <p className="formulario-pagina__otra">
        ¿No tiene cuenta? <Link to="/registro">Crear una cuenta</Link>
      </p>

      <details className="demo">
        <summary>Usuarios de prueba para la demostración</summary>
        <p>Todos usan la contraseña <strong>demo1234</strong>. Son personas ficticias.</p>
        <ul>
          <li>ana@demo.cr · persona sorda</li>
          <li>carlos@demo.cr · funcionario</li>
          <li>laura@demo.cr · intérprete</li>
          <li>admin@demo.cr · administración</li>
        </ul>
      </details>
    </div>
  )
}
