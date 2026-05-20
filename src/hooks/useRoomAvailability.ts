import { useState, useEffect, useCallback } from 'react'
import type { RoomReservation } from '../types/rooms'
import { salaService, adaptSalaToRoomReservation } from '../services/sala-service'

interface ComputedRoom {
  room: RoomReservation
  isAvailable: boolean
}

export function useRoomAvailability() {
  const [computedRooms, setComputedRooms] = useState<ComputedRoom[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const computeRoomsWithPersistence = useCallback(async () => {
    setIsLoading(true)
    try {
      const salas = await salaService.getSalas()
      const rooms = salas.map(adaptSalaToRoomReservation)

      const computed = rooms.map((room) => ({
        room,
        isAvailable: true, // Por enquanto todas as salas da API são consideradas disponíveis na listagem
      }))
      
      setComputedRooms(computed)
    } catch (error) {
      console.error('Erro ao buscar salas:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    computeRoomsWithPersistence()
  }, [computeRoomsWithPersistence])

  useEffect(() => {
    const handler = () => computeRoomsWithPersistence()
    window.addEventListener('meus-agendamentos:changed', handler)

    return () => {
      window.removeEventListener('meus-agendamentos:changed', handler)
    }
  }, [computeRoomsWithPersistence])

  const getAvailabilityMap = (): Map<string, boolean> => {
    const map = new Map<string, boolean>()
    computedRooms.forEach(({ room, isAvailable }) => {
      map.set(room.className, isAvailable)
    })
    return map
  }

  return {
    computedRooms,
    isLoading,
    refreshRooms: computeRoomsWithPersistence,
    getAvailabilityMap,
  }
}
