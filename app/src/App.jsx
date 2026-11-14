import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Inicio from './pages/Inicio.jsx'
import IniciarSesion from './pages/IniciarSesion.jsx'
import Registro from './pages/Registro.jsx'
import Panel from './pages/Panel.jsx'
import NoEncontrada from './pages/NoEncontrada.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="iniciar-sesion" element={<IniciarSesion />} />
        <Route path="registro" element={<Registro />} />
        <Route path="panel" element={<Panel />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  )
}
