import { Link } from 'react-router-dom'
import './Inicio.css'
import Icono from '../components/Icono.jsx'

export default function Inicio() {
  return (
    <>
      <h1>Hable con un intérprete de LESCO cuando lo necesite</h1>
      <p className="intro">
        Agende una cita con un intérprete de LESCO certificado y realícela por videollamada, desde
        su computadora o su celular. Sin instalar nada.
      </p>

      <p className="acciones">
        <Link to="/registro" className="boton">
          Crear una cuenta
        </Link>
        <Link to="/iniciar-sesion" className="boton boton--secundario">
          Ya tengo cuenta
        </Link>
      </p>

      <h2>¿Cómo funciona?</h2>
      <ol className="pasos">
        <li className="tarjeta">
          <span className="pasos__icono"><Icono nombre="cuenta" /></span>
          <h3>1. Cree su cuenta</h3>
          <p>Como persona sorda, funcionario o intérprete.</p>
        </li>
        <li className="tarjeta">
          <span className="pasos__icono"><Icono nombre="calendario" /></span>
          <h3>2. Agende una cita</h3>
          <p>Elija un intérprete, el día y la hora que le sirvan.</p>
        </li>
        <li className="tarjeta">
          <span className="pasos__icono"><Icono nombre="video" /></span>
          <h3>3. Entre a la videollamada</h3>
          <p>A la hora de la cita, entre a la llamada desde la plataforma.</p>
        </li>
      </ol>
    </>
  )
}
