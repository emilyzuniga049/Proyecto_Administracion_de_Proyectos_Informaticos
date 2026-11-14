import Pendiente from './Pendiente.jsx'

export default function IniciarSesion() {
  return (
    <Pendiente
      titulo="Iniciar sesión"
      historia="HU-01 · Registro e inicio de sesión con rol"
      tareas={[
        'Emily: diseñar la pantalla de inicio de sesión con selección de rol',
        'Dylan: programar el inicio de sesión simulado y el menú según el rol',
      ]}
    />
  )
}
