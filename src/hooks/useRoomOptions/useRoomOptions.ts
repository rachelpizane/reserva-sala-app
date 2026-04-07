import { useRooms } from "@/services/room/room.queries"

interface RoomOptions {
  options: {
    value: string
    label: string
  }[]
  isLoading: boolean
}

export function useRoomOptions(): RoomOptions {
  const { data, isLoading } = useRooms()

  const options =
    data?.map((sala) => ({
      value: String(sala.id),
      label: `${sala.nome} (${sala.capacidade} pessoas)`,
    })) ?? []

  return {
    options,
    isLoading,
  }
}
