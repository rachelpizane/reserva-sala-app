import { mockNavigate } from "../../tests/mocks/router-dom.mock"
import { beforeEach, describe, expect, it, vi } from "vitest"
import CreateRoom from "./create-room"
import { renderWithForm } from "@/tests/providers/room-form-render"
import { screen, waitFor } from "@testing-library/react"
import userEvent, { type UserEvent } from "@testing-library/user-event"
import type { RoomSchema } from "../types/room.schema"
import { toast } from "sonner"
import { ROUTES } from "@/utils/constants/routes"

const mutateMock = vi.fn()
let isPendingMock = false

const mockSala: RoomSchema = {
  nome: "Sala 1",
  capacidade: 10,
  localizacao: null,
  descricao: null,
}

vi.mock("@/services/room/room.mutation", () => ({
  useCreateRoom: () => ({
    mutate: mutateMock,
    isPending: isPendingMock,
  }),
}))

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe(CreateRoom.name, () => {
  beforeEach(() => {
    vi.clearAllMocks()
    isPendingMock = false
  })

  describe("renderização básica", () => {
    it("deve renderizar os campos do formulário", () => {
      renderWithForm(<CreateRoom />)

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
      renderWithForm(<CreateRoom />)
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

      renderWithForm(<CreateRoom />)

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

        renderWithForm(<CreateRoom />)

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
      renderWithForm(<CreateRoom />)

      const nomeInput = screen.getByLabelText(/nome/i)
      const capacidadeInput = screen.getByLabelText(/capacidade/i)
      const button = screen.getByRole("button", { name: /cadastrar/i })

      await user.type(nomeInput, mockSala.nome)
      await user.type(capacidadeInput, mockSala.capacidade.toString())

      await user.tab()

      expect(button).toBeEnabled()
    })

    it("deve mostrar spinner quando isPending for true", () => {
      isPendingMock = true

      renderWithForm(<CreateRoom />)

      const spinner = document.querySelector('[data-icon="inline-start"]')

      expect(spinner).toBeInTheDocument()
    })
  })

  describe("Estados e submissão do formulário", () => {
    let user: UserEvent

    beforeEach(() => {
      user = userEvent.setup()
    })

    it("deve chamar mutate com os dados corretos ao submeter", async () => {
      renderWithForm(<CreateRoom />)

      const nomeInput = screen.getByLabelText(/nome/i)
      const capacidadeInput = screen.getByLabelText(/capacidade/i)
      const button = screen.getByRole("button", { name: /cadastrar/i })

      await user.type(nomeInput, mockSala.nome)
      await user.type(capacidadeInput, mockSala.capacidade.toString())

      await user.tab()
      await user.click(button)

      expect(mutateMock).toHaveBeenCalledTimes(1)
      expect(mutateMock).toHaveBeenCalledWith(mockSala, expect.any(Object))
    })

    it("deve resetar o formulário, navegar e mostrar toast de sucesso", async () => {
      renderWithForm(<CreateRoom />)

      const nomeInput = screen.getByLabelText(/nome/i)
      const capacidadeInput = screen.getByLabelText(/capacidade/i)
      const button = screen.getByRole("button", { name: /cadastrar/i })

      await user.type(nomeInput, mockSala.nome)
      await user.type(capacidadeInput, mockSala.capacidade.toString())

      await user.tab()
      await user.click(button)

      const mutateCall = mutateMock.mock.calls[0]
      const options = mutateCall[1]

      options.onSuccess()

      expect(mockNavigate).toHaveBeenCalledWith(ROUTES.HOME)
      expect(toast.success).toHaveBeenCalledWith("Sala cadastrada com sucesso!")

      await waitFor(() => {
        expect(nomeInput).toHaveValue("")
        expect(capacidadeInput).toHaveValue(null)
      })
    })

    it("deve mostrar toast de erro quando a mutation falhar", async () => {
      renderWithForm(<CreateRoom />)

      const nomeInput = screen.getByLabelText(/nome/i)
      const capacidadeInput = screen.getByLabelText(/capacidade/i)
      const button = screen.getByRole("button", { name: /cadastrar/i })

      await user.type(nomeInput, mockSala.nome)
      await user.type(capacidadeInput, mockSala.capacidade.toString())

      await user.tab()
      await user.click(button)

      const mutateCall = mutateMock.mock.calls[0]
      const options = mutateCall[1]

      options.onError()

      expect(toast.error).toHaveBeenCalledWith(
        "Ocorreu um erro inesperado. Tente novamente."
      )
    })
  })
})
