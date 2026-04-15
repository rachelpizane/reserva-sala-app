export type ScheduleReservation = {
  id: string
  horaInicio: string
  horaFim: string
  nomeSala: string
}

export type DailySchedule = {
  data: string
  reservas: ScheduleReservation[]
}

export type WeeklySchedule = {
  dataInicioSemana: string
  dataFinalSemana: string
  dataProximaSemana: string
  dataAnteriorSemana: string
  temProxima: boolean
  temAnterior: boolean
  agendasDiarias: DailySchedule[]
}
