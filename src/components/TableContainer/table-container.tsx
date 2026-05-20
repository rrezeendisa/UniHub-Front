import { TableSection } from '../TableSection/table-section'
import { getAvailableTablesBySide } from '../../utils/agendar-mesa-utils'
import type { TableReservation } from '../../types/table'

interface TableContainerProps {
  tables: TableReservation[]
  onTableSelect: (table: TableReservation) => void
}

export function TableContainer({ tables, onTableSelect }: TableContainerProps) {
  const leftTables = getAvailableTablesBySide(tables, 'left')
  const rightTables = getAvailableTablesBySide(tables, 'right')

  return (
    <div className="overflow-x-hidden rounded-2xl border border-[var(--color-gray-light)] bg-[var(--color-surface)] p-3 shadow-sm sm:p-4">
      <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_8rem_minmax(0,1fr)] lg:items-start xl:grid-cols-[minmax(0,1fr)_9rem_minmax(0,1fr)]">
        <TableSection
          side="left"
          tables={leftTables}
          onSelect={onTableSelect}
        />

        <div className="flex min-h-[64px] items-center justify-center self-center rounded-2xl border border-dashed border-[var(--color-gray-light)] bg-[var(--color-bg)] px-3 py-3 lg:min-h-[110px]">
          <span className="text-sm font-medium text-[var(--color-text-muted)] sm:text-base">
            Recepção
          </span>
        </div>

        <TableSection
          side="right"
          tables={rightTables}
          onSelect={onTableSelect}
        />
      </div>
    </div>
  )
}
