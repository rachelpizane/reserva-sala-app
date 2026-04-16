import { renderHook, act } from "@testing-library/react"
import { useScheduleCarousel } from "./useScheduleCarousel"
import { beforeEach, describe, expect, it, vi } from "vitest"
import type { UseWeeklyScheduleResult } from "../weekly-schedule/useWeeklySchedule"
import type { CarouselApi } from "@/components/ui/carousel"
import { addDaysToDateFormatted, formatDate, getTodayDate } from "@/utils/date"

const mockScrollTo = vi.fn()
const mockOn = vi.fn()
const mockOff = vi.fn()
const mockCanScrollNext = vi.fn()
const mockFetchNextPage = vi.fn()

const mockApi: Partial<CarouselApi> = {
  scrollTo: mockScrollTo,
  canScrollNext: mockCanScrollNext,
  on: mockOn,
  off: mockOff,
}

const mockSheduleHook: UseWeeklyScheduleResult = {
  hasNextPage: true,
  isLoading: false,
  isFetchingNextPage: false,
  fetchNextPage: mockFetchNextPage,
  dailySchedules: [
    {
      data: addDaysToDateFormatted(formatDate(getTodayDate()), -1),
      reservas: [],
    },
    { data: formatDate(getTodayDate()), reservas: [] },
    {
      data: addDaysToDateFormatted(formatDate(getTodayDate()), 1),
      reservas: [],
    },
  ],
}

describe("useScheduleCarousel", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("deve retornar api e setApi", () => {
    const { result } = renderHook(() => useScheduleCarousel(mockSheduleHook))
    expect(result.current.api).toBeUndefined()
    expect(typeof result.current.setApi).toBe("function")
  })

  it("deve chamar scrollTo com o índice de hoje ao setar api", () => {
    const { result } = renderHook(() => useScheduleCarousel(mockSheduleHook))

    act(() => {
      result.current.setApi(mockApi as CarouselApi)
    })

    expect(mockScrollTo).toHaveBeenCalledWith(1, true)
  })

  it("deve registrar e remover o handler de select", () => {
    const { result, unmount } = renderHook(() =>
      useScheduleCarousel(mockSheduleHook)
    )

    act(() => {
      result.current.setApi(mockApi as CarouselApi)
    })

    expect(mockOn).toHaveBeenCalledWith("select", expect.any(Function))
    unmount()

    expect(mockOff).toHaveBeenCalledWith("select", expect.any(Function))
  })

  it("deve chamar fetchNextPage quando não pode scrollar para o próximo", () => {
    mockCanScrollNext.mockReturnValue(false)

    const { result } = renderHook(() => useScheduleCarousel(mockSheduleHook))

    act(() => {
      result.current.setApi(mockApi as CarouselApi)
    })

    const handler = mockOn.mock.calls[0][1]

    act(() => {
      handler()
    })

    expect(mockFetchNextPage).toHaveBeenCalled()
  })

  it("não deve chamar fetchNextPage se pode scrollar para o próximo", () => {
    mockCanScrollNext.mockReturnValue(true)

    const { result } = renderHook(() => useScheduleCarousel(mockSheduleHook))

    act(() => {
      result.current.setApi(mockApi as CarouselApi)
    })

    const handler = mockOn.mock.calls[0][1]

    act(() => {
      handler()
    })
    expect(mockFetchNextPage).not.toHaveBeenCalled()
  })
})
