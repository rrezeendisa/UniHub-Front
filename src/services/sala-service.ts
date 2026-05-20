import { api } from './api'
import type { RoomReservation } from '../types/rooms'

export interface Sala {
  idSala: number
  nome: string
  predio: string
  capacidade: number
  recursos: string
}

export const salaService = {
  getSalas: async () => {
    const response = await api.get<Sala[]>('/api/salas')
    return response.data
  },

  createSala: async (sala: Omit<Sala, 'idSala'>) => {
    const response = await api.post<Sala>('/api/salas', sala)
    return response.data
  },
}

// Adaptador para manter compatibilidade com o frontend atual se necessário
export const adaptSalaToRoomReservation = (sala: Sala): RoomReservation => {
  return {
    id: sala.idSala,
    className: sala.nome,
    building: sala.predio,
    resources: sala.recursos 
      ? sala.recursos.split(',').map(r => ({ type: r.trim(), amount: 1 }))
      : [],
    places: sala.capacidade
  }
}
