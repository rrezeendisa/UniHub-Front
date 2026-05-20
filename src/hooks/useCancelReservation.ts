import { useState } from 'react'
import type { MeusAgendamentosReservation } from '../types/schedule'
import { agendamentoService } from '../services/agendamento-service'

interface CancelReservationHandler {
  onSuccess?: (reservation: MeusAgendamentosReservation) => void
  onError?: (error: Error) => void
}

export function useCancelReservation(handlers?: CancelReservationHandler) {
  const [isLoading, setIsLoading] = useState(false)

  const execute = async (reservation: MeusAgendamentosReservation) => {
    try {
      setIsLoading(true)
      
      await agendamentoService.cancelarAgendamento(reservation.id)

      window.dispatchEvent(new Event('meus-agendamentos:changed'))
      handlers?.onSuccess?.(reservation)
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error')
      handlers?.onError?.(err)
    } finally {
      setIsLoading(false)
    }
  }

  return { execute, isLoading }
}
