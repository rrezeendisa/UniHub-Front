import type { TableReservation } from '../../types/table'

interface TableSectionProps {
  side: 'left' | 'right'
  tables: TableReservation[]
  onSelect: (table: TableReservation) => void
}

export function TableSection({
  side,
  tables,
  onSelect,
}: TableSectionProps) {
  const sideLabel = side === 'left' ? 'esquerda' : 'direita'

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <h3 className="text-center text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
        Mesas {sideLabel}
      </h3>
      <div className="max-h-[400px] overflow-y-auto overflow-x-hidden pr-2 sm:max-h-[480px] lg:max-h-[610px]">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {tables.map((table) => (
            <button
              key={table.id}
              type="button"
              onClick={() => onSelect(table)}
              disabled={!table.isAvailable}
              className={[
                'group flex flex-col items-center justify-center rounded-xl border-2 border-transparent',
                'bg-[var(--color-hover-menu)]/60 p-4 transition-all duration-200',
                'hover:-translate-y-0.5 hover:border-[var(--color-hover-menu)] hover:bg-opacity-70 hover:shadow-md',
                'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2',
                table.isAvailable ? 'cursor-pointer' : 'cursor-not-allowed opacity-70',
              ].join(' ')}
              aria-label={`Selecionar ${table.name}`}
            >
              <span className="text-sm font-bold text-[var(--color-text)]">
                {table.name}
              </span>
              <span className="text-xs text-[var(--color-text-muted)]">
                {table.isAvailable ? 'Disponivel' : 'Ocupada'}
              </span>
            </button>
          ))}
          {tables.length === 0 && (
            <div className="flex h-20 items-center justify-center rounded-xl border border-dashed border-[var(--color-gray-light)] bg-[var(--color-bg)] px-4 py-3">
              <span className="text-xs text-[var(--color-text-muted)]">
                Nenhuma mesa
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
