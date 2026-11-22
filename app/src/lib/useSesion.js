import { useEffect, useState } from 'react'
import { EVENTO_SESION, usuarioActual } from './sesion.js'

// Devuelve el usuario con sesión abierta y se actualiza cuando alguien
// inicia o cierra sesión (también desde otra pestaña).
export function useSesion() {
  const [usuario, setUsuario] = useState(() => usuarioActual())

  useEffect(() => {
    const actualizar = () => setUsuario(usuarioActual())
    window.addEventListener(EVENTO_SESION, actualizar)
    window.addEventListener('storage', actualizar)
    return () => {
      window.removeEventListener(EVENTO_SESION, actualizar)
      window.removeEventListener('storage', actualizar)
    }
  }, [])

  return usuario
}
