import {
  defaultValues as reservationDefaultValues,
  reservationSchema,
  type ReservationSchema,
} from "@/features/reservation/schemas/reservation.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { render } from "@testing-library/react"
import { FormProvider, useForm } from "react-hook-form"
import { MainProviders } from "./main-providers"
import {
  defaultValues as roomDefaultValues,
  roomSchema,
  type RoomFormValues,
  type RoomSchema,
} from "@/features/room/schemas/room.schema"

interface FormProviderProps {
  children: React.ReactNode
}

export function ReservationFormProvider({ children }: FormProviderProps) {
  const methods = useForm<ReservationSchema>({
    mode: "all",
    resolver: zodResolver(reservationSchema),
    defaultValues: reservationDefaultValues,
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}

export function RoomFormProvider({ children }: FormProviderProps) {
  const methods = useForm<RoomFormValues, any, RoomSchema>({
    mode: "all",
    resolver: zodResolver(roomSchema),
    defaultValues: roomDefaultValues,
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}
