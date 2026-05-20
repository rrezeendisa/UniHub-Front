import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ALink } from '../../components/ALink/a-link'
import { LoginForm } from '../../components/LoginForm/login-form'
import { LoadingSpinner } from '../../components/LoadingSpinner/loading-spinner'
import LogoLogin from '../../assets/logo-login.svg'

export function LoginPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingSpinner fullScreen message="Carregando..." />
  }

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <section className="flex flex-col items-center justify-center rounded-3xl border border-[var(--color-gray-light)] bg-[var(--color-surface)] px-6 py-10 text-center shadow-sm sm:px-10 sm:py-14 lg:min-h-[720px]">
          <div className="w-full max-w-[420px]">
            <img
              src={LogoLogin}
              alt="UniHub"
              className="mx-auto w-full max-w-[340px] object-contain"
            />

            <div className="mt-8 flex flex-col items-center gap-2">
              <p className="text-sm text-[var(--color-text)]">
                Não tem uma conta?
              </p>
              <ALink
                href="/cadastro"
                onClick={(event) => {
                  event.preventDefault()
                  navigate('/cadastro')
                }}
              >
                Crie agora mesmo!
              </ALink>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center rounded-3xl border border-[var(--color-gray-light)] bg-[var(--color-surface)] px-4 py-10 shadow-sm sm:px-6 lg:min-h-[720px]">
          <div className="w-full max-w-[520px]">
            <div className="mb-6 text-center lg:text-left">
              <p className="text-xs text-center font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                Entrar
              </p>
              <h2 className="mt-3 text-2xl font-bold text-center text-[var(--color-text)] sm:text-3xl">
                Faça login para continuar
              </h2>
              <p className="mt-3 text-sm leading-6 text-center text-[var(--color-text-muted)] sm:text-base">
                Use suas credenciais para acessar seu painel e gerenciar seus
                agendamentos com mais controle.
              </p>
            </div>

            <LoginForm />
          </div>
        </section>
      </div>
    </div>
  )
}
