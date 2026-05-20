import { api } from './api'

export interface Mesa {
  idMesa: number
  nome: string
  lado: string
  disponivel: boolean
}

export const mesaService = {
  getMesas: async () => {
    const response = await api.get<Mesa[]>('/api/mesas')
    return response.data
  },

  createMesa: async (mesa: Omit<Mesa, 'idMesa'>) => {
    const response = await api.post<Mesa>('/api/mesas', mesa)
    return response.data
  }
}
