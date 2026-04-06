interface IRoutes {
  HOME: string
  NOT_FOUND: string
  CREATE_ROOM: string
  CREATE_RESERVATION: string
}

export const ROUTES: IRoutes = {
  HOME: "/",
  NOT_FOUND: "*",
  CREATE_ROOM: "salas/nova",
  CREATE_RESERVATION: "reservas/nova"
}
