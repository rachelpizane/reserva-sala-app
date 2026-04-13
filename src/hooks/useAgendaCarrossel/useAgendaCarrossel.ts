import type { CarouselApi } from "@/components/ui/carousel"
import type { UseAgenda } from "../useAgenda/useAgenda"
import { useCallback, useEffect, useState } from "react"
import { formatarData, getDataHoje } from "@/utils/date-time/date-time.utils"

interface UseAgendaCarrossel {
  api: CarouselApi | undefined
  setApi: (api: CarouselApi | undefined) => void
}

export function useAgendaCarrossel(agenda: UseAgenda): UseAgendaCarrossel {
  const [api, setApi] = useState<CarouselApi | undefined>()

  const handleSelect = useCallback(() => {
    if (!api) return

    if (
      !api.canScrollNext() &&
      agenda.hasNextPage &&
      !agenda.isFetchingNextPage
    ) {
      agenda.fetchNextPage()
    }
  }, [api, agenda.hasNextPage, agenda.isFetchingNextPage])

  const scrollTParaHoje = useCallback(() => {
    if (!api) return
    if (!agenda.agendasDiarias?.length) return

    const hoje = formatarData(getDataHoje())

    const index = agenda.agendasDiarias.findIndex(
      (diaria) => diaria.data === hoje
    )

    if (index !== -1) {
      api.scrollTo(index, true)
    }
  }, [api])

  useEffect(() => {
    scrollTParaHoje()
  }, [scrollTParaHoje])

  useEffect(() => {
    if (!api) return

    api.on("select", handleSelect)

    return () => {
      api.off("select", handleSelect)
    }
  }, [api, handleSelect])

  return {
    api,
    setApi,
  }
}
