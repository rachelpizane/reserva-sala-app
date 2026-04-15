import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { ReactNode } from "react"

interface AppDialogProps extends React.ComponentProps<typeof Dialog> {
  children: ReactNode
  contentClassName?: string
}

export function AppDialog({
  children,
  contentClassName,
  ...props
}: AppDialogProps) {
  return (
    <Dialog {...props}>
      <DialogHeader>
        <DialogTitle className="sr-only">Detalhes da Reserva</DialogTitle>
        <DialogDescription className="sr-only">
          Informações detalhadas sobre a reserva selecionada.
        </DialogDescription>
      </DialogHeader>

      <DialogContent className={contentClassName}>{children}</DialogContent>
    </Dialog>
  )
}
