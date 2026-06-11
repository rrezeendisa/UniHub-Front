import { useState, useEffect } from 'react'
import { MenuCard } from '../../components/Menu/menu-card'
import { Toast } from '../../components/Toast/toast'
import { Button } from '../../components/Button/button'
import { LoadingSpinner } from '../../components/LoadingSpinner/loading-spinner'
import { ButtonSpinner } from '../../components/ButtonSpinner/button-spinner'
import { openFeedbackForm } from '../../utils/forms-redirect-utils'
import { salaService } from '../../services/sala-service'
import type { Sala } from '../../services/sala-service'
import { chaveVirtualService } from '../../services/chave-virtual-service'
import { InfoCard, InfoCardHeader, InfoCardContent, InfoCardItem } from '../../components/InfoCard/info-card'
import { PersonIcon } from '@radix-ui/react-icons'

export function ChaveVirtualPage() {
  const [salas, setSalas] = useState<Sala[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [destravandoId, setDestravandoId] = useState<number | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [user, setUser] = useState<{ idUsuario: number; tipoUsuario: string } | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }

    const fetchSalas = async () => {
      try {
        const data = await salaService.getSalas()
        setSalas(data)
      } catch (error) {
        console.error('Erro ao carregar salas:', error)
        setToast({ message: 'Erro ao carregar salas.', type: 'error' })
      } finally {
        setIsLoading(false)
      }
    }

    fetchSalas()
  }, [])

  const handleDestravar = async (idSala: number) => {
    if (!user) return

    setDestravandoId(idSala)
    try {
      const response = await chaveVirtualService.destravarSala({
        idUsuario: user.idUsuario,
        idSala: idSala,
      })
      setToast({ message: response.mensagem || 'Sala destravada com sucesso.', type: 'success' })
    } catch (error: any) {
      console.error('Erro ao destravar sala:', error)
      const errorMsg = error.response?.data?.mensagem || error.response?.data?.message || 'Erro ao destravar sala.'
      setToast({ message: errorMsg, type: 'error' })
    } finally {
      setDestravandoId(null)
    }
  }

  const isProfessor = user?.tipoUsuario === 'PROFESSOR'

  if (isLoading) {
    return <LoadingSpinner fullScreen message="Carregando..." />
  }

  return (
    <div className="min-h-screen overflow-x-hidden px-4 py-4 sm:px-5 sm:py-5 lg:px-6">
      {toast && (
        <Toast type={toast.type} onClose={() => setToast(null)}>
          {toast.message}
        </Toast>
      )}

      <div className="mx-auto flex w-full max-w-[92rem] flex-col items-stretch gap-5 lg:flex-row lg:gap-5">
        <aside className="flex w-full flex-shrink-0 flex-col gap-3 lg:w-72 lg:min-w-[18rem] lg:self-stretch">
          <Button
            variant="primary"
            size="medium"
            onClick={openFeedbackForm}
            className="w-full"
          >
            Dê o seu feedback
          </Button>
          <MenuCard className="lg:min-h-[520px] lg:flex-1" />
        </aside>

        <main className="min-w-0 flex-1">
          <section className="overflow-hidden rounded-3xl border border-[var(--color-gray-light)] bg-[var(--color-surface)] p-5 shadow-sm sm:p-6 lg:p-6">
            <div className="mx-auto max-w-3xl text-center mb-8">
              <div className="mb-3">
                <span className="inline-block rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">
                  Chave Virtual
                </span>
              </div>
              <h1 className="text-xl! font-bold leading-tight text-[var(--color-text)] sm:text-3xl lg:text-4xl">
                Controle de Acesso às Salas
              </h1>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-muted)] sm:text-base">
                Selecione uma sala para realizar o destravamento remoto.
              </p>
            </div>

            {!isProfessor ? (
              <div className="rounded-2xl border border-[var(--color-warning)] bg-[var(--color-warning)]/5 p-6 text-center">
                <p className="font-medium text-[var(--color-warning)]">
                  Funcionalidade disponível apenas para professores.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {salas.map((sala) => (
                  <InfoCard key={sala.idSala} className="flex flex-col justify-between">
                    <div>
                      <InfoCardHeader badge={sala.nome} className="mb-4" />
                      <InfoCardContent className="mb-6 space-y-3">
                        <InfoCardItem 
                          label="Prédio" 
                          value={sala.predio} 
                        />
                        <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                          <PersonIcon className="h-4 w-4 shrink-0" />
                          <p className="text-sm">
                            <span className="font-semibold text-[var(--color-text)]">Capacidade</span>: {sala.capacidade} lugares
                          </p>
                        </div>
                      </InfoCardContent>
                    </div>
                    <Button
                      variant="primary"
                      className="w-full mt-4"
                      onClick={() => handleDestravar(sala.idSala)}
                      disabled={destravandoId === sala.idSala}
                    >
                      {destravandoId === sala.idSala ? <ButtonSpinner /> : 'Destravar sala'}
                    </Button>
                  </InfoCard>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}
