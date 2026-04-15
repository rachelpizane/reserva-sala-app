import type { DailySchedule } from "@/features/schedule/types/schedule.types"
import { useInfiniteWeeklySchedules } from "../../api/schedule.queries"

export type UseWeeklyScheduleResult = {
  dailySchedules: DailySchedule[]
  isLoading: boolean
  hasNextPage: boolean | undefined
  isFetchingNextPage: boolean
  fetchNextPage: () => Promise<unknown>
}

export function useWeeklySchedule(): UseWeeklyScheduleResult {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteWeeklySchedules()

  const dailySchedules = (data?.pages ?? [])
    .flatMap((pag) => pag.agendasDiarias)
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())

  return {
    dailySchedules,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  }
}
