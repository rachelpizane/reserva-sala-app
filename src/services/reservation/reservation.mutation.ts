import type { ReservationRequest } from "@/types/reservation.types";
import { useMutation } from "@tanstack/react-query";
import { createReservation } from "./reservation.service";

export function useCreateReservation() {
  return useMutation({
    mutationFn: (data: ReservationRequest) => createReservation(data),
  })
}
