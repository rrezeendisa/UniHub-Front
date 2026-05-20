import type { MeusAgendamentosReservation } from '../../types/schedule'
import { ReservationCard } from '../ReservationCard/reservation-card'
import { EmptySchedule } from '../empty-schedule/empty-schedule'

interface ReservationsListProps {
  reservations: MeusAgendamentosReservation[]
  onCancel: (reservation: MeusAgendamentosReservation) => void
}

export function ReservationsList({
  reservations,
  onCancel,
}: ReservationsListProps) {
  if (reservations.length === 0) {
    return (
      <div className="mt-6">
        <EmptySchedule />
      </div>
    )
  }

  return (
    <div className="mt-6 max-h-[560px] overflow-y-auto overflow-x-hidden pr-2 lg:max-h-[620px]">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {reservations.map((reservation) => (
          <ReservationCard
            key={reservation.id}
            reservationName={reservation.reservationName}
            date={reservation.date}
            startTime={reservation.startTime}
            endTime={reservation.endTime}
            onCancel={() => onCancel(reservation)}
          />
        ))}
      </div>
    </div>
  )
}
