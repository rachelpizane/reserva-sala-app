import type { AgendaReserva } from "@/types/agenda.types"
import { SquareArrowOutUpRight } from "lucide-react"

interface AgendaItemProps {
  agendaReserva: AgendaReserva
}

function AgendaItem({ agendaReserva }: AgendaItemProps) {
  return (
    <div className="flex cursor-pointer flex-col gap-1 rounded-md bg-gray-200 px-3 py-2 break-all shadow-gray-400 duration-300 hover:shadow-md">
      <div className="text-xs">
        {agendaReserva.horaInicio} - {agendaReserva.horaFim}
      </div>
      <div className="flex items-center justify-between gap-2 border-2">
        <p className="truncate overflow-hidden font-medium whitespace-nowrap">
          {agendaReserva.nomeSala}
        </p>
        <span>
          <SquareArrowOutUpRight size={14} />
        </span>
      </div>
    </div>
  )
}

export default AgendaItem
