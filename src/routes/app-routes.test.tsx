import { render, screen } from "@testing-library/react"
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from "react-router-dom"
import AppRoutes from "./app-routes"

describe(AppRoutes.name, () => {
  it("deve renderizar NotFound para rota inexistente", () => {
    render(
      <MemoryRouter initialEntries={["/rota-inexistente"]}>
        <AppRoutes />
      </MemoryRouter>
    )
    expect(screen.getByText(/página não encontrada/i)).toBeInTheDocument()
  })
})
