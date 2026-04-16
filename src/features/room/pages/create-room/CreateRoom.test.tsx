import { describe, expect, it } from "vitest"
import CreateRoom from "./CreateRoom"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { RoomSchema } from "@/features/room/schemas/room.schema"
import { renderWithRoomForm } from "@/tests/providers/render.utils"
import { server } from "@/tests/mocks/server.mock"
import { apiUrl } from "@/tests/mocks/handlers.mock"
import { http, HttpResponse } from "msw"
import App from "@/App"

const mockSala: RoomSchema = {
  nome: "Sala 1",
  capacidade: 10,
  localizacao: null,
  descricao: null,
}

describe(CreateRoom.name, () => {
  describe("renderização básica", () => {
    it("deve renderizar os campos do formulário", () => {
      renderWithRoomForm(<CreateRoom />)

      const fields = ["Nome", "Capacidade", "Localização", "Descrição"]

      fields.forEach((label) => {
        expect(
          screen.getByLabelText(new RegExp(label, "i"))
        ).toBeInTheDocument()
      })

      expect(
        screen.getByRole("button", { name: /cadastrar/i })
      ).toBeInTheDocument()
    })

    it("deve renderizar o botão desabilitado por padrão", () => {
      renderWithRoomForm(<CreateRoom />)
      const button = screen.getByRole("button", { name: /cadastrar/i })

      expect(button).toBeDisabled()
    })
  })

  describe("Validações", () => {
    const capacidadeCenariosInvalidos = [
      ["", "A capacidade é obrigatória"],
      ["10.5", "A capacidade deve ser um número inteiro"],
      ["0", "A capacidade deve ser maior que zero"],
    ] as const

    it("deve mostrar erro quando nome estiver vazio", async () => {
      const user = userEvent.setup()

      renderWithRoomForm(<CreateRoom />)

      const nomeInput = screen.getByLabelText(/nome/i)

      await user.click(nomeInput)
      await user.tab()

      expect(
        await screen.findByText(/o nome é obrigatório/i)
      ).toBeInTheDocument()
    })

    it.each(capacidadeCenariosInvalidos)(
      "deve mostrar erro para capacidade: '%s'",
      async (valor, erroEsperado) => {
        const user = userEvent.setup()

        renderWithRoomForm(<CreateRoom />)

        const capacidadeInput = screen.getByLabelText(/capacidade/i)

        await user.clear(capacidadeInput)

        if (valor) {
          await user.type(capacidadeInput, valor)
        }

        await user.tab()

        expect(
          await screen.findByText(new RegExp(erroEsperado, "i"))
        ).toBeInTheDocument()
      }
    )
  })

  describe("Estados", () => {
    it("deve habilitar o botão quando o formulário for válido", async () => {
      const user = userEvent.setup()

      renderWithRoomForm(<CreateRoom />)

      const nomeInput = screen.getByLabelText(/nome/i)
      const capacidadeInput = screen.getByLabelText(/capacidade/i)
      const button = screen.getByRole("button", { name: /cadastrar/i })

      await user.type(nomeInput, mockSala.nome)
      await user.type(capacidadeInput, mockSala.capacidade.toString())

      await user.tab()

      expect(button).toBeEnabled()
    })
  })

  describe("Estados e submissão do formulário", () => {
    it("deve submeter formulário corretamente", async () => {
      const user = userEvent.setup()

      renderWithRoomForm(<App />)

      const nomeInput = screen.getByLabelText(/nome/i)
      const capacidadeInput = screen.getByLabelText(/capacidade/i)

      await user.type(nomeInput, mockSala.nome)
      await user.type(capacidadeInput, mockSala.capacidade.toString())

      await user.click(screen.getByRole("button", { name: /cadastrar/i }))

      expect(await screen.findByText(/sucesso/i)).toBeInTheDocument()
      expect(await screen.findByText(/cadastrar sala/i)).toBeInTheDocument()
    })

    it("deve mostrar toast de erro quando a mutation falhar", async () => {
      const user = userEvent.setup()

      server.use(
        http.post(apiUrl("/salas"), () => {
          return HttpResponse.json(
            { message: "Erro inesperado" },
            { status: 500 }
          )
        })
      )

      renderWithRoomForm(<App />)

      const nomeInput = screen.getByLabelText(/nome/i)
      const capacidadeInput = screen.getByLabelText(/capacidade/i)
      const button = screen.getByRole("button", { name: /cadastrar/i })

      await user.type(nomeInput, mockSala.nome)
      await user.type(capacidadeInput, mockSala.capacidade.toString())

      await user.click(button)

      expect(
        await screen.findByText(/ocorreu um erro inesperado/i)
      ).toBeInTheDocument()
      expect(screen.getByText(/nova sala/i)).toBeInTheDocument()
    })
  })
})
