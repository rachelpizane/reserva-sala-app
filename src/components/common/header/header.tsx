import useAppNavigate from "@/hooks/useAppNavigate/useAppNavigate"
import { CalendarClock } from "lucide-react"

function Header() {
  const { toHome } = useAppNavigate()

  return (
    <header className="flex items-center justify-center bg-primary px-6 py-5 text-white md:justify-start">
      <div className="flex items-center gap-3">
        <CalendarClock
          size={30}
          onClick={toHome}
          className="cursor-pointer"
        />
        <h1 className="hidden text-2xl font-semibold md:block">
          Reserva de Salas
        </h1>
      </div>
    </header>
  )
}

export default Header
