import { Link } from 'react-router-dom'
import './Privacidad.css'

// HU-05 · Consentimiento informado (Ley 8968).
// Si este texto cambia, se sube la versión: el registro guarda qué versión aceptó cada persona.
export const VERSION_AVISO = '1.0'
export const FECHA_AVISO = '13 de noviembre de 2026'

export default function Privacidad() {
  return (
    <article className="privacidad">
      <h1>Aviso de privacidad</h1>
      <p className="privacidad__version">
        Versión {VERSION_AVISO} · {FECHA_AVISO}
      </p>

      <div className="aviso">
        <p>
          <strong>En pocas palabras:</strong> solo pedimos los datos necesarios para conectarle
          con un intérprete de LESCO. No vendemos ni compartimos sus datos. No grabamos las
          videollamadas. Usted puede ver, corregir o borrar sus datos cuando quiera.
        </p>
      </div>

      <h2>¿Quién cuida sus datos?</h2>
      <p>
        El equipo de la Plataforma web de intermediación LESCO, un proyecto académico de la
        Universidad Técnica Nacional, Sede San Carlos. Puede escribirnos a{' '}
        <strong>privacidad@demo.cr</strong>.
      </p>

      <h2>¿Qué datos pedimos?</h2>
      <ul>
        <li>
          <strong>Para crear su cuenta:</strong> su nombre, su correo, una contraseña y su rol
          (persona sorda, funcionario o intérprete).
        </li>
        <li>
          <strong>Si usted es intérprete:</strong> su certificación de LESCO, sus especialidades y
          los horarios en que puede atender.
        </li>
        <li>
          <strong>Cuando agenda una cita:</strong> la fecha, la hora, el intérprete y el tipo de
          trámite (por ejemplo, una cita médica o una gestión en el banco).
        </li>
      </ul>

      <h2>¿Para qué los usamos?</h2>
      <ul>
        <li>Para que pueda entrar a su cuenta.</li>
        <li>Para mostrarle los intérpretes disponibles y agendar sus citas.</li>
        <li>Para que el intérprete sepa cuándo y para qué tipo de trámite le necesitan.</li>
      </ul>
      <p>No usamos sus datos para publicidad ni para nada más.</p>

      <h2>Datos sensibles</h2>
      <p>
        El tipo de trámite puede decir algo de su salud o de su dinero. Por eso solo lo ven usted y
        el intérprete de esa cita. Usted decide cuánto detalle escribe: basta con el tipo de
        trámite.
      </p>

      <h2>Las videollamadas</h2>
      <p>
        Las videollamadas <strong>no se graban</strong>. Solo pueden entrar las personas de esa
        cita.
      </p>

      <h2>¿Quién más ve sus datos?</h2>
      <p>
        Nadie fuera de la plataforma. No vendemos ni compartimos sus datos con otras empresas o
        instituciones, salvo que una ley nos obligue.
      </p>

      <h2>Sus derechos</h2>
      <p>Según la Ley 8968 de Protección de la Persona frente al Tratamiento de sus Datos Personales, usted puede:</p>
      <ul>
        <li>
          <strong>Ver</strong> qué datos tenemos de usted.
        </li>
        <li>
          <strong>Corregir</strong> un dato que esté mal.
        </li>
        <li>
          <strong>Borrar</strong> su cuenta y sus datos.
        </li>
        <li>
          <strong>Retirar</strong> su consentimiento en cualquier momento.
        </li>
      </ul>
      <p>
        Para hacerlo, escríbanos a <strong>privacidad@demo.cr</strong>. Le respondemos en un máximo
        de 5 días hábiles.
      </p>

      <h2>¿Es obligatorio aceptar?</h2>
      <p>
        Sí, para crear una cuenta. Sin estos datos no podemos agendarle una cita con un
        intérprete. Si no acepta, no se crea la cuenta y no guardamos nada.
      </p>

      <h2>Sobre este prototipo</h2>
      <div className="aviso">
        <p>
          Esta es una versión de prueba para un curso universitario. Todos los datos son
          ficticios y se guardan solo en su navegador, no en un servidor. No escriba datos reales.
        </p>
      </div>

      <p>
        <Link to="/registro" className="boton">
          Volver al registro
        </Link>
      </p>
    </article>
  )
}
