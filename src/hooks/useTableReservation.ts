import { useState } from 'react'
import { agendamentoService } from '../services/agendamento-service'

interface ReservationData {
  name: string
  date: Date | null
  time: string
  justification?: string
}

interface ReservationHandlers {
  onSuccess?: (tableName: string) => void
  onError?: (error: Error) => void
}

export function useTableReservation(
  tableId: number,
  handlers?: ReservationHandlers
) {
  const [isLoading, setIsLoading] = useState(false)

  const submit = async (
    data: ReservationData,
    formatDateFn: (date: Date) => string
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

      if (!tableId) {
        throw new Error('Mesa não selecionada')
      }

      const dateStr = data.date ? formatDateFn(data.date) : ''
      // Formatar data de DD/MM/YYYY para YYYY-MM-DD
      const [day, month, year] = dateStr.split('/')
      const formattedDate = `${year}-${month}-${day}`

      // Formatar hora de HH:mm para HH:mm:ss
      const formattedTime = `${data.time}:00`

      const payload = {
        idUsuario: user.idUsuario,
        idMesa: tableId,
        tipo: 'MESA' as const,
        data: formattedDate,
        horario: formattedTime,
        justificativa: data.justification || 'Reserva pelo sistema',
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
      handlers?.onSuccess?.(`Mesa ${tableId}`)
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error')
      console.error('Erro ao reservar mesa:', err)
      handlers?.onError?.(err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { submit, isLoading }
}
