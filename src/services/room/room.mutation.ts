import { useMutation } from "@tanstack/react-query"
import type { RoomSchema } from "@/pages/types/room.schema"
import { createRoom } from "./room.service"

export function useCreateRoom() {
  return useMutation({
    mutationFn: (data: RoomSchema) => createRoom(data),
  })
}
