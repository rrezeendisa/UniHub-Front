export interface Table {
  idMesa: number
  nome: string
  lado: string
  disponivel: boolean
}

export interface TableReservation {
  id: number
  name: string
  side: 'left' | 'right'
  isAvailable: boolean
}

export interface CreateTableRequest {
  nome: string
  lado: string
  disponivel: boolean
  recursos: string
}

export type CreateTableResponse = Table

export type ListTablesResponse = Table[]
