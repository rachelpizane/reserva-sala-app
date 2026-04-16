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

export function getTodayDate(): Date {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number)
  return h * 60 + m
}

export function combineDateTime(date: Date, time: string): Date {
  const [h, m] = time.split(":").map(Number)
  return setSeconds(setMinutes(setHours(date, h), m), 0)
}

export function formatDetailedDate(date: Date): string {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss")
}

export function formatBrazilianDate(date: Date): string {
  return format(date, "dd/MM/yyyy", { locale: ptBR })
}

export function formatDate(date: Date): string {
  return format(date, "yyyy-MM-dd")
}

export function formatFullWeekDay(date: Date): string {
  const name = format(date, "EEEE", { locale: ptBR })
  return name.charAt(0).toUpperCase() + name.slice(1).replace("-feira", "")
}

export function parseLocalDate(date: string): Date {
  return parse(date, "yyyy-MM-dd", new Date())
}

export function getFormattedWeekStart(dateStr: string): string {
  const weekStart = startOfWeek(new Date(dateStr), {
    weekStartsOn: 1,
  })
  weekStart.setHours(0, 0, 0, 0)
  return formatDate(weekStart)
}

export function addDaysToDate(dateStr: string, days: number): Date {
  return addDays(dateStr, days)
}

export function addDaysToDateFormatted(dateStr: string, days: number): string {
  return formatDate(addDaysToDate(dateStr, days))
}

export function formatLongDate(date: Date): string {
  return format(date, "d 'de' MMMM 'de' yyyy", { locale: ptBR })
}

export function formatTime(date: Date): string {
  return format(date, "HH:mm")
}

export function formatFullDateWithWeekday(date: Date): string {
  return format(date, "PPPP", { locale: ptBR })
}

export function getFirstDayOfNextMonth(): Date {
  const today = getTodayDate()
  return new Date(today.getFullYear(), today.getMonth() + 1, 1)
}
