import { describe, expect, it } from "vitest"
import FormField from "./app-input"
import userEvent from "@testing-library/user-event"
import { screen } from "@testing-library/react"
import { renderWithForm } from "@/tests/providers/room-form-render"

describe(FormField.name, () => {
  it("deve renderizar o input com label", () => {
    renderWithForm(<FormField name="nome" label="Nome" />)
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument()
  })

  it("deve mostrar * quando required", () => {
    renderWithForm(<FormField name="nome" label="Nome" required />)
    expect(screen.getByText("*")).toBeInTheDocument()
  })

  it("deve atualizar o valor ao digitar", async () => {
    renderWithForm(<FormField name="nome" label="Nome" />)

    const input = screen.getByLabelText(/nome/i)

    await userEvent.type(input, "Sala 1")

    expect(input).toHaveValue("Sala 1")
  })

  it("deve exibir erro quando campo for inválido", async () => {
    const user = userEvent.setup()

    renderWithForm(<FormField name="nome" label="Nome" />)

    const input = screen.getByLabelText(/nome/i)

    await user.click(input)
    await user.tab()

    expect(await screen.findByText(/o nome é obrigatório/i)).toBeInTheDocument()
  })
})
