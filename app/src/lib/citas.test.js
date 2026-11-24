import { beforeEach, describe, expect, it } from 'vitest'
import { guardarDatos, leerDatos, restablecerDatos } from './almacen.js'
import {
  agendarCita,
  buscarInterpretes,
  diaDeFecha,
  esParticipante,
  estadoEnlace,
  horariosLibres,
  listarCitas,
} from './citas.js'

// Fechas fijas para que las pruebas no dependan del día en que se corren.
// 23/11/2026 es lunes; 25/11/2026 es miércoles.
const AHORA = new Date(2026, 10, 23, 7, 0) // lunes 23/11/2026, 07:00
const LUNES = '2026-11-23'
const MIERCOLES = '2026-11-25'
const DOMINGO = '2026-11-29'

const ana = { id: 'u-1', rol: 'persona_sorda' }
const carlos = { id: 'u-2', rol: 'funcionario' }
const laura = { id: 'u-3', rol: 'interprete' }
const diego = { id: 'u-4', rol: 'interprete' }

describe('citas (Sprint 2)', () => {
  beforeEach(() => {
    window.localStorage.clear()
    restablecerDatos()
    // Sin la cita de demostración, para que los resultados sean predecibles
    const datos = leerDatos()
    datos.citas = []
    guardarDatos(datos)
  })

  describe('HU-06 · buscar intérpretes', () => {
    it('sabe qué día de la semana es cada fecha', () => {
      expect(diaDeFecha(LUNES)).toBe('lunes')
      expect(diaDeFecha(MIERCOLES)).toBe('miercoles')
      expect(diaDeFecha(DOMINGO)).toBe('domingo')
    })

    it('arma horas libres de 1 hora dentro del horario del intérprete', () => {
      // Laura: lunes de 08:00 a 12:00
      expect(horariosLibres('u-3', LUNES, { ahora: AHORA })).toEqual(['08:00', '09:00', '10:00', '11:00'])
    })

    it('no ofrece horas que ya pasaron', () => {
      const lunesTarde = new Date(2026, 10, 23, 9, 30)
      expect(horariosLibres('u-3', LUNES, { ahora: lunesTarde })).toEqual(['10:00', '11:00'])
    })

    it('encuentra solo intérpretes con horas libres en esa fecha', () => {
      const r = buscarInterpretes({ fecha: LUNES }, { ahora: AHORA })
      expect(r.ok).toBe(true)
      expect(r.resultados.map((i) => i.interpreteId)).toEqual(['u-3'])
    })

    it('filtra por franja horaria', () => {
      const manana = buscarInterpretes({ fecha: MIERCOLES, franja: 'manana' }, { ahora: AHORA })
      const tarde = buscarInterpretes({ fecha: MIERCOLES, franja: 'tarde' }, { ahora: AHORA })
      expect(manana.resultados).toHaveLength(0)
      expect(tarde.resultados[0].horas).toEqual(['13:00', '14:00', '15:00', '16:00'])
    })

    it('filtra por tipo de trámite', () => {
      const r = buscarInterpretes({ fecha: LUNES, tramite: 'Legal' }, { ahora: AHORA })
      expect(r.resultados).toHaveLength(0)
    })

    it('no muestra intérpretes sin verificar', () => {
      const datos = leerDatos()
      datos.interpretes.find((i) => i.usuarioId === 'u-3').verificado = false
      guardarDatos(datos)
      expect(buscarInterpretes({ fecha: LUNES }, { ahora: AHORA }).resultados).toHaveLength(0)
    })

    it('si no hay resultados, sugiere la fecha más cercana disponible', () => {
      // Nadie atiende los domingos; el lunes siguiente sí (Laura)
      const r = buscarInterpretes({ fecha: DOMINGO }, { ahora: AHORA })
      expect(r.resultados).toHaveLength(0)
      expect(r.sugerencia).toBe('2026-11-30')
    })

    it('no permite buscar en una fecha pasada', () => {
      const r = buscarInterpretes({ fecha: '2026-11-20' }, { ahora: AHORA })
      expect(r.ok).toBe(false)
      expect(r.errores.fecha).toBeTruthy()
    })
  })

  describe('HU-07 · agendar y bloqueo del horario', () => {
    const pedido = { interpreteId: 'u-3', fecha: LUNES, inicio: '09:00', tramite: 'Salud' }

    it('agenda la cita con fecha, hora, intérprete y trámite', () => {
      const r = agendarCita(ana, pedido, { ahora: AHORA })
      expect(r.ok).toBe(true)
      expect(r.cita).toMatchObject({ interpreteId: 'u-3', fecha: LUNES, inicio: '09:00', fin: '10:00', tramite: 'Salud' })
      expect(r.cita.sala).toMatch(/^puente-lesco-/)
    })

    it('bloquea el horario: la misma hora ya no aparece libre', () => {
      agendarCita(ana, pedido, { ahora: AHORA })
      expect(horariosLibres('u-3', LUNES, { ahora: AHORA })).toEqual(['08:00', '10:00', '11:00'])
    })

    it('bloquea el horario: otra persona no puede agendar la misma hora', () => {
      agendarCita(ana, pedido, { ahora: AHORA })
      const r = agendarCita(carlos, pedido, { ahora: AHORA })
      expect(r.ok).toBe(false)
      expect(r.errores.general).toMatch(/ya no está libre/)
      expect(leerDatos().citas).toHaveLength(1)
    })

    it('no agenda fuera del horario del intérprete', () => {
      const r = agendarCita(ana, { ...pedido, inicio: '15:00' }, { ahora: AHORA })
      expect(r.ok).toBe(false)
    })

    it('pide el tipo de trámite', () => {
      const r = agendarCita(ana, { ...pedido, tramite: '' }, { ahora: AHORA })
      expect(r.ok).toBe(false)
      expect(r.errores.tramite).toBeTruthy()
    })

    it('un intérprete no puede agendar citas', () => {
      const r = agendarCita(laura, pedido, { ahora: AHORA })
      expect(r.ok).toBe(false)
    })
  })

  describe('HU-08 (versión simple) · la cita queda aceptada y en la agenda del intérprete', () => {
    it('la cita nace aceptada y la ven las dos personas', () => {
      agendarCita(ana, { interpreteId: 'u-3', fecha: LUNES, inicio: '10:00', tramite: 'Salud' }, { ahora: AHORA })
      const deLaura = listarCitas(laura)
      const deAna = listarCitas(ana)
      expect(deLaura).toHaveLength(1)
      expect(deLaura[0].estado).toBe('aceptada')
      expect(deLaura[0].conQuien).toMatch(/Ana/)
      expect(deAna[0].conQuien).toMatch(/Laura/)
      expect(listarCitas(diego)).toHaveLength(0)
    })
  })

  describe('HU-11 · unirse a la videollamada', () => {
    const cita = { solicitanteId: 'u-1', interpreteId: 'u-3', fecha: LUNES, inicio: '09:00', fin: '10:00' }

    it('el enlace se habilita 10 minutos antes y se cierra al terminar la cita', () => {
      expect(estadoEnlace(cita, new Date(2026, 10, 23, 8, 49))).toBe('pronto')
      expect(estadoEnlace(cita, new Date(2026, 10, 23, 8, 50))).toBe('abierto')
      expect(estadoEnlace(cita, new Date(2026, 10, 23, 9, 59))).toBe('abierto')
      expect(estadoEnlace(cita, new Date(2026, 10, 23, 10, 0))).toBe('terminada')
    })

    it('solo los participantes pueden entrar', () => {
      expect(esParticipante(ana, cita)).toBe(true)
      expect(esParticipante(laura, cita)).toBe(true)
      expect(esParticipante(carlos, cita)).toBe(false)
      expect(esParticipante(diego, cita)).toBe(false)
      expect(esParticipante(null, cita)).toBe(false)
    })
  })
})
