import { useRooms } from "@/services/room/room.queries"
import type { Option } from "@/types/option.types"

interface RoomOptions {
  options: Option[]
  isLoading: boolean
}

export function useRoomOptions(): RoomOptions {
  const { data, isLoading } = useRooms()

  const options: Option[] =
    data?.map((sala) => ({
      value: String(sala.id),
      label: `${sala.nome} (${sala.capacidade} pessoas)`,
    })) ?? []

  return {
    options,
    isLoading,
  }
}
