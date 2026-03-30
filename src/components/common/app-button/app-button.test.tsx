import { describe, expect, it, vi } from "vitest"
import AppButton from "./app-button"
import { fireEvent, render, screen } from "@testing-library/react"

describe(AppButton.name, () => {
  it("renderiza com texto", () => {
    render(<AppButton>Salvar</AppButton>)
    expect(screen.getByRole("button", { name: /salvar/i })).toBeInTheDocument()
  })

  it("chama onClick quando clicado", () => {
    const handleClick = vi.fn()
    render(<AppButton onClick={handleClick}>Clique</AppButton>)
    fireEvent.click(screen.getByRole("button"))
    expect(handleClick).toHaveBeenCalled()
  })
})
