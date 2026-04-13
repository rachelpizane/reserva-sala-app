import AppButton from "@/components/common/app-button/app-button"
import CarrosselAgendas from "@/components/common/carrossel-agendas/carrossel-agendas"
import useAppNavigate from "@/hooks/useAppNavigate/useAppNavigate"
import { Bookmark, CirclePlus } from "lucide-react"

function Home() {
  const { toRoomCreate, toReservationCreate } = useAppNavigate()

  return (
    <section className="flex w-full flex-col gap-5 md:max-w-6xl">
      <header className="flex flex-col gap-6 md:flex-row md:justify-between">
        <AppButton onClick={toRoomCreate}>
          <CirclePlus strokeWidth={2.5} className="scale-120" />
          Cadastrar Sala
        </AppButton>

        <AppButton
          className="border-5 border-primary bg-white text-primary hover:border-indigo-600 hover:bg-white hover:text-indigo-600"
          onClick={toReservationCreate}
        >
          {" "}
          <Bookmark strokeWidth={4} className="scale-120" /> Cadastrar Reserva
        </AppButton>
      </header>

      <CarrosselAgendas />
    </section>
  )
}

export default Home
