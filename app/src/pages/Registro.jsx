import Pendiente from './Pendiente.jsx'

export default function Registro() {
  return (
    <Pendiente
      titulo="Crear una cuenta"
      historia="HU-01 · Registro con rol y HU-05 · Consentimiento informado (Ley 8968)"
      tareas={[
        'Emily: diseñar la pantalla de registro con selección de rol',
        'Dylan: casilla obligatoria de consentimiento y guardar fecha y versión aceptada',
      ]}
    />
  )
}
