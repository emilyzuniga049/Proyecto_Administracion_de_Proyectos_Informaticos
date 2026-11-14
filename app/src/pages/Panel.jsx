import Pendiente from './Pendiente.jsx'

export default function Panel() {
  return (
    <Pendiente
      titulo="Mi panel"
      historia="HU-01 (menú según el rol) y HU-03 · Perfil y disponibilidad del intérprete"
      tareas={[
        'Dylan: mostrar el menú que corresponde a cada rol',
        'Emily: formulario de perfil y disponibilidad del intérprete',
        'Dylan: consulta de disponibilidad y validación de traslapes',
      ]}
    />
  )
}
