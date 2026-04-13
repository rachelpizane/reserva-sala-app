import Agenda from "../agenda/agenda"
import AgendaErro from "../agenda-erro/agenda-erro"
import { useAgenda } from "@/hooks/useAgenda/useAgenda"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { useAgendaCarrossel } from "@/hooks/useAgendaCarrossel/useAgendaCarrossel"
import { CarrosselControles } from "../carrossel-controles/carrossel-controles"
import { Loader2 } from "lucide-react"

function CarrosselAgendas() {
  const agenda = useAgenda()
  const { setApi } = useAgendaCarrossel(agenda)

  if (agenda.isLoading) {
    return (
      <Loader2 className="mx-auto my-10 h-15 w-15 animate-spin text-primary" />
    )
  }

  if (agenda.agendasDiarias.length === 0) {
    return <AgendaErro />
  }

  return (
    <div className="mx-auto md:mx-0 md:h-96 lg:h-125">
      <Carousel
        setApi={setApi}
        className="w-full max-w-sm sm:max-w-2xl md:h-full md:max-w-full"
      >
        <CarrosselControles isFetchingNextPage={agenda.isFetchingNextPage} />
        <div className="h-full overflow-y-auto border-2 border-dashed border-indigo-100 p-2 pb-4">
          <CarouselContent className="-ml-2">
            {agenda.agendasDiarias.map((agendaDiaria) => (
              <CarouselItem
                key={agendaDiaria.data}
                className="pl-2 sm:basis-1/4 lg:basis-1/5"
              >
                <Agenda agendaDiaria={agendaDiaria} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
    </div>
  )
}

export default CarrosselAgendas
