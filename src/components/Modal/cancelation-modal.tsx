import { Modal } from './modal'
import { Button } from '../Button/button'
import { ButtonSpinner } from '../ButtonSpinner/button-spinner'

interface CancelationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading?: boolean
}

export function CancelationModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: CancelationModalProps) {
  return (
    <Modal title="Cancelar agendamento" isOpen={isOpen} onClose={onClose}>
      <div className="mb-7 space-y-2">
        <p className="text-center font-semibold text-[var(--color-text)]">
          Tem certeza que deseja cancelar este agendamento?
        </p>
        <p className="text-center text-sm text-[var(--color-text-muted)]">
          Esta acao liberara o horario para outros usuarios.
        </p>
      </div>

      <div className="flex justify-center gap-3">
        <Button variant="outline" onClick={onClose} disabled={isLoading}>
          Nao
        </Button>
        <Button variant="primary" onClick={onConfirm} disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <ButtonSpinner />
              Cancelando...
            </span>
          ) : (
            'Sim'
          )}
        </Button>
      </div>
    </Modal>
  )
}
