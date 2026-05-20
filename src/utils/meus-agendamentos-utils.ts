import type { MeusAgendamentosReservation } from '../types/schedule'

export const formatTimeRange = (startTime: string, endTime: string): string => {
  const [startHour] = startTime.split(':')
  const [endHour] = endTime.split(':')
  return `${startHour}h-${endHour}h`
}

export const addOneHourToTime = (time: string): string => {
  const [hour = '0', minute = '00', second = '00'] = time.split(':')
  const nextHour = (Number(hour) + 1) % 24
  return `${String(nextHour).padStart(2, '0')}:${minute}:${second}`
}

export const sortReservationsByDate = (
  reservations: MeusAgendamentosReservation[]
): MeusAgendamentosReservation[] => {
  const parseDate = (dateStr: string) => {
    const [d, m, y] = dateStr.split('/')
    return new Date(Number(y), Number(m) - 1, Number(d)).getTime()
  }

  const parseTimeMinutes = (timeStr: string) => {
    if (!timeStr) return 0
    const [h, min] = timeStr.split(':').map((n) => Number(n || 0))
    return h * 60 + min
  }

  return [...reservations].sort((a, b) => {
    const ta = parseDate(a.date)
    const tb = parseDate(b.date)

    // order by date DESC (mais recente primeiro)
    if (tb !== ta) return tb - ta

    // mesma data: ordernar pelo horário de início DESC (mais tarde primeiro)
    const sa = parseTimeMinutes(a.startTime)
    const sb = parseTimeMinutes(b.startTime)
    return sb - sa
  })
}
