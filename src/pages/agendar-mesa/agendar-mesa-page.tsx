import { useState, useEffect, useRef } from 'react'
import { MenuCard } from '../../components/Menu/menu-card'
import { Toast } from '../../components/Toast/toast'
import { Button } from '../../components/Button/button'
import { LoadingSpinner } from '../../components/LoadingSpinner/loading-spinner'
import { openFeedbackForm } from '../../utils/forms-redirect-utils'
import { useTableAvailability } from '../../hooks/useTableAvailability'
import { useTimeFormatting } from '../../hooks/useTimeFormatting'
import { useTableReservation } from '../../hooks/useTableReservation'
import { TableContainer } from '../../components/TableContainer/table-container'
import { PageTableHeader } from '../../components/PageTableHeader/page-table-header'
import { TextInput } from '../../components/Input/text-input'
import { Calendar } from '../../components/Calendar/calendar'
import { ButtonSpinner } from '../../components/ButtonSpinner/button-spinner'
import { useReservationTableForm } from '../../hooks/useReservationTableForm'
import { ArrowLeftIcon } from '../../icons/lib/arrow-left-icon'

import type { TableReservation } from '../../types/table'

export function AgendarMesaPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTable, setSelectedTable] = useState<TableReservation | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const { tables, refreshTables } = useTableAvailability()
  const { formatDateToPtBr } = useTimeFormatting()

  const handleReservationSuccess = () => {
    const tableName = selectedTable?.name || ''
    refreshTables()
    setSelectedTable(null)
    setToastMessage(`${tableName} agendada com sucesso!`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const { submit: submitReservation, isLoading: isReserving } = useTableReservation(selectedTable?.id || 0, {
    onSuccess: handleReservationSuccess,
  })

  const {
    name,
    setName,
    date,
    setDate,
    time,
    setTime,
    justification,
    setJustification,
    isSubmitting: isFormSubmitting,
    canSubmit,
    handleSubmit,
    clearForm,
    error,
  } = useReservationTableForm({
    onSubmit: async (data) => {
      console.log('[DEBUG] onSubmit AgendarMesaPage iniciado')
      try {
        await submitReservation(data, formatDateToPtBr)
        console.log('[DEBUG] submitReservation finalizado com sucesso')
      } catch (err) {
        console.error('[DEBUG] Erro no submitReservation:', err)
        throw err
      }
    },
  })

  const isSubmitting = isFormSubmitting || isReserving
  const selectedTableSideLabel =
    selectedTable?.side === 'left' ? 'Esquerda' : 'Direita'
  const selectedTableTitle = selectedTable
    ? `${selectedTable.name || `Mesa ${String(selectedTable.id).padStart(2, '0')}`} (${selectedTableSideLabel})`
    : ''

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 250)
    return () => clearTimeout(timer)
  }, [])

  const handleTableSelect = (table: TableReservation) => {
    setSelectedTable(table)
    clearForm()
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const handleCancel = () => {
    setSelectedTable(null)
    clearForm()
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

      <div className="hidden">
        <Button variant="primary" size="medium" onClick={openFeedbackForm}>
          Dê o seu feedback
        </Button>
      </div>

      <div className="mx-auto flex w-full max-w-[92rem] flex-col items-stretch gap-5 lg:flex-row lg:gap-5">
        <aside className="flex w-full flex-shrink-0 flex-col gap-3 lg:w-72 lg:min-w-[18rem] lg:self-stretch">
          <Button
            variant="primary"
            size="medium"
            onClick={openFeedbackForm}
            className="w-full"
          >
            D&ecirc; o seu feedback
          </Button>
          <MenuCard className="lg:min-h-[520px] lg:flex-1" />
        </aside>

        <main className="min-w-0 flex-1">
          <section className="overflow-hidden rounded-3xl border border-[var(--color-gray-light)] bg-[var(--color-surface)] p-5 shadow-sm sm:p-6 lg:p-6">
            <PageTableHeader />

            <div className="mt-6 sm:mt-7">
              <TableContainer
                tables={tables}
                onTableSelect={handleTableSelect}
              />
            </div>
          </section>

          {selectedTable && (
            <section
              ref={formRef}
              className="mt-6 rounded-3xl border border-[var(--color-primary)] bg-[var(--color-surface)] p-5 shadow-md sm:p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[var(--color-primary)]">
                    {selectedTableTitle}
                  </h2>
                  <p className="text-[var(--color-text-muted)]">
                    Reserva de Mesa
                  </p>
                </div>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
                >
                  <ArrowLeftIcon />
                  Voltar para seleção
                </button>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {error && (
                  <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 md:col-span-2">
                    {error}
                  </div>
                )}
                <div className="md:col-span-2">
                  <TextInput
                    label="Nome Completo"
                    value={name}
                    onChange={setName}
                    isObrigatorie
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Calendar
                    selected={date}
                    onChange={setDate}
                    label="Data da Reserva"
                    isObrigatorie
                    disabled={isSubmitting}
                    minDate={new Date()}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--color-text)]">
                    Horário <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full rounded-lg border border-[var(--color-gray-light)] bg-[var(--color-bg)] p-3 text-[var(--color-text)] outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
                  >
                    <option value="">Selecione um horário</option>
                    {[
                      '08:00',
                      '09:00',
                      '10:00',
                      '11:00',
                      '13:00',
                      '14:00',
                      '15:00',
                      '16:00',
                      '17:00',
                      '18:00',
                      '19:00',
                      '20:00',
                    ].map((t) => {
                      const [hour] = t.split(':')
                      const nextHour = String(Number(hour) + 1).padStart(2, '0')

                      return (
                      <option key={t} value={t}>
                        {`${hour}h - ${nextHour}h`}
                      </option>
                      )
                    })}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <TextInput
                    label="Justificativa"
                    value={justification}
                    onChange={setJustification}
                    isObrigatorie
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex items-center justify-end gap-4 md:col-span-2">
                  <Button
                    variant="primary"
                    size="large"
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className="min-w-[200px]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <ButtonSpinner />
                        Reservando...
                      </span>
                    ) : (
                      'Confirmar Reserva'
                    )}
                  </Button>
                </div>
              </form>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
