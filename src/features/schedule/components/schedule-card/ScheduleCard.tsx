import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { DailySchedule } from "@/features/schedule/types/schedule.types"
import {
  formatBrazilianDate,
  formatFullWeekDay,
  parseLocalDate,
} from "@/utils/date"
import ReservationModal from "../../../reservation/components/reservation-modal/ReservationModal"

interface ScheduleCardProps {
  dailySchedule: DailySchedule
}

function ScheduleCard({ dailySchedule }: ScheduleCardProps) {
  const localDate = parseLocalDate(dailySchedule.data)
  const weekDay = formatFullWeekDay(localDate)
  const formattedDate = formatBrazilianDate(localDate)

  return (
    <Card className="m-px min-h-screen rounded-2xl border-2 border-indigo-500 p-0">
      <CardHeader className="flex w-full flex-col items-center justify-center bg-indigo-500 py-2 text-white">
        <CardTitle className="text-lg uppercase">{weekDay}</CardTitle>
        <CardDescription className="text-white">
          {formattedDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex h-full w-full flex-col gap-3 p-4 pt-0">
        {dailySchedule.reservas.map((reservation) => (
          <ReservationModal
            key={reservation.id}
            scheduleReservation={reservation}
          />
        ))}
      </CardContent>
    </Card>
  )
}

export default ScheduleCard
