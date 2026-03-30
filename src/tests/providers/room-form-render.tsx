import {
  defaultValues,
  type RoomFormValues,
} from "../../pages/types/room.schema"
import { roomSchema, type RoomSchema } from "@/pages/types/room.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { render } from "@testing-library/react"
import { FormProvider, useForm } from "react-hook-form"

function RoomFormProvider({ children }: { children: React.ReactNode }) {
  const methods = useForm<RoomFormValues, any, RoomSchema>({
    mode: "all",
    resolver: zodResolver(roomSchema),
    defaultValues,
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}

export function renderWithForm(ui: React.ReactElement) {
  return render(<RoomFormProvider>{ui}</RoomFormProvider>)
}
