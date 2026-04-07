import type { ReservationSchema } from "@/types/reservation.schema"
import type { ReservationRequest } from "@/types/reservation.types"
import {
  combinarDataHora,
  formatarDataDetalhada,
} from "@/utils/date-time/date-time.utils"

export function mapToReservationRequest(
  data: ReservationSchema
): ReservationRequest {
  const inicio = combinarDataHora(data.data, data.inicio)
  const fim = combinarDataHora(data.data, data.fim)

  return {
    salaId: data.salaId,
    inicio: formatarDataDetalhada(inicio),
    fim: formatarDataDetalhada(fim),
    organizador: data.organizador,
  }
}
