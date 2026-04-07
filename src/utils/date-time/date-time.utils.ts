import { format, setHours, setMinutes, setSeconds } from "date-fns"
import { ptBR } from "date-fns/locale"

export function getDataHoje(): Date {
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)

  return hoje
}
export function horaParaMinutos(hora: string): number {
  const [h, m] = hora.split(":").map(Number)
  return h * 60 + m
}

export function combinarDataHora(data: Date, hora: string): Date {
  const [h, m] = hora.split(":").map(Number)

  return setSeconds(setMinutes(setHours(data, h), m), 0)
}

export function formatarDataDetalhada(data: Date): string {
  return format(data, "yyyy-MM-dd'T'HH:mm:ss")
}

export function formatarDataBrasileira(data: Date): string {
  return format(data, "dd/MM/yyyy", { locale: ptBR })
}
