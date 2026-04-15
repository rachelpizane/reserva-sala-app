import type { RoomSchema } from "@/features/room/schemas/room.schema"
import { api } from "../../../services/api"
import type { RoomSummary } from "../types/room.types"

export async function createRoom(sala: RoomSchema): Promise<void> {
  await api.post("/salas", sala)
}

export async function getSummaryRooms(): Promise<RoomSummary[]> {
  const response = await api.get("/salas")
  return response.data
}
