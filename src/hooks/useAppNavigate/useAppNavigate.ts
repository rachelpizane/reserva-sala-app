import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/utils/constants/routes"

interface AppNavigate {
  toHome: () => void
  toRoomCreate: () => void
  toReservationCreate: () => void
}

function useAppNavigate(): AppNavigate {
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
