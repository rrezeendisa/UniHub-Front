import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextInput } from '../Input/text-input'
import { PasswordInput } from '../Input/password-input'
import { Button } from '../Button/button'
import { ButtonSpinner } from '../ButtonSpinner/button-spinner'
import {
  validateLoginForm,
  type LoginFormErrors,
} from '../../utils/login-validation'

import { authService } from '../../services/auth-service'

export function LoginForm() {
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<LoginFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const handleSubmit = async (event?: React.FormEvent) => {
    event?.preventDefault()
    setApiError(null)

    const nextErrors = validateLoginForm({ identifier, password })

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setIsSubmitting(true)

    try {
      await authService.login({ identifier, senha: password })
      setErrors({})
      navigate('/agendar-mesa')
    } catch (error: any) {
      console.error('Erro no login:', error)
      setApiError(error.response?.data?.message || 'Erro ao realizar login. Verifique suas credenciais.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleIdentifierChange = (value: string) => {
    setIdentifier(value)

    if (errors.identifier) {
      setErrors((current) => {
        const next = { ...current }
        delete next.identifier
        return next
      })
    }
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)

    if (errors.password) {
      setErrors((current) => {
        const next = { ...current }
        delete next.password
        return next
      })
    }
  }

  return (
    <section className="w-full rounded-2xl border border-[var(--color-gray-light)] bg-[var(--color-surface)] px-4 py-6 shadow-sm sm:px-6 sm:py-8 lg:px-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8">
        {apiError && (
          <p className="text-sm font-medium text-[var(--color-error)] text-center">
            {apiError}
          </p>
        )}
        <div className="flex flex-col gap-2">
          <TextInput
            label="RA ou E-mail"
            value={identifier}
            onChange={handleIdentifierChange}
            isObrigatorie
            disabled={isSubmitting}
          />
          {errors.identifier && (
            <p
              className="text-sm font-medium text-[var(--color-error)]"
              role="alert"
            >
              {errors.identifier}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <PasswordInput
            label="Senha"
            value={password}
            onChange={handlePasswordChange}
            disabled={isSubmitting}
          />
          {errors.password && (
            <p
              className="text-sm font-medium text-[var(--color-error)]"
              role="alert"
            >
              {errors.password}
            </p>
          )}
        </div>

        <Button
          variant="primary"
          size="large"
          type="submit"
          disabled={isSubmitting}
          className="min-w-[120px]"
        >
          {isSubmitting ? <ButtonSpinner /> : 'Entrar'}
        </Button>
      </form>
    </section>
  )
}
