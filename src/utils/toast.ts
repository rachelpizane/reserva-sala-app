import { toast } from "sonner"

export function showErrorToast(mensagem?: string): void {
  toast.error(
    mensagem || "Ocorreu um erro inesperado. Tente novamente mais tarde."
  )
}
