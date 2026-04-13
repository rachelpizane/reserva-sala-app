import { useInfiniteQuery } from "@tanstack/react-query"
import { getAgendaSemanal } from "./agenda.service"
import { formatarData } from "@/utils/date-time/date-time.utils"
import type { AgendaSemanal } from "@/types/agenda.types"

export function useAgendasSemanaisInfinitas() {
  return useInfiniteQuery({
    queryKey: ["agendas-semanais"],

    queryFn: async ({ pageParam }) => {
      return getAgendaSemanal(pageParam)
    },
    initialPageParam: formatarData(new Date()),

    getNextPageParam: (ultimaPag: AgendaSemanal) => {
      if (!ultimaPag.temProxima) return undefined
      return ultimaPag.dataProximaSemana
    },
  })
}
