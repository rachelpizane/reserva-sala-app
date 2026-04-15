import { combineDateTime, timeToMinutes } from "@/utils/date"
import { z } from "zod"

function isHoraDentroDoIntervalo(hour: string) {
  const minutes = timeToMinutes(hour)
  const min = 8 * 60
  const max = 20 * 60
  return minutes >= min && minutes <= max
}

function isFimDepoisDeInicio(inicio: string, fim: string) {
  return timeToMinutes(fim) > timeToMinutes(inicio)
}

function isInicioNoFuturo(data: Date, inicio: string) {
  const inicioDate = combineDateTime(data, inicio)
  return inicioDate >= new Date()
}

export const reservationSchema = z
  .object({
    salaId: z.uuid("A sala é obrigatória"),
    data: z.date(),
    inicio: z
      .string()
      .nonempty("O horário inicial é obrigatório")
      .refine(
        (hora) => isHoraDentroDoIntervalo(hora),
        "A reserva deve ser entre 08:00 e 20:00"
      ),
    fim: z
      .string()
      .nonempty("O horário final é obrigatório")
      .refine(
        (hora) => isHoraDentroDoIntervalo(hora),
        "A reserva deve ser entre 08:00 e 20:00"
      ),
    organizador: z.string().nonempty("O organizador é obrigatório"),
  })
  .refine((data) => isFimDepoisDeInicio(data.inicio, data.fim), {
    message: "O horário final deve ser após o horário inicial",
    path: ["fim"],
  })
  .refine((data) => isInicioNoFuturo(data.data, data.inicio), {
    message: "O horário inicial não pode ser no passado",
    path: ["inicio"],
  })

export type ReservationSchema = z.infer<typeof reservationSchema>

export const defaultValues: ReservationSchema = {
  salaId: "",
  data: new Date(),
  inicio: "",
  fim: "",
  organizador: "",
}
