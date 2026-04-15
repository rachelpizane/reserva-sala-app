import { api } from "../../../services/api"
import type {
  ReservationDetails,
  ReservationRequest,
} from "../types/reservation.types"

export async function createReservation(
  reserva: ReservationRequest
): Promise<void> {
  await api.post("/reservas", reserva)
}

export async function getReservation(id: string): Promise<ReservationDetails> {
  const response = await api.get(`/reservas/${id}`)
  return response.data
}
