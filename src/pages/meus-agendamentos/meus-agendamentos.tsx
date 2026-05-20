import { useState } from 'react'
import { MenuCard } from '../../components/Menu/menu-card'
import { Toast } from '../../components/Toast/toast'
import { Button } from '../../components/Button/button'
import { CancelationModal } from '../../components/Modal/cancelation-modal'
import { LoadingSpinner } from '../../components/LoadingSpinner/loading-spinner'
import type { MeusAgendamentosReservation } from '../../types/schedule'
import { Badge } from '../../components/Badge/badge'
import { openFeedbackForm } from '../../utils/forms-redirect-utils'
import { useMeusAgendamentos } from '../../hooks/useMeusAgendamentos'
import { useCancelReservation } from '../../hooks/useCancelReservation'
import { sortReservationsByDate } from '../../utils/meus-agendamentos-utils'
import { ReservationsList } from '../../components/ReservationsList/reservations-list'

function PageHeader() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mb-3">
        <Badge>Meus agendamentos</Badge>
      </div>

      <h1 className="mt-4 text-xl! font-bold leading-tight text-[var(--color-text)] sm:text-3xl lg:text-4xl">
        Veja seus agendamentos disponiveis.
      </h1>

      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-muted)] sm:text-base">
        Acompanhe e gerencie suas reservas em tempo real.
      </p>
    </div>
  )
}

export function MeusAgendamentosPage() {
  const { reservations, isLoading, removeReservation } = useMeusAgendamentos()
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [selectedReservation, setSelectedReservation] =
    useState<MeusAgendamentosReservation | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const { execute: cancelReservation, isLoading: isLoadingCancel } =
    useCancelReservation({
      onSuccess: (reservation) => {
        removeReservation(reservation.id)
        setToastMessage(
          `Reserva ${reservation.reservationName} cancelada com sucesso!`
        )
        setIsCancelModalOpen(false)
        setSelectedReservation(null)
      },
    })

  const sortedReservations = sortReservationsByDate(reservations)

  const handleCancelClick = (reservation: MeusAgendamentosReservation) => {
    setSelectedReservation(reservation)
    setIsCancelModalOpen(true)
  }

  const handleCancelConfirm = async () => {
    if (!selectedReservation) return
    await cancelReservation(selectedReservation)
  }

  const handleCancelClose = () => {
    setIsCancelModalOpen(false)
    setSelectedReservation(null)
  }

  if (isLoading) {
    return <LoadingSpinner fullScreen message="Carregando..." />
  }

  return (
    <div className="min-h-screen overflow-x-hidden px-4 py-4 sm:px-5 sm:py-5 lg:px-6">
      {toastMessage && (
        <Toast type="success" onClose={() => setToastMessage(null)}>
          {toastMessage}
        </Toast>
      )}

      <div className="mx-auto flex w-full max-w-[92rem] flex-col items-stretch gap-5 lg:flex-row lg:gap-5">
        <aside className="flex w-full flex-shrink-0 flex-col gap-3 lg:w-72 lg:min-w-[18rem] lg:self-stretch">
          <div>
            <Button
              variant="primary"
              size="medium"
              onClick={openFeedbackForm}
              className="w-full"
            >
              D&ecirc; o seu feedback
            </Button>
          </div>

          <MenuCard className="lg:min-h-[520px] lg:flex-1" />
        </aside>

        <main className="min-w-0 flex-1">
          <section className="overflow-hidden rounded-3xl border border-[var(--color-gray-light)] bg-[var(--color-surface)] p-5 shadow-sm sm:p-6 lg:p-6">
            <PageHeader />

            <ReservationsList
              reservations={sortedReservations}
              onCancel={handleCancelClick}
            />
          </section>

          <CancelationModal
            isOpen={isCancelModalOpen}
            onClose={handleCancelClose}
            onConfirm={handleCancelConfirm}
            isLoading={isLoadingCancel}
          />
        </main>
      </div>
    </div>
  )
}
