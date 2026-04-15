import { useInfiniteQuery } from "@tanstack/react-query"
import type { WeeklySchedule } from "../types/schedule.types"
import { getWeeklySchedule } from "./schedule.service"
import { formatDate } from "@/utils/date"

export function useInfiniteWeeklySchedules() {
  return useInfiniteQuery({
    queryKey: ["weekly-schedules"],

    queryFn: async ({ pageParam }) => {
      return getWeeklySchedule(pageParam)
    },
    initialPageParam: formatDate(new Date()),

    getNextPageParam: (lastPage: WeeklySchedule) => {
      if (!lastPage.temProxima) return undefined
      return lastPage.dataProximaSemana
    },
  })
}
