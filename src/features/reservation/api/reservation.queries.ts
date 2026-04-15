import { useQuery } from "@tanstack/react-query"
import { getReservation } from "./reservation.service"

export function useReservation(id: string | null) {
  return useQuery({
    queryKey: ["reservation-details", id],
    queryFn: () => getReservation(id!),
    enabled: !!id,
  })
}
