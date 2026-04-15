import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/constants/routes"

interface UseAppNavigateResult {
  toHome: () => void
  toRoomCreate: () => void
  toReservationCreate: () => void
}

function useAppNavigate(): UseAppNavigateResult {
  const navigate = useNavigate()

  function toHome(): void {
    navigate(ROUTES.HOME)
  }

  function toRoomCreate(): void {
    navigate(ROUTES.CREATE_ROOM)
  }

  function toReservationCreate(): void {
    navigate(ROUTES.CREATE_RESERVATION)
  }

  return {
    toHome,
    toRoomCreate,
    toReservationCreate,
  }
}

export default useAppNavigate
