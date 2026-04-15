import { useMutation } from "@tanstack/react-query"
import { createReservation } from "./reservation.service"
import type { ReservationRequest } from "../types/reservation.types"

export function useCreateReservation() {
  return useMutation({
    mutationFn: (data: ReservationRequest) => createReservation(data),
  })
}
