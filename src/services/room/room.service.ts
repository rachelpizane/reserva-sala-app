import type { RoomSchema } from "@/pages/types/room.schema"
import { api } from "../api"

export async function createRoom(sala: RoomSchema): Promise<void> {
  await api.post("/salas", sala)
}
