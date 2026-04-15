import { z } from "zod"

export const roomSchema = z.object({
  nome: z.string().nonempty("O nome é obrigatório"),
  capacidade: z
    .string()
    .nonempty("A capacidade é obrigatória")
    .transform((num) => Number(num))
    .refine(
      (num) => Number.isInteger(num),
      "A capacidade deve ser um número inteiro"
    )
    .refine((num) => num > 0, "A capacidade deve ser maior que zero"),
  localizacao: z
    .string()
    .transform((valor) => (valor.trim() === "" ? null : valor))
    .nullable(),
  descricao: z
    .string()
    .transform((valor) => (valor.trim() === "" ? null : valor))
    .nullable(),
})

export type RoomFormValues = z.input<typeof roomSchema>
export type RoomSchema = z.output<typeof roomSchema>

export const defaultValues: RoomFormValues = {
  nome: "",
  capacidade: "",
  localizacao: "",
  descricao: "",
}
