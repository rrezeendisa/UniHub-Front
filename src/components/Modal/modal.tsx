import { type MouseEvent, type ReactNode, useEffect } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'

interface ModalProps {
  title: ReactNode
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function Modal({ title, isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4 md:p-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative flex w-full max-w-[calc(100vw-1.5rem)] flex-col rounded-xl border border-[var(--color-gray-light)] bg-[var(--color-surface)] shadow-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[calc(100vh-1.5rem)] sm:max-h-[calc(100vh-2rem)] md:max-h-[calc(100vh-3rem)]"
        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute right-3 top-3 rounded-full p-1.5 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)] sm:right-4 sm:top-4"
        >
          <Cross2Icon className="h-5 w-5" />
        </button>

        <h2
          id="modal-title"
          className="shrink-0 px-4 pt-6 text-center text-lg font-bold leading-tight text-[var(--color-primary)] sm:px-6 sm:text-xl"
        >
          {title}
        </h2>

        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 pb-5 pt-5 sm:px-6 sm:pb-6">
          {children}
        </div>
      </div>
    </div>
  )
}
