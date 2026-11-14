// Página temporal para las pantallas que todavía no se construyen.
// Cada historia reemplaza su página cuando se programa.
export default function Pendiente({ titulo, historia, tareas }) {
  return (
    <>
      <h1>{titulo}</h1>
      <div className="aviso" role="status">
        <p>
          <strong>Pantalla en construcción.</strong> Se completa con {historia}.
        </p>
        <ul>
          {tareas.map((tarea) => (
            <li key={tarea}>{tarea}</li>
          ))}
        </ul>
      </div>
    </>
  )
}
