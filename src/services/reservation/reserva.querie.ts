import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import { getReserva } from "./reservation.service"
import type { ReservaDetalhes } from "@/types/reservation.types"

export function useReserva(
  id: string | null
): UseQueryResult<ReservaDetalhes, Error> {
  return useQuery<ReservaDetalhes, Error>({
    queryKey: ["reserva-detalhes", id],
    queryFn: () => getReserva(id!),
    enabled: !!id,
  })
}
