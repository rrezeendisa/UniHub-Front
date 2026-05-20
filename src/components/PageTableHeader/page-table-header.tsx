import { Badge } from '../Badge/badge'

export function PageTableHeader() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mb-3">
        <Badge>Agendar mesa</Badge>
      </div>

      <h1 className="text-xl! font-bold leading-tight text-[var(--color-text)] sm:text-3xl lg:text-4xl">
        Reserve sua mesa de estudo e organize seu tempo.
      </h1>

      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-muted)] sm:text-base">
        Gerencie suas reservas de estudo de forma rapida, pratica e
        organizada.
      </p>
    </div>
  )
}
