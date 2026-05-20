import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'https://unihub-backend-4a6m.onrender.com'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para adicionar token se necessário no futuro
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
