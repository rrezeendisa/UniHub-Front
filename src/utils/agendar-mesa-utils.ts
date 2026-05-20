import type { TableReservation } from "../types/table"

export const getAvailableTablesBySide = (
  tables: TableReservation[],
  side: 'left' | 'right'
): TableReservation[] => {
  return tables
    .filter((table) => table.side === side)
    .sort((a, b) => {
      if (a.isAvailable !== b.isAvailable) {
        return a.isAvailable ? -1 : 1
      }
      return a.id - b.id
    })
}

export const getFirstAvailableTableBySide = (
  tables: TableReservation[],
  side: 'left' | 'right'
): TableReservation | undefined => {
  return tables.find((table) => table.side === side && table.isAvailable)
}

export const getTableDisplayNumber = (
  tables: TableReservation[],
  side: 'left' | 'right',
  index: number
): number => {
  const sideTables = getAvailableTablesBySide(tables, side)
  const part = sideTables[index]?.name.split(' ')[1]
  const parsed = part !== undefined ? Number(part) : NaN
  return Number.isFinite(parsed) ? parsed : index + 1
}
