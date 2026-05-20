import { api } from './api'

export interface Agendamento {
  idAgendamento: number
  idUsuario: number
  idSala?: number
  idMesa?: number
  nomeUsuario?: string
  local?: string
  tipo: 'SALA' | 'MESA'
  data: string
  horario: string
  justificativa: string
  status: 'PENDENTE' | 'CONFIRMADO' | 'CANCELADO' | 'CONCLUIDO'
}

export interface CreateAgendamentoRequest {
  idUsuario: number
  idSala?: number
  idMesa?: number
  tipo: 'SALA' | 'MESA'
  data: string
  horario: string
  justificativa: string
}

export const agendamentoService = {
  getAgendamentos: async () => {
    const response = await api.get<Agendamento[]>('/api/agendamentos')
    return response.data
  },

  getAgendamentosByUser: async (userId: number) => {
    const response = await api.get<Agendamento[]>(`/api/agendamentos/usuario/${userId}`)
    return response.data
  },

  createAgendamento: async (data: CreateAgendamentoRequest) => {
    const response = await api.post<Agendamento>('/api/agendamentos', data)
    return response.data
  },

  cancelarAgendamento: async (id: number) => {
    const response = await api.patch<Agendamento>(`/api/agendamentos/${id}/cancelar`)
    return response.data
  }
}
