import BaseLayout from "@/components/common/base-layout/BaseLayout"
import CreateReservation from "@/features/reservation/pages/create-reservation/CreateReservation"
import CreateRoom from "@/features/room/pages/create-room/CreateRoom"
import NotFound from "@/pages/not-found/NotFound"
import { ROUTES } from "@/constants/routes"
import { Route, Routes } from "react-router-dom"
import Home from "@/pages/home/Home"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<BaseLayout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.CREATE_ROOM} element={<CreateRoom />} />
        <Route
          path={ROUTES.CREATE_RESERVATION}
          element={<CreateReservation />}
        />
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Route>
    </Routes>
  )
}
