import { CalendarIcon, ClockIcon } from '@radix-ui/react-icons'
import { Button } from '../Button/button'
import { InfoCard, InfoCardHeader } from '../InfoCard/info-card'
import { formatTimeRange } from '../../utils/meus-agendamentos-utils'

export interface ReservationCardProps {
  reservationName: string
  date: string
  startTime: string
  endTime: string
  onCancel: () => void
}

export function ReservationCard({
  reservationName,
  date,
  startTime,
  endTime,
  onCancel,
}: ReservationCardProps) {
  return (
    <InfoCard className="group flex h-full flex-col justify-between p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div>
        <InfoCardHeader
          badge={reservationName}
          badgeClassName="mx-auto"
          className="mb-4"
        />

        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 flex-shrink-0 text-[var(--color-text-muted)]" />

            <div className="min-w-0 text-xs text-[var(--color-text-muted)] sm:text-sm">
              <span className="font-semibold text-[var(--color-text)]">
                Data:
              </span>

              <span className="ml-1 text-[var(--color-text-muted)]">
                {date}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4 flex-shrink-0 text-[var(--color-text-muted)]" />

            <div className="min-w-0 text-xs text-[var(--color-text-muted)] sm:text-sm">
              <span className="font-semibold text-[var(--color-text)]">
                Horário:
              </span>

              <span className="ml-1 text-[var(--color-text-muted)]">
                {formatTimeRange(startTime, endTime)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-center">
        <Button variant="outline" size="medium" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </InfoCard>
  )
}
