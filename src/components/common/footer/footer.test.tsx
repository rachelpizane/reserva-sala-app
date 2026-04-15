import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import Footer from "./Footer"

describe(Footer.name, () => {
  it("deve renderizar o link do LinkedIn corretamente", () => {
    render(<Footer />)

    const link: HTMLAnchorElement = screen.getByRole("link", {
      name: /rachel pizane/i,
    })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute(
      "href",
      expect.stringContaining("linkedin.com")
    )
  })
})
