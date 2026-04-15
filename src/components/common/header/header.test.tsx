import { mockNavigate } from "../../../tests/mocks/router-dom.mock"
import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import Header from "./Header"
import { ROUTES } from "@/constants/routes"

describe(Header.name, () => {
  it("deve navegar para página inicial ao clicar no ícone do calendário", () => {
    const { container } = render(<Header />)
    const icon: HTMLElement = container.querySelector(".lucide-calendar-clock")!

    fireEvent.click(icon)
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.HOME)
  })
})
