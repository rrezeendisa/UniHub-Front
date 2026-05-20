import { Badge } from '../Badge/badge'

export function RoomPageHeader() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mb-3">
        <Badge>Reserva de sala</Badge>
      </div>

      <h1 className="text-xl! font-bold leading-tight text-[var(--color-text)] sm:text-3xl lg:text-4xl">
        Reserve uma sala para aulas, estudos, reunioes ou mentorias.
      </h1>

      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-muted)] sm:text-base">
        Sistema de reservas integrado para organizacao inteligente dos espacos
        academicos.
      </p>
    </div>
  )
}
