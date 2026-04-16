import { Loader2, SquareArrowOutUpRight } from "lucide-react"
import { AppDialog } from "../../../../components/common/app-dialog/AppDialog"
import { useEffect, useState } from "react"
import { showErrorToast } from "@/utils/toast"
import { Button } from "@/components/ui/button"
import type { ScheduleReservation } from "@/features/schedule/types/schedule.types"
import { useReservation } from "@/features/reservation/api/reservation.queries"
import type { ReservationResponse } from "@/features/reservation/types/reservation.types"
import ReservationDetails from "@/features/reservation/components/reservation-details/ReservationDetails"

interface ReservationModalProps {
  scheduleReservation: ScheduleReservation
}

function ReservationModal({ scheduleReservation }: ReservationModalProps) {
  const [open, setOpen] = useState(false)
  const [shouldFetch, setShouldFetch] = useState(false)
  const [reservation, setReservation] = useState<
    ReservationResponse | undefined
  >(undefined)
  const { data, isLoading, isError } = useReservation(
    shouldFetch ? scheduleReservation.id : null
  )

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen)
    if (!isOpen) setShouldFetch(false)
  }

  useEffect(() => {
    if (data && !isLoading) {
      setReservation(data)
      setOpen(true)
    }
  }, [data, isLoading])

  useEffect(() => {
    if (isError && !isLoading) {
      showErrorToast()
    }
  }, [isError])

  return (
    <>
      <Button
        onClick={() => setShouldFetch(true)}
        className="flex h-fit cursor-pointer flex-col items-stretch gap-1 rounded-md bg-gray-200 px-3 py-3 text-gray-900 shadow-gray-400 duration-300 hover:shadow-md md:py-2"
      >
        <div className="self-start text-xs">
          {scheduleReservation.horaInicio} - {scheduleReservation.horaFim}
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="truncate overflow-hidden font-medium whitespace-nowrap">
            {scheduleReservation.nomeSala}
          </p>
          <span>
            {isLoading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <SquareArrowOutUpRight size={14} />
            )}
          </span>
        </div>
      </Button>
      <AppDialog
        open={open}
        onOpenChange={handleOpenChange}
        contentClassName="sm:max-w-2xl"
      >
        {reservation && <ReservationDetails reservation={reservation} />}
      </AppDialog>
    </>
  )
}

export default ReservationModal
