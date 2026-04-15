import { beforeEach, describe, expect, it, vi } from "vitest"
import "../../../tests/mocks/router-dom.mock"
import BaseLayout from "./BaseLayout"
import { render, screen } from "@testing-library/react"

describe(BaseLayout.name, () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("deve renderizar Header, Footer, Toaster e Outlet", () => {
    render(<BaseLayout />)

    expect(screen.getByTestId("app-main-header")).toBeInTheDocument()
    expect(screen.getByTestId("app-main-footer")).toBeInTheDocument()
    expect(screen.getByTestId("mock-outlet")).toBeInTheDocument()
    expect(screen.getByLabelText("Notifications alt+T")).toBeInTheDocument()
  })
})
