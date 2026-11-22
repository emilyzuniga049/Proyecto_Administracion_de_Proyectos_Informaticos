import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { restablecerDatos } from '../lib/almacen.js'
import { cerrarSesion } from '../lib/sesion.js'
import { useSesion } from '../lib/useSesion.js'
import { NOMBRE_ROL } from '../data/catalogos.js'
import Icono from './Icono.jsx'

export default function Layout() {
  const usuario = useSesion()
  const navegar = useNavigate()

  function restablecer() {
    cerrarSesion()
    restablecerDatos()
    window.location.assign('/')
  }

  function salir() {
    cerrarSesion()
    navegar('/')
  }

  return (
    <>
      <a className="saltar" href="#contenido">
        Saltar al contenido
      </a>

      <header className="encabezado">
        <div className="contenedor encabezado__fila">
          <NavLink to="/" className="marca">
            <Icono nombre="marca" tamano={32} />
            <span>Puente LESCO</span>
          </NavLink>

          <nav aria-label="Menú principal">
            <ul className="menu">
              <li>
                <NavLink to="/" end>
                  Inicio
                </NavLink>
              </li>
              {usuario ? (
                <>
                  <li>
                    <NavLink to="/panel">Mi panel</NavLink>
                  </li>
                  <li className="menu__usuario">
                    <span>
                      {usuario.nombre.split(' ')[0]} · {NOMBRE_ROL[usuario.rol]}
                    </span>
                  </li>
                  <li>
                    <button type="button" className="menu__boton" onClick={salir}>
                      Cerrar sesión
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/iniciar-sesion">Iniciar sesión</NavLink>
                  </li>
                  <li>
                    <NavLink to="/registro">Registrarse</NavLink>
                  </li>
                </>
              )}
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
