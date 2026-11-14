import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Campo from '../components/Campo.jsx'
import SelectorRol from '../components/SelectorRol.jsx'
import Icono from '../components/Icono.jsx'
import { registrar } from '../lib/sesion.js'
import './Formularios.css'

// HU-01 · Pantalla de registro con selección de rol (diseño: Emily).
// La lógica vive en lib/sesion.js (Dylan).
export default function Registro() {
  const navegar = useNavigate()
  const resumen = useRef(null)
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [rol, setRol] = useState('')
  const [errores, setErrores] = useState({})

  function enviar(evento) {
    evento.preventDefault()
    const resultado = registrar({
      nombre: nombre.trim(),
      correo: correo.trim(),
      contrasena,
      rol,
      // HU-05 (Dylan): reemplazar por el estado de la casilla de consentimiento
      consentimiento: null,
    })

    if (resultado.ok) {
      navegar('/panel')
      return
    }
    setErrores(resultado.errores || {})
    // Lleva el foco al resumen para que el error se lea de inmediato
    setTimeout(() => resumen.current?.focus(), 0)
  }

  const hayErrores = Object.keys(errores).length > 0

  return (
    <div className="formulario-pagina">
      <h1>Crear una cuenta</h1>
      <p className="formulario-pagina__intro">
        Le toma un minuto. Todos los campos son obligatorios.
      </p>

      {hayErrores && (
        <div className="resumen-errores" role="alert" tabIndex={-1} ref={resumen}>
          <p className="resumen-errores__titulo">
            <Icono nombre="alerta" tamano={22} />
            No pudimos crear la cuenta
          </p>
          <ul>
            {Object.values(errores).map((mensaje) => (
              <li key={mensaje}>{mensaje}</li>
            ))}
          </ul>
        </div>
      )}

      <form className="formulario" onSubmit={enviar} noValidate>
        <SelectorRol valor={rol} alCambiar={setRol} error={errores.rol} />

        <Campo
          etiqueta="Nombre completo"
          autoComplete="name"
          valor={nombre}
          alCambiar={setNombre}
          error={errores.nombre}
        />

        <Campo
          etiqueta="Correo electrónico"
          ayuda="Lo usará para entrar a la plataforma."
          tipo="email"
          autoComplete="email"
          valor={correo}
          alCambiar={setCorreo}
          error={errores.correo}
        />

        <Campo
          etiqueta="Contraseña"
          ayuda="Al menos 8 caracteres."
          tipo="password"
          autoComplete="new-password"
          valor={contrasena}
          alCambiar={setContrasena}
          error={errores.contrasena}
        />

        {/* HU-05 (Dylan): aquí va la casilla obligatoria "Leí y acepto el aviso de privacidad" */}
        <p className="formulario__nota">
          Antes de crear su cuenta, lea el{' '}
          <Link to="/privacidad">aviso de privacidad</Link>.
        </p>

        <button type="submit" className="boton boton--ancho">
          Crear mi cuenta
        </button>
      </form>

      <p className="formulario-pagina__otra">
        ¿Ya tiene cuenta? <Link to="/iniciar-sesion">Iniciar sesión</Link>
      </p>
    </div>
  )
}
