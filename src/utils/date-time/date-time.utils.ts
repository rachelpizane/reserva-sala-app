import {
  addDays,
  format,
  parse,
  setHours,
  setMinutes,
  setSeconds,
  startOfWeek,
} from "date-fns"
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

export function formatarData(data: Date): string {
  return format(data, "yyyy-MM-dd")
}

export function formatarDiaDaSemanaExtenso(data: Date): string {
  const nome = format(data, "EEEE", { locale: ptBR })
  return nome.charAt(0).toUpperCase() + nome.slice(1).replace("-feira", "")
}

export function parseDataLocal(data: string): Date {
  return parse(data, "yyyy-MM-dd", new Date())
}

export function retornarInicioSemanaFormatado(dataStr: string): string {
  const inicioSemana = startOfWeek(new Date(dataStr), {
    weekStartsOn: 1,
  })

  inicioSemana.setHours(0, 0, 0, 0)
  return formatarData(inicioSemana)
}

export function adicionarDias(dataStr: string, dias: number): Date {
  return addDays(dataStr, dias)
}

export function adicionarDiasFormatado(dataStr: string, dias: number): string {
  return formatarData(adicionarDias(dataStr, dias))
}

export function formatarDataExtenso(data: Date): string {
  return format(data, "d 'de' MMMM 'de' yyyy", { locale: ptBR })
}

export function formatarHora(data: Date): string {
  return format(data, "HH:mm")
}
