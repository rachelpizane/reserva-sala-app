import type { SalaDetalhes } from "./room.types"

export type ReservationRequest = {
  salaId: string
  inicio: string
  fim: string
  organizador: string
}

export type ReservaDetalhes = {
  id: string
  inicio: string
  fim: string
  organizador: string
  sala: SalaDetalhes
}
