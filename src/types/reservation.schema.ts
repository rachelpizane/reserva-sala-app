import { z } from "zod"

export const reservationSchema = z.object({
  salaId: z.uuid(),
  data: z.date().optional(),
  inicio: z.string(),
  fim: z.string(),
  organizador: z.string(),
})

export type ReservationSchema = z.infer<typeof reservationSchema>

export const defaultValues: ReservationSchema = {
  salaId: "",
  data: undefined,
  inicio: "",
  fim: "",
  organizador: "",
}
