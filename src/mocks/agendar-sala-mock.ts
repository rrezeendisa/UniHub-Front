// src/pages/agendar-sala/mocks/agendar-sala-mock.ts
import type { RoomReservation } from '../types/rooms'

export const roomsMock: RoomReservation[] = [
  {
    id: 1,
    className: 'L-101',
    building: 'L',
    resources: [
      { type: 'Projetor', amount: 1 },
      { type: 'Quadro branco', amount: 1 },
      { type: 'Ar-condicionado', amount: 1 },
    ],
    places: 12,
  },
  {
    id: 2,
    className: 'L-102',
    building: 'L',
    resources: [
      { type: 'TV', amount: 1 },
      { type: 'Mesa redonda', amount: 1 },
      { type: 'Tomadas', amount: 8 },
    ],
    places: 8,
  },
  {
    id: 3,
    className: 'L-103',
    building: 'L',
    resources: [
      { type: 'Projetor', amount: 1 },
      { type: 'Cadeiras móveis', amount: 12 },
      { type: 'Lousa digital', amount: 1 },
    ],
    places: 14,
  },
  {
    id: 4,
    className: 'L-104',
    building: 'L',
    resources: [
      { type: 'Computadores', amount: 10 },
      { type: 'Internet cabeada', amount: 1 },
      { type: 'Ar-condicionado', amount: 1 },
    ],
    places: 10,
  },
  {
    id: 5,
    className: 'L-105',
    building: 'L',
    resources: [
      { type: 'Projetor', amount: 1 },
      { type: 'Quadro branco', amount: 1 },
      { type: 'Câmera', amount: 1 },
    ],
    places: 16,
  },
  {
    id: 6,
    className: 'L-106',
    building: 'L',
    resources: [
      { type: 'Mesa de reunião', amount: 1 },
      { type: 'TV', amount: 1 },
      { type: 'Ar-condicionado', amount: 1 },
    ],
    places: 10,
  },
  {
    id: 7,
    className: 'L-107',
    building: 'L',
    resources: [
      { type: 'Projetor', amount: 1 },
      { type: 'Ponto de energia', amount: 12 },
      { type: 'Cadeiras ergonômicas', amount: 12 },
    ],
    places: 12,
  },
  {
    id: 8,
    className: 'L-108',
    building: 'L',
    resources: [
      { type: 'Lousa branca', amount: 1 },
      { type: 'TV', amount: 1 },
      { type: 'Wi-Fi dedicado', amount: 1 },
    ],
    places: 8,
  },
  {
    id: 9,
    className: 'L-109',
    building: 'L',
    resources: [
      { type: 'Projetor', amount: 1 },
      { type: 'Mesa colaborativa', amount: 1 },
      { type: 'Ar-condicionado', amount: 1 },
    ],
    places: 18,
  },
  {
    id: 10,
    className: 'L-110',
    building: 'L',
    resources: [
      { type: 'Notebook compartilhado', amount: 6 },
      { type: 'Quadro branco', amount: 1 },
      { type: 'Tomadas', amount: 10 },
    ],
    places: 10,
  },
  {
    id: 11,
    className: 'L-111',
    building: 'L',
    resources: [
      { type: 'Projetor', amount: 1 },
      { type: 'Mesa em U', amount: 1 },
      { type: 'Ar-condicionado', amount: 1 },
    ],
    places: 20,
  },
  {
    id: 12,
    className: 'L-112',
    building: 'L',
    resources: [
      { type: 'TV', amount: 1 },
      { type: 'Cadeiras móveis', amount: 14 },
      { type: 'Internet cabeada', amount: 1 },
    ],
    places: 14,
  },
]
