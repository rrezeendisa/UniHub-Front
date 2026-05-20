import { useState } from 'react'
import { agendamentoService } from '../services/agendamento-service'
import { salaService } from '../services/sala-service'

interface RoomReservationData {
  name: string
  date: string
  time: string
  justification: string
}

interface RoomReservationHandlers {
  onSuccess?: (roomName: string) => void
  onError?: (error: Error) => void
}

export function useRoomReservation(
  roomName: string,
  handlers?: RoomReservationHandlers
) {
  const [isLoading, setIsLoading] = useState(false)

  const submit = async (
    data: RoomReservationData
  ) => {
    try {
      setIsLoading(true)

      const userStr = localStorage.getItem('user')
      const user = userStr ? JSON.parse(userStr) : null

      console.log('user carregado', user)

      if (!user || !user.idUsuario) {
        console.error('[DEBUG] idUsuario não encontrado no objeto user:', user)
        throw new Error('Usuário não encontrado. Faça login novamente.')
      }

      // Buscar a sala para obter o ID pelo nome
      const salas = await salaService.getSalas()
      const sala = salas.find(s => s.nome === roomName)

      if (!sala) {
        throw new Error('Sala não encontrada')
      }

      // Formatar data de DD/MM/YYYY para YYYY-MM-DD
      const [day, month, year] = data.date.split('/')
      const formattedDate = `${year}-${month}-${day}`

      // Formatar hora de HH:mm para HH:mm:ss
      const formattedTime = `${data.time}:00`

      const payload = {
        idUsuario: user.idUsuario,
        idSala: sala.idSala,
        tipo: 'SALA' as const,
        data: formattedDate,
        horario: formattedTime,
        justificativa: data.justification || 'Reserva pelo sistema'
      }

      console.log('payload', payload)

      try {
        console.log('[DEBUG] Chamando agendamentoService.createAgendamento...')
        const response = await agendamentoService.createAgendamento(payload)
        console.log('[DEBUG] Resposta do servidor:', response)
      } catch (apiError) {
        console.error('[DEBUG] Erro capturado na chamada da API:', apiError)
        throw apiError
      }

      window.dispatchEvent(new Event('meus-agendamentos:changed'))
      handlers?.onSuccess?.(roomName)
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error')
      console.error('Erro ao reservar sala:', err)
      handlers?.onError?.(err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { submit, isLoading }
}
