import { beforeEach, describe, expect, it } from 'vitest'
import { iniciarDatos, leerDatos } from './almacen.js'
import { cerrarSesion, iniciarSesion, registrar, usuarioActual } from './sesion.js'

const cuentaValida = {
  nombre: 'Persona de Prueba',
  correo: 'prueba@demo.cr',
  contrasena: 'clave1234',
  rol: 'persona_sorda',
  consentimiento: { aceptado: true, version: '1.0' },
}

describe('registro (HU-01, HU-05)', () => {
  beforeEach(() => {
    window.localStorage.clear()
    iniciarDatos()
  })

  it('crea la cuenta con su rol y deja la sesión abierta', () => {
    const r = registrar(cuentaValida)
    expect(r.ok).toBe(true)
    expect(r.usuario.rol).toBe('persona_sorda')
    expect(r.usuario.contrasena).toBeUndefined()
    expect(usuarioActual().correo).toBe('prueba@demo.cr')
  })

  it('guarda la versión y la fecha del aviso aceptado', () => {
    registrar(cuentaValida)
    const guardado = leerDatos().usuarios.find((u) => u.correo === 'prueba@demo.cr')
    expect(guardado.consentimiento.version).toBe('1.0')
    expect(guardado.consentimiento.fecha).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('no permite crear la cuenta sin aceptar el aviso', () => {
    const r = registrar({ ...cuentaValida, consentimiento: { aceptado: false, version: '1.0' } })
    expect(r.ok).toBe(false)
    expect(r.errores.consentimiento).toBeTruthy()
  })

  it('rechaza un correo ya registrado, sin importar mayúsculas', () => {
    const r = registrar({ ...cuentaValida, correo: 'ANA@demo.cr' })
    expect(r.ok).toBe(false)
    expect(r.errores.correo).toMatch(/Ya existe una cuenta/)
  })

  it('valida nombre, correo, contraseña y rol', () => {
    const r = registrar({ nombre: 'A', correo: 'malo', contrasena: '123', rol: '', consentimiento: { aceptado: true, version: '1.0' } })
    expect(Object.keys(r.errores).sort()).toEqual(['contrasena', 'correo', 'nombre', 'rol'])
  })

  it('un intérprete nuevo queda pendiente de verificación (HU-02)', () => {
    const r = registrar({ ...cuentaValida, correo: 'nuevo@demo.cr', rol: 'interprete' })
    const perfil = leerDatos().interpretes.find((i) => i.usuarioId === r.usuario.id)
    expect(perfil.verificado).toBe(false)
  })
})

describe('inicio de sesión (HU-01)', () => {
  beforeEach(() => {
    window.localStorage.clear()
    iniciarDatos()
  })

  it('entra con un usuario de prueba y conoce su rol', () => {
    const r = iniciarSesion('laura@demo.cr', 'demo1234')
    expect(r.ok).toBe(true)
    expect(usuarioActual().rol).toBe('interprete')
  })

  it('rechaza una contraseña incorrecta sin decir cuál dato falló', () => {
    const r = iniciarSesion('laura@demo.cr', 'otra')
    expect(r.ok).toBe(false)
    expect(r.errores.general).toMatch(/correo o la contraseña/)
    expect(usuarioActual()).toBeNull()
  })

  it('pide los campos vacíos', () => {
    const r = iniciarSesion('', '')
    expect(r.errores.correo).toBeTruthy()
    expect(r.errores.contrasena).toBeTruthy()
  })

  it('cerrar sesión deja sin usuario', () => {
    iniciarSesion('ana@demo.cr', 'demo1234')
    cerrarSesion()
    expect(usuarioActual()).toBeNull()
  })
})
