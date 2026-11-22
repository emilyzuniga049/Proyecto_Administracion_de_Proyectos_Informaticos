import { Link, Navigate } from 'react-router-dom'
import Icono from '../components/Icono.jsx'
import { useSesion } from '../lib/useSesion.js'
import { leerDatos } from '../lib/almacen.js'
import { NOMBRE_ROL } from '../data/catalogos.js'
import './Formularios.css'
import './Panel.css'

// HU-01 · Menú según el rol: cada rol ve sus propias opciones.
// Las opciones que llegan en el Sprint 2 se muestran, pero sin enlace.
const OPCIONES = {
  persona_sorda: [
    { titulo: 'Agendar una cita', detalle: 'Busque un intérprete y elija día y hora.', icono: 'calendario', sprint: 2 },
    { titulo: 'Mis citas', detalle: 'Vea sus citas y entre a la videollamada.', icono: 'video', sprint: 2 },
  ],
  funcionario: [
    { titulo: 'Agendar una cita', detalle: 'Reserve un intérprete para atender a una persona sorda.', icono: 'calendario', sprint: 2 },
    { titulo: 'Mis citas', detalle: 'Vea sus citas y entre a la videollamada.', icono: 'video', sprint: 2 },
  ],
  interprete: [
    { titulo: 'Mi perfil y mis horarios', detalle: 'Publique cuándo puede atender citas.', icono: 'calendario', ruta: '/disponibilidad' },
    { titulo: 'Probar la videollamada', detalle: 'Llamada de prueba entre dos navegadores (SP-01).', icono: 'video', ruta: '/videollamada-prueba' },
    { titulo: 'Solicitudes de cita', detalle: 'Acepte o rechace las citas que le piden.', icono: 'manos', sprint: 2 },
  ],
  admin: [
    { titulo: 'Probar la videollamada', detalle: 'Llamada de prueba entre dos navegadores (SP-01).', icono: 'video', ruta: '/videollamada-prueba' },
    { titulo: 'Verificar intérpretes', detalle: 'Aprobar la certificación de LESCO (HU-02, opcional).', icono: 'persona', sprint: 2 },
  ],
}

export default function Panel() {
  const usuario = useSesion()
  if (!usuario) return <Navigate to="/iniciar-sesion" replace />

  const opciones = OPCIONES[usuario.rol] ?? []
  const pendienteVerificar =
    usuario.rol === 'interprete' &&
    leerDatos().interpretes.find((i) => i.usuarioId === usuario.id)?.verificado === false

  return (
    <>
      <h1>Hola, {usuario.nombre.split(' ')[0]}</h1>
      <p className="formulario-pagina__intro">Entró como {NOMBRE_ROL[usuario.rol]}.</p>

      {pendienteVerificar && (
        <div className="aviso">
          <p>
            <strong>Su perfil está pendiente de verificación.</strong> Puede publicar sus horarios,
            pero las personas lo verán cuando la administración apruebe su certificación de LESCO.
          </p>
        </div>
      )}

      <ul className="panel-opciones">
        {opciones.map((o) => (
          <li key={o.titulo}>
            {o.ruta ? (
              <Link to={o.ruta} className="panel-opcion">
                <span className="panel-opcion__icono">
                  <Icono nombre={o.icono} />
                </span>
                <span className="panel-opcion__texto">
                  <span className="panel-opcion__titulo">{o.titulo}</span>
                  <span>{o.detalle}</span>
                </span>
              </Link>
            ) : (
              <div className="panel-opcion panel-opcion--pronto">
                <span className="panel-opcion__icono">
                  <Icono nombre={o.icono} />
                </span>
                <span className="panel-opcion__texto">
                  <span className="panel-opcion__titulo">{o.titulo}</span>
                  <span>{o.detalle}</span>
                  <span className="panel-opcion__pronto">Disponible en el Sprint {o.sprint}</span>
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}
