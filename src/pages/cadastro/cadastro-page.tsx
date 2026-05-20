import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ALink } from '../../components/ALink/a-link'
import { LoadingSpinner } from '../../components/LoadingSpinner/loading-spinner'
import { CadastroForm } from '../../components/CadastroForm/cadastro-form'
import LogoLogin from '../../assets/logo-login.svg'

export function CadastroPage() {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
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
                Já tem uma conta?
              </p>
              <ALink
                href="/login"
                onClick={(event) => {
                  event.preventDefault()
                  navigate('/login')
                }}
              >
                Entrar!
              </ALink>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center rounded-3xl border border-[var(--color-gray-light)] bg-[var(--color-surface)] px-4 py-10 shadow-sm sm:px-6 lg:min-h-[720px]">
          <div className="w-full max-w-[520px]">
            <div className="mb-6 text-center lg:text-left">
              <p className="text-xs text-center font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                Cadastro
              </p>
              <h2 className="mt-3 text-2xl font-bold text-center text-[var(--color-text)] sm:text-3xl">
                Faça seu cadastro
              </h2>
              <p className="mt-3 text-sm leading-6 text-center text-[var(--color-text-muted)] sm:text-base">
                Crie sua conta para começar a agendar salas, mesas e recursos
                da sua faculdade de forma organizada.
              </p>
            </div>

            <CadastroForm />
          </div>
        </section>
      </div>
    </div>
  )
}
