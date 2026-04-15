import { mockNavigate } from "../../tests/mocks/router-dom.mock"
import { fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import NotFound from "./NotFound"
import { ROUTES } from "@/constants/routes"

describe(NotFound.name, () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("deve exibir o título de página não encontrada e o botão de voltar", () => {
    render(<NotFound />)

    expect(screen.getByText("Página não encontrada")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /voltar para página inicial/i })
    ).toBeInTheDocument()
  })

  it("deve navegar para página inicial ao clicar no botão", () => {
    render(<NotFound />)

    const button: HTMLButtonElement = screen.getByRole("button", {
      name: /voltar para página inicial/i,
    })

    fireEvent.click(button)
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.HOME)
  })
})
