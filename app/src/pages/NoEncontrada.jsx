import { Link } from 'react-router-dom'

export default function NoEncontrada() {
  return (
    <>
      <h1>No encontramos esta página</h1>
      <p>Puede que el enlace esté mal escrito o que la página ya no exista.</p>
      <p>
        <Link to="/" className="boton">
          Volver al inicio
        </Link>
      </p>
    </>
  )
}
