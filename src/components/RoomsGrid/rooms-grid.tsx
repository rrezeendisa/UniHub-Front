import { RoomCard } from '../RoomCard/room-card'
import {
  getRoomsByBuilding,
  sortRoomsByClassName,
} from '../../utils/agendar-sala-utils'
import type { RoomReservation } from '../../types/rooms'

interface RoomsGridProps {
  rooms: RoomReservation[]
  availabilityMap: Map<string, boolean>
  onRoomSelect: (roomName: string) => void
}

export function RoomsGrid({
  rooms,
  availabilityMap,
  onRoomSelect,
}: RoomsGridProps) {
  const filteredRooms = sortRoomsByClassName(getRoomsByBuilding(rooms, 'L'))

  return (
    <div className="max-h-[480px] overflow-y-auto overflow-x-hidden pr-2 sm:max-h-[540px] lg:max-h-[620px]">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {filteredRooms.map((room) => (
          <RoomCard
            key={room.id}
            className={room.className}
            resources={room.resources}
            places={room.places}
            isAvailable={availabilityMap.get(room.className) ?? true}
            onSelect={() => onRoomSelect(room.className)}
          />
        ))}
      </div>
    </div>
  )
}
