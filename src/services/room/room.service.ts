import type { RoomSchema } from "@/types/room.schema"
import { api } from "../api"
import type { SummaryRoom } from "@/types/room.types"

export async function createRoom(sala: RoomSchema): Promise<void> {
  await api.post("/salas", sala)
}

export async function getSummaryRooms(): Promise<SummaryRoom[]> {
  const response = await api.get("/salas");
  return response.data;
}
