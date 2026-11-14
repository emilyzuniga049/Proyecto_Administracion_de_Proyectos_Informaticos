import { Link } from 'react-router-dom'
import Pendiente from './Pendiente.jsx'

export default function Panel() {
  return (
    <>
      <Pendiente
        titulo="Mi panel"
        historia="HU-01 (menú según el rol)"
        tareas={['Dylan: mostrar el menú que corresponde a cada rol']}
      />
      <p>
        <Link to="/disponibilidad" className="boton">
          Ir a mi perfil y mis horarios (intérpretes)
        </Link>
      </p>
    </>
  )
}
