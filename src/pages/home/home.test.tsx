import { describe, expect, it, vi } from "vitest"
import Home from "./home"
import { renderWithProviders } from "@/tests/providers/render.utils"
import { screen } from "@testing-library/react"
import {
  formatarDataBrasileira,
  getDataHoje,
} from "@/utils/date-time/date-time.utils"
import { server } from "@/tests/mocks/server.mock"
import { http, HttpResponse } from "msw"
import App from "@/App"
import userEvent from "@testing-library/user-event"

describe(Home.name, () => {
  describe("Renderização inicial", () => {
    it("deve exibir dois botões para cadastro das salas e das reservas", () => {
      renderWithProviders(<Home />)
      const buttonSalaElement = screen.getByRole("button", {
        name: /cadastrar sala/i,
      })
      const buttonReservaElement = screen.getByRole("button", {
        name: /cadastrar reserva/i,
      })

      expect(buttonSalaElement).toBeInTheDocument()
      expect(buttonReservaElement).toBeInTheDocument()
    })

    it("deve exibir um loader durante a chamada da agenda semanal", () => {
      const { container } = renderWithProviders(<Home />)

      const loaderElement = container.querySelector(".lucide-loader-circle")
      expect(loaderElement).toBeInTheDocument()
    })

    it("deve exibir a agenda semanal após chamada do servidor", async () => {
      renderWithProviders(<Home />)

      expect(
        await screen.findByText(formatarDataBrasileira(getDataHoje()))
      ).toBeInTheDocument()

      expect(await screen.findByText(/Sala de Reunião 1/i)).toBeInTheDocument()
    })
  })
  describe("Comportamento de erro", () => {
    it("deve exibir que a agenda não foi encontrada após a chamada do servidor ter falhado", async () => {
      server.resetHandlers(
        http.get("*/agendas", () => {
          return HttpResponse.json(null, { status: 500 })
        })
      )

      renderWithProviders(<Home />)
      const titleElement = await screen.findByRole("heading", {
        name: /agenda não encontrada/i,
      })

      expect(titleElement).toBeInTheDocument()
    })
  })

  describe("Navegação", () => {
    it("deve ser direcionado para RegistroSala ao clicar em 'Cadastrar Sala'", async () => {
      renderWithProviders(<App />)
      const buttonSalaElement = screen.getByRole("button", {
        name: /cadastrar sala/i,
      })

      await userEvent.click(buttonSalaElement)
      expect(
        await screen.findByRole("heading", { name: /nova sala/i })
      ).toBeInTheDocument()
    })

    it("deve ser direcionado para RegistroReserva ao clicar em 'Cadastrar Reserva'", async () => {
      renderWithProviders(<App />)
      const buttonReservaElement = screen.getByRole("button", {
        name: /cadastrar reserva/i,
      })

      await userEvent.click(buttonReservaElement)
      expect(
        await screen.findByRole("heading", { name: /nova reserva/i })
      ).toBeInTheDocument()
    })
  })
})
