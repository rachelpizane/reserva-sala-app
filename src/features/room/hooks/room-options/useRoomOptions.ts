import type { Option } from "@/types/types"
import { truncate } from "@/utils/text"
import { useRooms } from "../../api/room.queries"

interface UseRoomOptionsResult {
  options: Option[]
  isLoading: boolean
}

export function useRoomOptions(): UseRoomOptionsResult {
  const { data, isLoading } = useRooms()

  const options: Option[] =
    data?.map((room) => ({
      value: String(room.id),
      label: `${truncate(room.nome, 30)} (${room.capacidade} pessoas)`,
    })) ?? []

  return {
    options,
    isLoading,
  }
}
