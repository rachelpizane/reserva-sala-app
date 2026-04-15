import type { ReservationSchema } from "@/features/reservation/schemas/reservation.schema"
import { combineDateTime, formatDetailedDate } from "@/utils/date"
import type { ReservationRequest } from "../types/reservation.types"

export function mapToReservationRequest(
  data: ReservationSchema
): ReservationRequest {
  const inicio = combineDateTime(data.data, data.inicio)
  const fim = combineDateTime(data.data, data.fim)

  return {
    salaId: data.salaId,
    inicio: formatDetailedDate(inicio),
    fim: formatDetailedDate(fim),
    organizador: data.organizador,
  }
}
