import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  formatarDataBrasileira,
  formatarDiaDaSemanaExtenso,
  parseDataLocal,
} from "@/utils/date-time/date-time.utils"
import AgendaItem from "../agenda-item/agenda-item"
import type { AgendaDiaria } from "@/types/agenda.types"

interface AgendaProps {
  agendaDiaria: AgendaDiaria
}

function Agenda({ agendaDiaria }: AgendaProps) {
  const dataLocal = parseDataLocal(agendaDiaria.data)
  const diaSemana = formatarDiaDaSemanaExtenso(dataLocal)
  const dataBrasileira = formatarDataBrasileira(dataLocal)

  return (
    <Card className="m-px min-h-screen rounded-2xl border-2 border-indigo-500 p-0">
      <CardHeader className="flex w-full flex-col items-center justify-center bg-indigo-500 py-2 text-white">
        <CardTitle className="text-lg uppercase">{diaSemana}</CardTitle>
        <CardDescription className="text-white">
          {dataBrasileira}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex h-full w-full flex-col gap-3 p-4 pt-0">
        {agendaDiaria.reservas.map((reserva) => (
          <AgendaItem key={reserva.id} agendaReserva={reserva} />
        ))}
      </CardContent>
    </Card>
  )
}

export default Agenda
