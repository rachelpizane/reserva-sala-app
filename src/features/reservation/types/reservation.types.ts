import type { RoomDetails } from "@/features/room/types/room.types"

export type ReservationRequest = {
  salaId: string
  inicio: string
  fim: string
  organizador: string
}

export type ReservationResponse = {
  id: string
  inicio: string
  fim: string
  organizador: string
  sala: RoomDetails
}
