import useAppNavigate from "@/hooks/useAppNavigate/useAppNavigate"
import { CalendarClock } from "lucide-react"

function Header() {
  const { toHome } = useAppNavigate()

  return (
    <header
      data-testid="app-main-header"
      className="flex items-center justify-center bg-primary px-6 py-5 text-white"
    >
      <div className="flex w-full items-center justify-center gap-3 md:max-w-6xl md:justify-start">
        <CalendarClock size={30} onClick={toHome} className="cursor-pointer" />
        <h1 className="hidden text-2xl font-semibold md:block">
          Reserva de Salas
        </h1>
      </div>
    </header>
  )
}

export default Header
