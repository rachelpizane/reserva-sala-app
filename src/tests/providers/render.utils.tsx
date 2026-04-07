import { render } from "@testing-library/react"
import { MainProviders } from "./main-providers"
import { ReservationFormProvider, RoomFormProvider } from "./form-provider"

export function renderWithProviders(
  ui: React.ReactElement,
  { route = "/" } = {}
) {
  return render(<MainProviders route={route}>{ui}</MainProviders>)
}

export function renderWithReservationForm(ui: React.ReactElement) {
  return renderWithProviders(
    <ReservationFormProvider>{ui}</ReservationFormProvider>,
    { route: "/reservas/nova" }
  )
}

export function renderWithRoomForm(ui: React.ReactElement) {
  return renderWithProviders(<RoomFormProvider>{ui}</RoomFormProvider>, {
    route: "/salas/nova",
  })
}
