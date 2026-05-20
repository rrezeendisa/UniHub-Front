import { api } from './api'

export interface LoginRequest {
  identifier: string
  senha: string
}

export interface RegisterRequest {
  nome: string
  ra: string
  email: string
  senha: string
  tipoUsuario: 'ALUNO' | 'PROFESSOR'
}

export interface AuthResponse {
  idUsuario: number
  nome: string
  ra: string
  email: string
  tipoUsuario: string
  token?: string
}

export const authService = {
  login: async (data: LoginRequest) => {
    const response = await api.post<AuthResponse>('/api/auth/login', data)
    console.log('[DEBUG] Resposta do login:', response.data)

    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
    }

    const user = {
      idUsuario: response.data.idUsuario,
      nome: response.data.nome,
      ra: response.data.ra,
      email: response.data.email,
      tipoUsuario: response.data.tipoUsuario,
    }

    localStorage.setItem('user', JSON.stringify(user))
    console.log('user salvo', user)

    return response.data
  },

  register: async (data: RegisterRequest) => {
    const response = await api.post<AuthResponse>('/api/auth/cadastro', data)
    return response.data
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    // Limpeza de chaves antigas
    localStorage.removeItem('@UniHub:token')
    localStorage.removeItem('@UniHub:user')
    localStorage.removeItem('authUser')
    localStorage.removeItem('usuario')
    localStorage.removeItem('userData')
    localStorage.removeItem('currentUser')
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('user') || !!localStorage.getItem('token')
  }
}
