import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { CarouselControls } from "../carousel-controls/CarouselControls"
import { Loader2 } from "lucide-react"
import { useWeeklySchedule } from "../../hooks/weekly-schedule/useWeeklySchedule"
import { useScheduleCarousel } from "../../hooks/schedule-carousel/useScheduleCarousel"
import ScheduleError from "../schedule-error/ScheduleError"
import ScheduleCard from "../schedule-card/ScheduleCard"

function ScheduleCarousel() {
  const schedule = useWeeklySchedule()
  const { setApi } = useScheduleCarousel(schedule)

  if (schedule.isLoading) {
    return (
      <Loader2 className="mx-auto my-10 h-15 w-15 animate-spin text-primary" />
    )
  }

  if (schedule.dailySchedules.length === 0) {
    return <ScheduleError />
  }

  return (
    <div className="mx-auto max-w-full md:mx-0 md:h-96 lg:h-125">
      <Carousel
        setApi={setApi}
        className="w-full max-w-sm sm:max-w-2xl md:h-full md:max-w-full"
      >
        <CarouselControls isFetchingNextPage={schedule.isFetchingNextPage} />
        <div className="h-full overflow-y-auto border-2 border-dashed border-indigo-100 p-2 pb-4">
          <CarouselContent className="-ml-2">
            {schedule.dailySchedules.map((dailySchedule) => (
              <CarouselItem
                key={dailySchedule.data}
                className="pl-2 sm:basis-1/2 md:basis-1/4 lg:basis-1/5"
              >
                <ScheduleCard dailySchedule={dailySchedule} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
    </div>
  )
}

export default ScheduleCarousel
