export interface Room {
  idSala: number
  nome: string
  predio: string
  capacidade: number
  recursos: string
}

export interface RoomResource {
  type: string
  amount: number
}

export interface RoomReservation {
  id: number
  className: string
  building: string
  resources: RoomResource[]
  places: number
}

export interface CreateRoomRequest {
  nome: string
  predio: string
  capacidade: number
  recursos: string
}

export type CreateRoomResponse = Room

export type ListRoomsResponse = Room[]
