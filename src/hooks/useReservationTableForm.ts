import { useCallback, useMemo, useState } from 'react'
import { getErrorMessage } from '../utils/error-handler'

export interface ReservationData {
  name: string
  date: Date | null
  time: string
  justification: string
}

interface UseReservationTableFormParams {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ReservationData) => void | Promise<void>
}

export function useReservationTableForm({
  onSubmit,
}: Omit<UseReservationTableFormParams, 'onClose' | 'isOpen'>) {
  const [name, setName] = useState('')
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState('')
  const [justification, setJustification] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const clearForm = useCallback(() => {
    setName('')
    setDate(null)
    setTime('')
    setJustification('')
  }, [])

  const canSubmit = useMemo(
    () => Boolean(name.trim() && date && time && justification.trim() && !isSubmitting),
    [date, isSubmitting, name, time, justification]
  )

  const [error, setError] = useState<string | null>(null)

  const handleSubmit = useCallback(
    async (event?: React.SyntheticEvent) => {
      console.log('submit iniciado')
      event?.preventDefault()

      if (!canSubmit) {
        if (!name.trim() || !date || !time || !justification.trim()) {
          setError('Por favor, preencha todos os campos obrigatórios.')
        }
        return
      }

      setError(null)
      setIsSubmitting(true)

      try {
        await onSubmit({ name: name.trim(), date, time, justification: justification.trim() })
      } catch (err) {
        console.error('Erro na submissão:', err)
        setError(getErrorMessage(err))
      } finally {
        setIsSubmitting(false)
      }
    },
    [canSubmit, date, name, onSubmit, time, justification]
  )

  return {
    name,
    setName,
    date,
    setDate,
    time,
    setTime,
    justification,
    setJustification,
    isSubmitting,
    canSubmit,
    handleSubmit,
    clearForm,
    error,
  }
}
