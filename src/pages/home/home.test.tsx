import { describe, expect, it } from "vitest"
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
import { apiUrl } from "@/tests/mocks/handlers.mock"

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

    it("deve exibir que a agenda não foi encontrada após a chamada do servidor ter falhado", async () => {
      server.use(
        http.get(apiUrl("/agendas"), () => {
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

  describe("Modal", () => {
    it("deve abrir e fechar o modal de detalhes da reserva ao clicar em um card de resumo", async () => {
      const user = userEvent.setup()
      const organizadorEsperado = /João da Silva/i
      const descricaoEsperada = /Sala equipada com projetor e ar-condicionado/i

      renderWithProviders(<Home />)

      const resumoButton = await screen.findByRole("button", {
        name: /Sala de Reunião 1/i,
      })

      expect(resumoButton).toBeInTheDocument()
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()

      await user.click(resumoButton)

      expect(await screen.findByRole("dialog")).toBeInTheDocument()
      expect(screen.getByText(organizadorEsperado)).toBeInTheDocument()
      expect(screen.getByText(descricaoEsperada)).toBeInTheDocument()

      const closeDialogButton = screen.getByRole("button", { name: /close/i })

      await user.click(closeDialogButton)

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
      expect(screen.queryByText(organizadorEsperado)).not.toBeInTheDocument()
      expect(screen.queryByText(descricaoEsperada)).not.toBeInTheDocument()
    })
  })

  it("deve exibir detalhes da reserva corretamente quando não for informado a localização e descrição da sala", async () => {
    const user = userEvent.setup()
    const localizacaoEsperada = /Localização não informada/i
    const descricaoEsperada = /Descrição não informada/i

    server.use(
      http.get(apiUrl("/reservas/:id"), ({ params }) => {
        const { id } = params

        return HttpResponse.json({
          id,
          inicio: "2026-04-14T09:00:00",
          fim: "2026-04-14T10:00:00",
          organizador: "João da Silva",
          sala: {
            id: "21181886-5cb3-49e5-943b-9582154c3b68",
            nome: "Sala de Reunião 1",
            capacidade: 10,
            localizacao: null,
            descricao: null,
          },
        })
      })
    )

    renderWithProviders(<Home />)

    const resumoButton = await screen.findByRole("button", {
      name: /Sala de Reunião 1/i,
    })

    expect(resumoButton).toBeInTheDocument()
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()

    await user.click(resumoButton)

    expect(await screen.findByRole("dialog")).toBeInTheDocument()
    expect(screen.getByText(localizacaoEsperada)).toBeInTheDocument()
    expect(screen.getByText(descricaoEsperada)).toBeInTheDocument()
  })

  it("deve exibir toast de erro inesperado quando o servidor retornar com erro ao chamar a reserva detalhada", async () => {
    const user = userEvent.setup()

    server.use(
      http.get(apiUrl("/reservas/:id"), () => {
        return HttpResponse.json(null, { status: 500 })
      })
    )

    renderWithProviders(<App />)

    const resumoButton = await screen.findByRole("button", {
      name: /Sala de Reunião 1/i,
    })

    const nullDialogElement = screen.queryByRole("dialog")

    expect(resumoButton).toBeInTheDocument()
    expect(nullDialogElement).not.toBeInTheDocument()

    await user.click(resumoButton)

    expect(await screen.findByText(/erro inesperado/i)).toBeInTheDocument()
    expect(nullDialogElement).not.toBeInTheDocument()
  })
})
