import type { CarouselApi } from "@/components/ui/carousel"
import { useCallback, useEffect, useState } from "react"
import type { UseWeeklyScheduleResult } from "@/features/schedule/hooks/weekly-schedule/useWeeklySchedule"
import { formatDate, getTodayDate } from "@/utils/date"

interface UseScheduleCarouselResult {
  api: CarouselApi | undefined
  setApi: (api: CarouselApi | undefined) => void
}

export function useScheduleCarousel(
  schedule: UseWeeklyScheduleResult
): UseScheduleCarouselResult {
  const [api, setApi] = useState<CarouselApi | undefined>()

  const handleSelect = useCallback(() => {
    if (!api) return
    if (
      !api.canScrollNext() &&
      schedule.hasNextPage &&
      !schedule.isFetchingNextPage
    ) {
      schedule.fetchNextPage()
    }
  }, [api, schedule.hasNextPage, schedule.isFetchingNextPage])

  const scrollToToday = useCallback(() => {
    if (!api) return
    if (!schedule.dailySchedules?.length) return

    const today = formatDate(getTodayDate())

    const index = schedule.dailySchedules.findIndex(
      (daily) => daily.data === today
    )

    if (index !== -1) {
      api.scrollTo(index, true)
    }
  }, [api])

  useEffect(() => {
    scrollToToday()
  }, [scrollToToday])

  useEffect(() => {
    if (!api) return

    api.on("select", handleSelect)
    handleSelect()

    return () => {
      api.off("select", handleSelect)
    }
  }, [api, handleSelect])

  return {
    api,
    setApi,
  }
}
