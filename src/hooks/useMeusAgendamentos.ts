import { useState, useEffect, useCallback } from 'react'
import type { MeusAgendamentosReservation } from '../types/schedule'
import { agendamentoService } from '../services/agendamento-service'
import { addOneHourToTime } from '../utils/meus-agendamentos-utils'

export function useMeusAgendamentos() {
  const [reservations, setReservations] = useState<MeusAgendamentosReservation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchReservations = useCallback(async () => {
    setIsLoading(true)
    try {
      const userStr = localStorage.getItem('user')
      const user = userStr ? JSON.parse(userStr) : null
      
      let agendamentos: any[] = []
      
      if (user?.idUsuario) {
        try {
          agendamentos = await agendamentoService.getAgendamentosByUser(user.idUsuario)
        } catch (err) {
          console.warn('Endpoint de agendamentos por usuário não disponível, tentando geral...')
          agendamentos = await agendamentoService.getAgendamentos()
        }
      } else {
        agendamentos = await agendamentoService.getAgendamentos()
      }

      const formatted: MeusAgendamentosReservation[] = agendamentos.map(a => {
        return {
          id: a.idAgendamento,
          reservationName: a.local || (a.tipo === 'SALA' ? `Sala ${a.idSala}` : `Mesa ${a.idMesa}`),
          type: a.tipo === 'SALA' ? 'sala' : 'mesa',
          date: a.data,
          startTime: a.horario,
          endTime: addOneHourToTime(a.horario),
          status: a.status === 'CANCELADO' || a.status === 'CONCLUIDO' ? 'canceled' : 'active'
        }
      })

      setReservations(formatted.filter(r => r.status === 'active'))
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchReservations()
  }, [fetchReservations])

  useEffect(() => {
    const handler = () => fetchReservations()
    window.addEventListener('meus-agendamentos:changed', handler)
    return () =>
      window.removeEventListener('meus-agendamentos:changed', handler)
  }, [fetchReservations])

  const removeReservation = (id: number) => {
    setReservations((prev) => prev.filter((res) => res.id !== id))
  }

  return { reservations, isLoading, removeReservation, refresh: fetchReservations }
}
