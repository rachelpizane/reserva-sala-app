import { screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import AppRoutes from "./app-routes"
import { renderWithProviders } from "@/tests/providers/render.utils"

describe(AppRoutes.name, () => {
  it("deve renderizar NotFound para rota inexistente", () => {
    renderWithProviders(<AppRoutes />, { route: "/rota-inexistente" })

    expect(screen.getByText(/página não encontrada/i)).toBeInTheDocument()
  })

  it("deve renderizar CreateRoom para rota '/salas/nova'", () => {
    renderWithProviders(<AppRoutes />, { route: "/salas/nova" })
    expect(screen.getByText(/nova sala/i)).toBeInTheDocument()
  })
})
