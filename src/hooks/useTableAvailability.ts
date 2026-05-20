import { useState, useEffect, useCallback } from 'react'
import type { TableReservation } from '../types/table'
import { mesaService } from '../services/mesa-service'

export function useTableAvailability() {
  const [tables, setTables] = useState<TableReservation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchTables = useCallback(async () => {
    setIsLoading(true)
    try {
      const mesas = await mesaService.getMesas()
      const formattedTables: TableReservation[] = mesas.map(m => ({
        id: m.idMesa,
        name: m.nome,
        side: (m.lado === 'esquerda' ? 'left' : 'right') as 'left' | 'right',
        isAvailable: m.disponivel
      }))
      setTables(formattedTables)
    } catch (error) {
      console.error('Erro ao buscar mesas:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTables()
  }, [fetchTables])

  useEffect(() => {
    const handler = () => {
      fetchTables()
    }

    window.addEventListener('meus-agendamentos:changed', handler)

    return () => {
      window.removeEventListener('meus-agendamentos:changed', handler)
    }
  }, [fetchTables])

  return {
    tables,
    isLoading,
    refreshTables: fetchTables,
  }
}
