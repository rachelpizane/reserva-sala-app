import type { AgendaSemanal } from "@/types/agenda.types"
import { api } from "../api"

export async function getAgendaSemanal(
  dataRef: string
): Promise<AgendaSemanal> {
  const response = await api.get("/agendas", {
    params: { data: dataRef },
  })
  return response.data
}
