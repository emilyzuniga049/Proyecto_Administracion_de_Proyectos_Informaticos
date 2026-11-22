import { beforeEach, describe, expect, it } from 'vitest'
import { iniciarDatos } from './almacen.js'
import {
  buscarTraslape,
  eliminarBloque,
  guardarBloque,
  guardarPerfil,
  listarBloques,
  obtenerPerfil,
} from './disponibilidad.js'

const LAURA = 'u-3' // tiene lunes 08:00-12:00 y miércoles 13:00-17:00 en los datos de prueba

describe('validación de traslapes (HU-03)', () => {
  const lunes = { id: 'a', dia: 'lunes', inicio: '08:00', fin: '12:00' }

  it('detecta un bloque que empieza dentro de otro', () => {
    expect(buscarTraslape({ id: 'b', dia: 'lunes', inicio: '11:00', fin: '13:00' }, [lunes])).toBe(lunes)
  })

  it('detecta un bloque que contiene a otro', () => {
    expect(buscarTraslape({ id: 'b', dia: 'lunes', inicio: '07:00', fin: '13:00' }, [lunes])).toBe(lunes)
  })

  it('permite bloques que solo se tocan', () => {
    expect(buscarTraslape({ id: 'b', dia: 'lunes', inicio: '12:00', fin: '14:00' }, [lunes])).toBeNull()
  })

  it('permite la misma hora en otro día', () => {
    expect(buscarTraslape({ id: 'b', dia: 'martes', inicio: '08:00', fin: '12:00' }, [lunes])).toBeNull()
  })

  it('un bloque no choca consigo mismo al editarlo', () => {
    expect(buscarTraslape({ id: 'a', dia: 'lunes', inicio: '09:00', fin: '12:00' }, [lunes])).toBeNull()
  })
})

describe('guardar, consultar y eliminar horarios (HU-03)', () => {
  beforeEach(() => {
    window.localStorage.clear()
    iniciarDatos()
  })

  it('consulta los horarios guardados, ordenados por día', () => {
    const dias = listarBloques(LAURA).map((b) => b.dia)
    expect(dias).toEqual(['lunes', 'miercoles'])
  })

  it('crea un horario nuevo y se puede consultar', () => {
    const r = guardarBloque(LAURA, { dia: 'viernes', inicio: '09:00', fin: '11:00' })
    expect(r.ok).toBe(true)
    expect(listarBloques(LAURA)).toHaveLength(3)
  })

  it('rechaza un horario que choca y dice con cuál', () => {
    const r = guardarBloque(LAURA, { dia: 'lunes', inicio: '10:00', fin: '13:00' })
    expect(r.ok).toBe(false)
    expect(r.errores.general).toBe('Choca con su horario del lunes de 08:00 a 12:00.')
  })

  it('rechaza un fin antes del inicio', () => {
    const r = guardarBloque(LAURA, { dia: 'jueves', inicio: '14:00', fin: '13:00' })
    expect(r.errores.fin).toBeTruthy()
  })

  it('edita un horario existente', () => {
    const r = guardarBloque(LAURA, { id: 'd-1', dia: 'lunes', inicio: '07:00', fin: '11:00' })
    expect(r.ok).toBe(true)
    expect(listarBloques(LAURA).find((b) => b.id === 'd-1').inicio).toBe('07:00')
  })

  it('no deja editar ni borrar horarios de otro intérprete', () => {
    expect(guardarBloque(LAURA, { id: 'd-3', dia: 'martes', inicio: '09:00', fin: '10:00' }).ok).toBe(false)
    expect(eliminarBloque(LAURA, 'd-3').ok).toBe(false)
  })

  it('elimina un horario', () => {
    expect(eliminarBloque(LAURA, 'd-1').ok).toBe(true)
    expect(listarBloques(LAURA)).toHaveLength(1)
  })

  it('guarda el perfil y exige al menos una especialidad', () => {
    expect(guardarPerfil(LAURA, { descripcion: 'Hola', especialidades: [] }).ok).toBe(false)
    expect(guardarPerfil(LAURA, { descripcion: 'Hola', especialidades: ['Legal'] }).ok).toBe(true)
    expect(obtenerPerfil(LAURA).especialidades).toEqual(['Legal'])
  })
})
