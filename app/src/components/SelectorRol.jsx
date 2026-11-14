import Icono from './Icono.jsx'

const ROLES = [
  {
    valor: 'persona_sorda',
    titulo: 'Soy una persona sorda',
    detalle: 'Quiero agendar citas con un intérprete de LESCO.',
    icono: 'persona',
  },
  {
    valor: 'funcionario',
    titulo: 'Atiendo público',
    detalle: 'Trabajo en una institución o comercio y necesito un intérprete.',
    icono: 'edificio',
  },
  {
    valor: 'interprete',
    titulo: 'Soy intérprete de LESCO',
    detalle: 'Quiero ofrecer mis horarios para atender citas.',
    icono: 'manos',
  },
]

// Selección de rol con tarjetas grandes: cada opción es un radio real
// (se usa con teclado y lector de pantalla) con ícono, título y una línea de explicación.
export default function SelectorRol({ valor, alCambiar, error }) {
  return (
    <fieldset
      className={`roles${error ? ' roles--error' : ''}`}
      aria-describedby={error ? 'rol-error' : undefined}
    >
      <legend className="campo__etiqueta">¿Cómo va a usar la plataforma?</legend>

      <div className="roles__opciones">
        {ROLES.map((rol) => (
          <label key={rol.valor} className={`rol${valor === rol.valor ? ' rol--elegido' : ''}`}>
            <input
              type="radio"
              name="rol"
              value={rol.valor}
              checked={valor === rol.valor}
              onChange={() => alCambiar(rol.valor)}
              required
            />
            <span className="rol__icono">
              <Icono nombre={rol.icono} />
            </span>
            <span className="rol__texto">
              <span className="rol__titulo">{rol.titulo}</span>
              <span className="rol__detalle">{rol.detalle}</span>
            </span>
          </label>
        ))}
      </div>

      {error && (
        <p id="rol-error" className="campo__error">
          <Icono nombre="alerta" tamano={20} />
          {error}
        </p>
      )}
    </fieldset>
  )
}
