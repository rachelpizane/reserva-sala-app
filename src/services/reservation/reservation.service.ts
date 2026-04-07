import type { ReservationRequest } from "@/types/reservation.types"
import { api } from "../api"

export async function createReservation(
  reserva: ReservationRequest
): Promise<void> {
  await api.post("/reservas", reserva)
}
