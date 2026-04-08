import { describe, expect, it } from "vitest"
import { screen } from "@testing-library/react"
import { renderWithReservationForm } from "@/tests/providers/render.utils"
import CreateReservation from "./create-reservation"
import userEvent from "@testing-library/user-event"
import { formatarDataBrasileira } from "@/utils/date-time/date-time.utils"
import AppRoutes from "@/routes/app-routes"
import { server } from "@/tests/mocks/server.mock"
import { http, HttpResponse } from "msw"

const campos = {
  sala: { label: "Sala", testId: "select-salaId" },
  data: { label: "Data", testId: "input-data" },
  horarioInicial: { label: "Horário Inicial", testId: "input-inicio" },
  horarioFinal: { label: "Horário Final", testId: "input-fim" },
  organizador: { label: "Organizador", testId: "input-organizador" },
}

async function preencherFormularioReserva({
  indiceSala = 0,
  inicio = "19:00",
  fim = "19:30",
  organizador = "Usuário Teste",
} = {}) {
  await screen.findByText(/selecione uma sala/i)
  await userEvent.click(screen.getByTestId(campos.sala.testId))
  const opcoes = screen.getAllByTestId("select-item-salaId")
  await userEvent.click(opcoes[indiceSala])

  const inputInicio = screen.getByTestId(campos.horarioInicial.testId)
  const inputFim = screen.getByTestId(campos.horarioFinal.testId)
  const inputOrganizador = screen.getByTestId(campos.organizador.testId)

  await userEvent.type(inputInicio, inicio)
  await userEvent.type(inputFim, fim)
  await userEvent.type(inputOrganizador, organizador)
}

async function submeterFormularioReserva() {
  await preencherFormularioReserva()
  await userEvent.click(screen.getByRole("button", { name: /cadastrar/i }))
}

describe(CreateReservation.name, () => {
  describe("Renderização", () => {
    it("deve renderizar o titulo 'Nova Reserva'", () => {
      renderWithReservationForm(<CreateReservation />)
      const titulo = screen.getByRole("heading")

      expect(titulo).toBeInTheDocument()
      expect(titulo).toHaveTextContent(/nova reserva/i)
    })

    it("deve renderizar os titulos dos campos do formulário", () => {
      renderWithReservationForm(<CreateReservation />)

      Object.values(campos).forEach(({ label }) => {
        expect(
          screen.getByLabelText(new RegExp(label, "i"))
        ).toBeInTheDocument()
      })
    })

    it("deve renderizar o botão de 'Cadastrar' desativado por padrão", () => {
      renderWithReservationForm(<CreateReservation />)
      const button = screen.getByRole("button", { name: /cadastrar/i })

      expect(button).toBeInTheDocument()
      expect(button).toBeDisabled()
    })

    it("deve renderizar a lista de salas com suas respectivas capacidades", async () => {
      const { container } = renderWithReservationForm(<CreateReservation />)
      await screen.findByText(/selecione uma sala/i)

      const select = container.querySelector("select[aria-hidden='true']")
      const options = select ? select.querySelectorAll("option") : []

      expect(options).toHaveLength(2)
      expect(options[0]).toHaveTextContent("Sala de Reunião 1 (10 pessoas)")
    })

    it("deve renderizar o formulário com a data de hoje por padrão", () => {
      const { container } = renderWithReservationForm(<CreateReservation />)
      const data = container.querySelector("#data")

      expect(data).toHaveTextContent(formatarDataBrasileira(new Date()))
    })
  })

  describe("Validações", () => {
    const cenariosCamposObrigatorios = [
      [campos.horarioInicial.testId, "o horário inicial é obrigatório"],
      [campos.horarioFinal.testId, "o horário final é obrigatório"],
      [campos.organizador.testId, "o organizador é obrigatório"],
    ]

    const cenariosForaHorarioComercial = [
      [campos.horarioInicial.testId, "07:59"],
      [campos.horarioFinal.testId, "20:01"],
    ]

    it.each(cenariosCamposObrigatorios)(
      "deve mostrar erro quando campo estiver vazio: '%s'",
      async (testId, erroEsperado) => {
        renderWithReservationForm(<CreateReservation />)

        const input = screen.getByTestId(testId)

        await userEvent.click(input)
        await userEvent.tab()

        expect(
          await screen.findByText(new RegExp(erroEsperado, "i"))
        ).toBeInTheDocument()
      }
    )

    it.each(cenariosForaHorarioComercial)(
      "deve mostrar erro quando horário estiver fora do horário comercial (08:00 as 20:00)",
      async (testId, horaInvalida) => {
        renderWithReservationForm(<CreateReservation />)
        const inputHora = screen.getByTestId(testId)

        await userEvent.type(inputHora, horaInvalida)

        expect(
          await screen.findByText(
            new RegExp("A reserva deve ser entre 08:00 e 20:00", "i")
          )
        ).toBeInTheDocument()
      }
    )
    
    it("deve mostrar erro quando horário final estiver anterior ao inicial", async () => {
      renderWithReservationForm(<CreateReservation />)
      const inputInicial = screen.getByTestId(campos.horarioInicial.testId)
      await userEvent.type(inputInicial, "13:00")

      const inputFinal = screen.getByTestId(campos.horarioFinal.testId)
      await userEvent.type(inputFinal, "12:30")

      expect(
        await screen.findByText(
          new RegExp("O horário final deve ser após o horário inicial", "i")
        )
      ).toBeInTheDocument()
    })

    it("deve habilitar o botão quando o formulário for válido", async () => {
      renderWithReservationForm(<CreateReservation />)
      await preencherFormularioReserva()

      expect(
        screen.getByRole("button", { name: /cadastrar/i })
      ).not.toBeDisabled()
    })
  })

  describe("Submissão do Formulário", () => {
    it("deve submeter corretamente", async () => {
      renderWithReservationForm(<AppRoutes />)
      await submeterFormularioReserva()

      expect(await screen.findByText(/sucesso/i)).toBeInTheDocument()
      expect(screen.getByText(/cadastrar reserva/i)).toBeInTheDocument()
    })

    it("deve notificar com erro quando tiver conflito de horários", async () => {
      server.use(
        http.post("*/reservas", () => {
          return HttpResponse.json(
            {
              tipoErro: "CONFLITO_HORARIO",
              mensagens: ["Conflito de horário"],
            },
            { status: 409 }
          )
        })
      )

      renderWithReservationForm(<AppRoutes />)
      await submeterFormularioReserva()

      expect(await screen.findByText(/conflito/i)).toBeInTheDocument()
      expect(screen.getByText(/nova reserva/i)).toBeInTheDocument()
    })

    it("deve notificar com erro quando sala não for encontrada", async () => {
      server.use(
        http.post("*/reservas", () => {
          return HttpResponse.json(
            {
              tipoErro: "NAO_ENCONTRADO",
              mensagens: ["Sala não encontrada"],
            },
            { status: 404 }
          )
        })
      )

      renderWithReservationForm(<AppRoutes />)
      await submeterFormularioReserva()

      expect(
        await screen.findByText(/sala não encontrada/i)
      ).toBeInTheDocument()
      expect(screen.getByText(/nova reserva/i)).toBeInTheDocument()
    })

    it("deve notificar com erro quando quando ocorrer erro inesperado", async () => {
      server.use(
        http.post("*/reservas", () => {
          return HttpResponse.json(
            { message: "Erro inesperado" },
            { status: 500 }
          )
        })
      )

      renderWithReservationForm(<AppRoutes />)
      await submeterFormularioReserva()

      expect(
        await screen.findByText(/ocorreu um erro inesperado/i)
      ).toBeInTheDocument()
      expect(screen.getByText(/nova reserva/i)).toBeInTheDocument()
    })
  })
})
