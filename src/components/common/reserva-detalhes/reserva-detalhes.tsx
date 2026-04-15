import type { ReservaDetalhes as ReservaDetalhesType } from "@/types/reservation.types"
import {
  formatarDataExtenso,
  formatarHora,
} from "@/utils/date-time/date-time.utils"
import {
  CalendarDays,
  Clock3,
  ContactRound,
  FileText,
  MapPin,
  Users,
} from "lucide-react"

interface ReservaDetalhesProps {
  reserva: ReservaDetalhesType
}

function ReservaDetalhes({ reserva }: ReservaDetalhesProps) {
  return (
    <article className="mt-2 flex w-full flex-col justify-center gap-5 py-6 md:p-4">
      <div className="flex flex-col gap-2 md:flex-row md:gap-5">
        <span className="mb-2 rounded-sm bg-primary py-2 text-center text-lg font-medium text-white md:mb-0 md:px-10">
          Reservada
        </span>
        <div className="flex items-center justify-center gap-2 font-medium">
          <CalendarDays />
          <p> {formatarDataExtenso(new Date(reserva.inicio))}</p>
        </div>
        <div className="flex items-center justify-center gap-2 font-medium">
          <Clock3 />
          <p>
            {formatarHora(new Date(reserva.inicio))} -{" "}
            {formatarHora(new Date(reserva.fim))}
          </p>
        </div>
      </div>

      <h2 className="my-2 text-center text-4xl font-medium md:my-5">
        {reserva.sala.nome}
      </h2>

      <div className="flex w-full items-center gap-5 rounded-sm bg-indigo-500 px-6 py-4 text-lg text-white">
        <ContactRound size={60} />
        <div>
          <h3 className="font-extralight">Organizado por:</h3>
          <p className="font-medium">{reserva.organizador}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
        <div className="flex flex-1 items-center gap-3 tracking-wide text-slate-700">
          <MapPin size={28} />

          {reserva.sala.localizacao ? (
            <p>{reserva.sala.localizacao}</p>
          ) : (
            <p className="text-gray-400 italic">(Localização não informada)</p>
          )}
        </div>

        <div className="flex items-center justify-center gap-4 rounded-sm border-l-8 border-indigo-800 bg-indigo-50 py-3 text-lg font-medium shadow-md md:px-6">
          <Users />
          <p>{reserva.sala.capacidade} pessoas</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 leading-relaxed tracking-wide">
        <div className="mt-5 flex items-center gap-4 text-lg font-bold">
          <FileText />
          <h3>Descrição da Sala</h3>
        </div>

        {reserva.sala.descricao ? (
          <p>{reserva.sala.descricao}</p>
        ) : (
          <p className="text-gray-400 italic">(Descrição não informada)</p>
        )}
      </div>
    </article>
  )
}

export default ReservaDetalhes
