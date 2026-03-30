import { describe, expect, it, vi } from "vitest"
import * as roomService from "./room.service"
import { api } from "../api"
import type { RoomSchema } from "@/pages/types/room.schema"

vi.mock("../api", () => ({
  api: {
    post: vi.fn(),
  },
}))

describe("roomService", () => {
  describe(roomService.createRoom.name, () => {
    it("deve cadastrar uma salar com sucesso", async () => {
      const mockRoom: RoomSchema = {
        nome: "Sala reunião 1",
        capacidade: 10,
        localizacao: "2º andar, Ala B",
        descricao: "Sala equipada com projetor e ar-condicionado",
      }

      vi.mocked(api.post).mockResolvedValue({})

      await expect(roomService.createRoom(mockRoom)).resolves.toBeUndefined()
      expect(api.post).toHaveBeenCalledWith("/salas", mockRoom)
    })
  })
})
