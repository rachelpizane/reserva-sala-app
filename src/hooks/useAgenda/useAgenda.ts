import { useAgendasSemanaisInfinitas } from "@/services/agenda/agenda.queries"
import type { AgendaDiaria } from "@/types/agenda.types"
import type { UseInfiniteQueryResult } from "@tanstack/react-query"

export type UseAgenda = {
  agendasDiarias: AgendaDiaria[]
  isLoading: boolean
  hasNextPage: boolean | undefined
  isFetchingNextPage: boolean
  fetchNextPage: UseInfiniteQueryResult["fetchNextPage"]
}

export function useAgenda(): UseAgenda {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useAgendasSemanaisInfinitas()

  const agendasDiarias = (data?.pages ?? [])
    .flatMap((pag) => pag.agendasDiarias)
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())

  return {
    agendasDiarias,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  }
}
