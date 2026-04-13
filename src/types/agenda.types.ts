export type AgendaReserva = {
  id: string
  horaInicio: string
  horaFim: string
  nomeSala: string
}

export type AgendaDiaria = {
  data: string
  reservas: AgendaReserva[]
}

export type AgendaSemanal = {
  dataInicioSemana: string
  dataFinalSemana: string
  dataProximaSemana: string
  dataAnteriorSemana: string
  temProxima: boolean
  temAnterior: boolean
  agendasDiarias: AgendaDiaria[]
}
