import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ButtonHTMLAttributes, ReactNode } from "react"

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

function AppButton({
  children,
  className,
  type = "button",
  ...props
}: AppButtonProps) {
  return (
    <Button
      type={type}
      className={cn(
        "flex w-full cursor-pointer gap-3 px-10 py-8 text-lg font-semibold shadow-md shadow-neutral-300 duration-200 hover:bg-indigo-600 disabled:bg-indigo-500 disabled:text-indigo-300 md:w-auto",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}

export default AppButton
