import { NavLink, Outlet } from 'react-router-dom'
import { restablecerDatos } from '../lib/almacen.js'

export default function Layout() {
  function restablecer() {
    restablecerDatos()
    window.location.assign('/')
  }

  return (
    <>
      <a className="saltar" href="#contenido">
        Saltar al contenido
      </a>

      <header className="encabezado">
        <div className="contenedor encabezado__fila">
          <NavLink to="/" className="marca">
            <span>Puente LESCO</span>
          </NavLink>

          <nav aria-label="Menú principal">
            <ul className="menu">
              <li>
                <NavLink to="/">Inicio</NavLink>
              </li>
              <li>
                <NavLink to="/iniciar-sesion">Iniciar sesión</NavLink>
              </li>
              <li>
                <NavLink to="/registro">Registrarse</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="contenido" className="contenedor principal" tabIndex={-1}>
        <Outlet />
      </main>

      <footer className="pie">
        <div className="contenedor pie__fila">
          <p>
            Prototipo académico · UTN San Carlos · ISW-912 · Todos los datos son ficticios. ·{' '}
            <NavLink to="/privacidad">Aviso de privacidad</NavLink>
          </p>
          <button type="button" className="boton boton--secundario" onClick={restablecer}>
            Restablecer datos de prueba
          </button>
        </div>
      </footer>
    </>
  )
}
