import type {
  ReservaDetalhes,
  ReservationRequest,
} from "@/types/reservation.types"
import { api } from "../api"

export async function createReservation(
  reserva: ReservationRequest
): Promise<void> {
  await api.post("/reservas", reserva)
}

export async function getReserva(id: string): Promise<ReservaDetalhes> {
  const response = await api.get(`/reservas/${id}`)
  return response.data
}
