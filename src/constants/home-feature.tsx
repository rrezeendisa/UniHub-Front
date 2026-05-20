import React from 'react'
import { DeskIcon } from '../icons/lib/desk-icon'
import { ScheduleIcon } from '../icons/lib/schedule-icon'
import { BlackboardIcon } from '../icons/lib/blackboard-icon'
import { ClipboardIcon } from '../icons/lib/clipboard-icon'

export interface Feature {
  id: string
  icon: React.ReactNode
  title: string
  description: string
}

export const HOME_FEATURES: Feature[] = [
  {
    id: 'reserve-tables',
    icon: <DeskIcon height={32} width={32} transform="" />,
    title: 'Reserve mesas',
    description:
      'Encontre mesas disponíveis na biblioteca e reserve rapidamente para estudar.',
  },
  {
    id: 'schedule-rooms',
    icon: <ScheduleIcon height={32} width={32} />,
    title: 'Agende salas',
    description:
      'Reserve salas para mentorias ou estudos em grupo com visualização clara de disponibilidade.',
  },
  {
    id: 'request-resources',
    icon: <BlackboardIcon height={32} width={32} />,
    title: 'Solicite recursos',
    description:
      'Professores podem solicitar projetores, notebooks e outros recursos para as aulas.',
  },
  {
    id: 'track-reservations',
    icon: <ClipboardIcon height={32} width={32} />,
    title: 'Acompanhe reservas',
    description:
      'Visualize seus agendamentos ativos e gerencie cancelamentos de forma simples.',
  },
]

export interface Benefit {
  id: string
  label: string
  highlight: string
  description: string
  fullWidth?: boolean
}

export const HOME_BENEFITS: Benefit[] = [
  {
    id: 'quick-reservations',
    label: 'Reservas rápidas',
    highlight: 'Menos cliques',
    description: 'Fluxo direto para agendar e acompanhar suas reservas.',
  },
  {
    id: 'real-time-availability',
    label: 'Disponibilidade',
    highlight: 'Em tempo real',
    description: 'Evite conflitos e encontre horários com mais confiança.',
  },
  {
    id: 'guided-experience',
    label: 'Experiência guiada',
    highlight: 'Interface clara e consistente',
    description:
      'Navegação previsível, feedback visual e informação organizada para reduzir erros.',
    fullWidth: true,
  },
]