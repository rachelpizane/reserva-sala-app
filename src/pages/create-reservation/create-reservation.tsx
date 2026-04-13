import AppButton from "@/components/common/app-button/app-button"
import Title from "@/components/common/title/title"
import { FieldGroup } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import useAppNavigate from "@/hooks/useAppNavigate/useAppNavigate"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import {
  defaultValues,
  reservationSchema,
  type ReservationSchema,
} from "@/types/reservation.schema"
import AppDatePicker from "@/components/common/app-date-picker/app-date-picker"
import AppSelect from "@/components/common/app-select/app-select"
import AppInput from "@/components/common/app-input/app-input"
import { useCreateReservation } from "@/services/reservation/reservation.mutation"
import { mapToReservationRequest } from "@/mapper/reservation.mapper"
import { useRoomOptions } from "@/hooks/useRoomOptions/useRoomOptions"
import { useQueryClient } from "@tanstack/react-query"

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

  function handleReservationError(err: any) {
    const backendError = err?.response?.data ?? err

    if (backendError.tipoErro === "CONFLITO_HORARIO") {
      backendError.mensagens.forEach((msg: string) => toast.error(msg))
      return
    }

    if (backendError.tipoErro === "NAO_ENCONTRADO") {
      toast.error("Sala não encontrada. Tente reservar outra sala")
      return
    }

    toast.error("Ocorreu um erro inesperado. Tente novamente mais tarde.")
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
