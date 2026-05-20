import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  validateCadastroForm,
  type CadastroFormErrors,
} from '../utils/cadastro-validation'

import { authService } from '../services/auth-service'

export function useCadastroForm() {
  const navigate = useNavigate()
  const [role, setRole] = useState<'aluno' | 'professor'>('aluno')
  const [nome, setNome] = useState('')
  const [ra, setRa] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<CadastroFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors])

  const updateField = (
    field: 'nome' | 'ra' | 'email' | 'password' | 'confirmPassword',
    value: string
  ) => {
    if (field === 'nome') setNome(value)
    if (field === 'ra') setRa(value)
    if (field === 'email') setEmail(value)
    if (field === 'password') setPassword(value)
    if (field === 'confirmPassword') setConfirmPassword(value)

    if (apiError) setApiError(null)

    if (hasErrors) {
      setErrors((current) => {
        const next = { ...current }
        delete next[field]
        return next
      })
    }
  }

  const submit = async () => {
    setApiError(null)
    const nextErrors = validateCadastroForm({
      nome,
      role,
      ra,
      email,
      password,
      confirmPassword,
    })

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return false
    }

    setIsSubmitting(true)
    try {
      await authService.register({
        nome,
        ra,
        email,
        senha: password,
        tipoUsuario: role.toUpperCase() as 'ALUNO' | 'PROFESSOR'
      })
      setErrors({})
      navigate('/login')
      return true
    } catch (error: any) {
      console.error('Erro no cadastro:', error)
      setApiError(error.response?.data?.message || 'Erro ao realizar cadastro. Tente novamente.')
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    role,
    setRole,
    nome,
    ra,
    email,
    password,
    confirmPassword,
    errors,
    isSubmitting,
    apiError,
    updateField,
    submit,
    clearErrors: () => {
      setErrors({})
      setApiError(null)
    },
  }
}
