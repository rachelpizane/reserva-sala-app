import type { WeeklySchedule } from "@/features/schedule/types/schedule.types"
import { api } from "../../../services/api"

export async function getWeeklySchedule(
  dateRef: string
): Promise<WeeklySchedule> {
  const response = await api.get("/agendas", {
    params: { data: dateRef },
  })
  return response.data
}
