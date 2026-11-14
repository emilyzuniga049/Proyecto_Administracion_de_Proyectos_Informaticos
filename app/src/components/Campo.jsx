import { useId, useState } from 'react'
import Icono from './Icono.jsx'

// Campo de texto accesible: etiqueta visible, ayuda y error ligados al campo
// (aria-describedby), y el error se anuncia con un ícono y texto, no solo con color.
export default function Campo({
  etiqueta,
  ayuda,
  error,
  tipo = 'text',
  autoComplete,
  valor,
  alCambiar,
  requerido = true,
}) {
  const id = useId()
  const idAyuda = `${id}-ayuda`
  const idError = `${id}-error`
  const [mostrar, setMostrar] = useState(false)
  const esContrasena = tipo === 'password'

  const describe = [ayuda ? idAyuda : null, error ? idError : null].filter(Boolean).join(' ')

  return (
    <div className={`campo${error ? ' campo--error' : ''}`}>
      <label htmlFor={id} className="campo__etiqueta">
        {etiqueta}
        {!requerido && <span className="campo__opcional"> (opcional)</span>}
      </label>

      {ayuda && (
        <p id={idAyuda} className="campo__ayuda">
          {ayuda}
        </p>
      )}

      <div className="campo__control">
        <input
          id={id}
          type={esContrasena && mostrar ? 'text' : tipo}
          value={valor}
          onChange={(e) => alCambiar(e.target.value)}
          autoComplete={autoComplete}
          required={requerido}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describe || undefined}
        />
        {esContrasena && (
          <button
            type="button"
            className="campo__ver"
            onClick={() => setMostrar(!mostrar)}
            aria-pressed={mostrar}
          >
            <Icono nombre={mostrar ? 'ojoTachado' : 'ojo'} tamano={22} />
            {mostrar ? 'Ocultar' : 'Mostrar'}
          </button>
        )}
      </div>

      {error && (
        <p id={idError} className="campo__error">
          <Icono nombre="alerta" tamano={20} />
          {error}
        </p>
      )}
    </div>
  )
}
