import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/utils/constants/routes"

interface AppNavigate {
  toHome: () => void
  toRoomCreate: () => void
}

function useAppNavigate(): AppNavigate {
  const navigate = useNavigate()

  function toHome(): void {
    navigate(ROUTES.HOME)
  }

  function toRoomCreate(): void {
    navigate(ROUTES.CREATE_ROOM)
  }

  return {
    toHome,
    toRoomCreate,
  }
}

export default useAppNavigate
