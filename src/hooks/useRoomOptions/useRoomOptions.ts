import { useRooms } from "@/services/room/room.queries"
import type { Option } from "@/types/option.types"
import { truncate } from "@/utils/text/text.utils"

interface RoomOptions {
  options: Option[]
  isLoading: boolean
}

export function useRoomOptions(): RoomOptions {
  const { data, isLoading } = useRooms()

  const options: Option[] =
    data?.map((sala) => ({
      value: String(sala.id),
      label: `${truncate(sala.nome, 30)} (${sala.capacidade} pessoas)`,
    })) ?? []

  return {
    options,
    isLoading,
  }
}
