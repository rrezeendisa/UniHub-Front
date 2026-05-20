import { Button } from '../Button/button'
import { Badge } from '../Badge/badge'
import {
  BenefitsShowcase,
  type Benefit,
} from '../BenefitsShowcase/benefits-showcase'

interface HeroSectionProps {
  onStartClick: () => void
  benefits: Benefit[]
}

export function HeroSection({ onStartClick, benefits }: HeroSectionProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-[var(--color-gray-light)] bg-[var(--color-surface)] shadow-sm">
      <div className="grid items-center gap-10 px-6 py-10 md:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-12 lg:py-14">
        <div className="flex flex-col gap-6 text-center lg:text-left">
          <div className="mx-auto max-w-xl lg:mx-0">
            <Badge>UniHub</Badge>
          </div>

          <div className="space-y-4">
            <h1 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-[var(--color-text)] sm:text-4xl lg:mx-0 lg:text-5xl">
              Gerencie salas e espaços da sua faculdade com facilidade e
              organização.
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg lg:mx-0">
              Centralize reservas e agendamentos em uma experiência
              simples, rápida e clara para o dia a dia.
            </p>
          </div>

          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row lg:justify-start">
            <Button variant="primary" size="large" onClick={onStartClick}>
              Começar agora
            </Button>
          </div>
        </div>

        <BenefitsShowcase benefits={benefits} />
      </div>
    </section>
  )
}
