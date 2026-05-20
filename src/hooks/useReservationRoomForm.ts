import { useCallback, useMemo, useState } from 'react'
import { getErrorMessage } from '../utils/error-handler'

export interface ReservationData {
  name: string
  date: string
  time: string
  justification: string
}

interface UseReservationRoomFormParams {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ReservationData) => void | Promise<void>
}

function formatDateToPtBr(date: Date) {
  return date.toLocaleDateString('pt-BR')
}

export function useReservationRoomForm({
  onSubmit,
}: Omit<UseReservationRoomFormParams, 'onClose' | 'isOpen'>) {
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
    () =>
      !!name.trim() &&
      !!date &&
      !!time &&
      !!justification.trim() &&
      !isSubmitting,
    [date, isSubmitting, justification, name, time]
  )

  const [error, setError] = useState<string | null>(null)

  const handleSubmit = useCallback(
    async (event?: React.SyntheticEvent) => {
      console.log('submit iniciado')
      event?.preventDefault()

      if (!date || !canSubmit) {
        if (!name.trim() || !date || !time || !justification.trim()) {
          setError('Por favor, preencha todos os campos obrigatórios.')
        } else if (isSubmitting) {
          console.warn('Submissão já em andamento')
        }
        return
      }

      setError(null)
      setIsSubmitting(true)

      try {
        await onSubmit({
          name: name.trim(),
          date: formatDateToPtBr(date),
          time,
          justification: justification.trim(),
        })
      } catch (err) {
        console.error('Erro na submissão:', err)
        setError(getErrorMessage(err))
      } finally {
        setIsSubmitting(false)
      }
    },
    [canSubmit, date, justification, name, onSubmit, time, isSubmitting]
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
