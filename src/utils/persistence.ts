import type { MeusAgendamentosReservation } from '../types/schedule'
import { meusAgendamentosMock } from '../mocks/meus-agendamentos-mock'

const STORAGE_KEY = 'meus_agendamentos_v1'
const CANCELED_MOCKS_KEY = 'meus_agendamentos_canceled_mocks'

const safeParse = (raw: string | null) => {
  if (!raw) return [] as MeusAgendamentosReservation[]
  try {
    return JSON.parse(raw) as MeusAgendamentosReservation[]
  } catch {
    return [] as MeusAgendamentosReservation[]
  }
}

const safeParseIds = (raw: string | null) => {
  if (!raw) return [] as number[]
  try {
    return JSON.parse(raw) as number[]
  } catch {
    return [] as number[]
  }
}

export const loadPersistedReservations = (): MeusAgendamentosReservation[] =>
  safeParse(localStorage.getItem(STORAGE_KEY))

export const savePersistedReservations = (
  items: MeusAgendamentosReservation[]
) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export const loadCanceledMockIds = (): number[] =>
  safeParseIds(localStorage.getItem(CANCELED_MOCKS_KEY))

export const saveCanceledMockIds = (ids: number[]) => {
  localStorage.setItem(CANCELED_MOCKS_KEY, JSON.stringify(ids))
}

export const addCanceledMockId = (id: number) => {
  const canceled = loadCanceledMockIds()
  if (!canceled.includes(id)) {
    canceled.push(id)
    saveCanceledMockIds(canceled)
  }
}

export const addReservation = (
  reservation: Omit<MeusAgendamentosReservation, 'id'>
): MeusAgendamentosReservation => {
  const current = loadPersistedReservations()
  const id = Date.now()
  const item: MeusAgendamentosReservation = { id, ...reservation }
  current.push(item)
  savePersistedReservations(current)
  try {
    window.dispatchEvent(new Event('meus-agendamentos:changed'))
  } catch (e) {}
  return item
}

export const clearPersistedReservations = () =>
  localStorage.removeItem(STORAGE_KEY)

export const getAllReservations = (): MeusAgendamentosReservation[] => {
  const canceled = loadCanceledMockIds()
  const filteredMocks = meusAgendamentosMock.filter(
    (m) => !canceled.includes(m.id)
  )
  const persisted = loadPersistedReservations()
  return [...filteredMocks, ...persisted]
}
