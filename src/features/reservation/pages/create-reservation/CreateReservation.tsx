import AppButton from "@/components/common/app-button/AppButton"
import Title from "@/components/common/title/Title"
import { FieldGroup } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import useAppNavigate from "@/hooks/app-navigate/useAppNavigate"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import {
  defaultValues,
  reservationSchema,
  type ReservationSchema,
} from "@/features/reservation/schemas/reservation.schema"
import AppDatePicker from "@/components/common/app-date-picker/AppDatePicker"
import { useCreateReservation } from "@/features/reservation/api/reservation.mutations"
import { mapToReservationRequest } from "@/features/reservation/mappers/reservation.mapper"
import { useRoomOptions } from "@/features/room/hooks/room-options/useRoomOptions"
import { useQueryClient } from "@tanstack/react-query"
import { showErrorToast } from "@/utils/toast"
import AppSelect from "@/components/common/app-select/AppSelect"
import AppInput from "@/components/common/app-input/AppInput"

function CreateReservation() {
  const queryClient = useQueryClient()
  const { toHome } = useAppNavigate()
  const { options, isLoading } = useRoomOptions()
  const { mutate, isPending } = useCreateReservation()

  const methods = useForm<ReservationSchema>({
    mode: "all",
    resolver: zodResolver(reservationSchema),
    defaultValues: defaultValues,
  })

  function onSubmit(data: ReservationSchema): void {
    const payload = mapToReservationRequest(data)

    mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["agendas-semanais"],
        })
        methods.reset()
        toHome()
        toast.success("Reserva cadastrada com sucesso!")
      },
      onError: (err: any) => handleReservationError(err),
    })
  }

  function handleReservationError(err: any): void {
    const backendError = err?.response?.data ?? err

    if (backendError.tipoErro === "CONFLITO_HORARIO") {
      backendError.mensagens.forEach((msg: string) => showErrorToast(msg))
      return
    }

    if (backendError.tipoErro === "NAO_ENCONTRADO") {
      showErrorToast("Sala não encontrada. Tente reservar outra sala.")
      return
    }

    showErrorToast()
  }

  return (
    <FormProvider {...methods}>
      <section className="flex w-full flex-1 flex-col gap-4 md:max-w-lg">
        <Title text="Nova Reserva" />

        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-18"
        >
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
              label="Horário inicial"
              name="inicio"
              type="time"
              required
            />

            <AppInput<ReservationSchema>
              label="Horário final"
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
            {isPending && <Spinner data-icon="inline-start" />}
            Cadastrar
          </AppButton>
        </form>
      </section>
    </FormProvider>
  )
}

export default CreateReservation
