import AppButton from "@/components/common/app-button/app-button"
import Title from "@/components/common/title/title"
import { FieldGroup } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import useAppNavigate from "@/hooks/useAppNavigate/useAppNavigate"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateRoom } from "@/services/room/room.mutation"
import { toast } from "sonner"
import {
  defaultValues,
  reservationSchema,
  type ReservationSchema,
} from "@/types/reservation.schema"
import AppDatePicker from "@/components/common/app-date-picker/app-date-picker"
import AppSelect from "@/components/common/app-select/app-select"
import { useRooms } from "@/services/room/room.queries"
import AppInput from "@/components/common/app-input/app-input"

function CreateReservation() {
  const { data, isLoading } = useRooms()

  const methods = useForm<ReservationSchema>({
    mode: "all",
    resolver: zodResolver(reservationSchema),
    defaultValues: defaultValues,
  })

  const options =
    isLoading || !data
      ? []
      : data.map((sala) => ({
          value: String(sala.id),
          label: `${sala.nome} (${sala.capacidade} pessoas)`,
        }))

  return (
    <FormProvider {...methods}>
      <section className="flex w-full flex-1 flex-col gap-4 md:max-w-lg">
        <Title text="Nova Reserva" />

        <form className="flex flex-col gap-18">
          <FieldGroup className="flex flex-col gap-2">
            <AppSelect<ReservationSchema>
              label="Sala"
              name="salaId"
              required
              placeholder="Selecione uma sala"
              options={options}
              isLoading={isLoading}
            />

            <AppDatePicker<ReservationSchema>
              label="Data"
              name="data"
              required
            />

            <AppInput<ReservationSchema>
              label="Início"
              name="inicio"
              type="time"
              required
            />

            <AppInput<ReservationSchema>
              label="Fim"
              name="fim"
              type="time"
              required
            />

            <AppInput<ReservationSchema>
              label="Organizador"
              name="organizador"
              type="text"
              maxLength={100}
              required
            />
          </FieldGroup>

          <AppButton
            type="submit"
            className="py-6"
            disabled={!methods.formState.isValid}
          >
            Cadastrar
          </AppButton>
        </form>
      </section>
    </FormProvider>
  )
}

export default CreateReservation
