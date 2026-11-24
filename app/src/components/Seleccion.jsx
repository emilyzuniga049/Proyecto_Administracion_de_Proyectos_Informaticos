import { useId } from 'react'
import Icono from './Icono.jsx'

// Lista desplegable accesible (Sprint 2): etiqueta visible, ayuda y error ligados al campo.
// Usa los mismos estilos que los campos de texto (Formularios.css y Citas.css).
export default function Seleccion({ etiqueta, ayuda, valor, alCambiar, opciones, error, opcional = false }) {
  const id = useId()
  const describe = [ayuda ? `${id}-ayuda` : null, error ? `${id}-error` : null].filter(Boolean).join(' ')
  return (
    <div className={`campo${error ? ' campo--error' : ''}`}>
      <label htmlFor={id} className="campo__etiqueta">
        {etiqueta}
        {opcional && <span className="campo__opcional"> (opcional)</span>}
      </label>
      {ayuda && (
        <p id={`${id}-ayuda`} className="campo__ayuda">
          {ayuda}
        </p>
      )}
      <select
        id={id}
        className="seleccion"
        value={valor}
        onChange={(e) => alCambiar(e.target.value)}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describe || undefined}
      >
        {opciones.map((o) => (
          <option key={o.valor} value={o.valor}>
            {o.texto}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${id}-error`} className="campo__error">
          <Icono nombre="alerta" tamano={20} />
          {error}
        </p>
      )}
    </div>
  )
}
