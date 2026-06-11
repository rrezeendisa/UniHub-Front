import { api } from './api'

export interface DestravarSalaRequest {
  idUsuario: number
  idSala: number
}

export interface DestravarSalaResponse {
  status: string
  mensagem: string
  idSala: number
}

export const chaveVirtualService = {
  destravarSala: async (data: DestravarSalaRequest) => {
    const response = await api.post<DestravarSalaResponse>('/api/chave-virtual/destravar', data)
    return response.data
  },
  
  // Reutilizando getSalas do salaService se necessário, 
  // mas o requisito diz para usar GET /api/salas que já está lá
}
