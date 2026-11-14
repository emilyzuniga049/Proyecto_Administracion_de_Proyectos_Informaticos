import { beforeEach, describe, expect, it } from 'vitest'
import { guardarDatos, iniciarDatos, leerDatos, restablecerDatos } from './almacen.js'

describe('almacén de datos del prototipo', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('carga los datos de prueba la primera vez', () => {
    iniciarDatos()
    const datos = leerDatos()
    expect(datos.usuarios.length).toBeGreaterThan(0)
    expect(datos.citas).toEqual([])
  })

  it('no borra lo guardado si ya hay datos', () => {
    iniciarDatos()
    const datos = leerDatos()
    datos.citas.push({ id: 'c-1' })
    guardarDatos(datos)
    iniciarDatos()
    expect(leerDatos().citas).toHaveLength(1)
  })

  it('restablecer vuelve a los datos de prueba', () => {
    iniciarDatos()
    const datos = leerDatos()
    datos.citas.push({ id: 'c-1' })
    guardarDatos(datos)
    restablecerDatos()
    expect(leerDatos().citas).toEqual([])
  })

  it('solo usa datos ficticios del dominio demo', () => {
    const { usuarios } = leerDatos()
    for (const usuario of usuarios) {
      expect(usuario.correo.endsWith('@demo.cr')).toBe(true)
    }
  })
})
