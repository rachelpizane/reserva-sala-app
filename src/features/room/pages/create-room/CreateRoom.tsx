import AppButton from "@/components/common/app-button/AppButton"
import AppInput from "@/components/common/app-input/AppInput"
import Title from "@/components/common/title/Title"
import { FieldGroup } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import useAppNavigate from "@/hooks/app-navigate/useAppNavigate"
import {
  defaultValues,
  roomSchema,
  type RoomFormValues,
  type RoomSchema,
} from "../../schemas/room.schema"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateRoom } from "@/features/room/api/room.mutations"
import { toast } from "sonner"
import { showErrorToast } from "@/utils/toast"

function CreateRoom() {
  const { toHome } = useAppNavigate()
  const { mutate, isPending } = useCreateRoom()

  const methods = useForm<RoomFormValues, any, RoomSchema>({
    mode: "all",
    resolver: zodResolver(roomSchema),
    defaultValues: defaultValues,
  })

  function onSubmit(data: RoomSchema): void {
    mutate(data, {
      onSuccess: () => {
        methods.reset()
        toHome()
        toast.success("Sala cadastrada com sucesso!")
      },
      onError: () => {
        showErrorToast()
      },
    })
  }

  return (
    <FormProvider {...methods}>
      <section className="flex w-full flex-1 flex-col gap-4 md:max-w-lg">
        <Title text="Nova Sala" />

        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-18"
        >
          <FieldGroup className="flex flex-col gap-2">
            <AppInput<RoomFormValues>
              label="Nome"
              name="nome"
              type="text"
              placeholder="Ex: Sala de Reunião 1"
              maxLength={100}
              required
            />

            <AppInput<RoomFormValues>
              label="Capacidade"
              name="capacidade"
              type="number"
              placeholder="Ex: 10"
              required
            />

            <AppInput<RoomFormValues>
              label="Localização"
              name="localizacao"
              type="text"
              placeholder="Ex: 2º andar, Ala B"
              maxLength={200}
            />

            <AppInput<RoomFormValues>
              label="Descrição"
              name="descricao"
              type="text"
              placeholder="Ex: Sala equipada com projetor e ar-condicionado"
              maxLength={255}
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

export default CreateRoom
