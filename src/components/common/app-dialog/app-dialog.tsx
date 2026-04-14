import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
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
      <DialogTitle className="sr-only">Detalhes da Reserva</DialogTitle>
      <DialogContent className={contentClassName}>{children}</DialogContent>
    </Dialog>
  )
}
