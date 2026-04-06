import { useMutation } from "@tanstack/react-query"
import { createRoom } from "./room.service"
import type { RoomSchema } from "@/types/room.schema"

export function useCreateRoom() {
  return useMutation({
    mutationFn: (data: RoomSchema) => createRoom(data),
  })
}
