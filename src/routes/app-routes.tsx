import BaseLayout from "@/components/common/base-layout/base-layout"
import CreateReservation from "@/pages/create-reservation/create-reservation"
import CreateRoom from "@/pages/create-room/create-room"
import Home from "@/pages/home/home"
import NotFound from "@/pages/not-found/not-found"
import { ROUTES } from "@/utils/constants/routes"
import { Route, Routes } from "react-router-dom"

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
