import type { AgendaReserva } from "@/types/agenda.types"
import { Loader2, SquareArrowOutUpRight } from "lucide-react"
import ReservaDetalhes from "../reserva-detalhes/reserva-detalhes"
import { AppDialog } from "../app-dialog/app-dialog"
import { useEffect, useState } from "react"
import { useReserva } from "@/services/reservation/reserva.querie"
import type { ReservaDetalhes as ReservaDetalhesType } from "@/types/reservation.types"
import { showErrorToast } from "@/utils/show-toast/show-toast.utils"

interface AgendaItemProps {
  agendaReserva: AgendaReserva
}

function AgendaItem({ agendaReserva }: AgendaItemProps) {
  const [open, setOpen] = useState(false)
  const [shouldFetch, setShouldFetch] = useState(false)
  const [reserva, setReserva] = useState<ReservaDetalhesType | undefined>(
    undefined
  )
  const { data, isLoading, isError } = useReserva(
    shouldFetch ? agendaReserva.id : null
  )

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen)
    if (!isOpen) setShouldFetch(false)
  }

  useEffect(() => {
    if (data && !isLoading) {
      setReserva(data)
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
      <div
        onClick={() => setShouldFetch(true)}
        className="flex cursor-pointer flex-col gap-1 rounded-md bg-gray-200 px-3 py-2 break-all shadow-gray-400 duration-300 hover:shadow-md"
      >
        <div className="text-xs">
          {agendaReserva.horaInicio} - {agendaReserva.horaFim}
        </div>
        <div className="flex items-center justify-between gap-2 border-2">
          <p className="truncate overflow-hidden font-medium whitespace-nowrap">
            {agendaReserva.nomeSala}
          </p>
          <span>
            {isLoading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <SquareArrowOutUpRight size={14} />
            )}
          </span>
        </div>
      </div>
      <AppDialog
        open={open}
        onOpenChange={handleOpenChange}
        contentClassName="sm:max-w-2xl"
      >
        <ReservaDetalhes reservaDetalhada={reserva} />
      </AppDialog>
    </>
  )
}

export default AgendaItem
