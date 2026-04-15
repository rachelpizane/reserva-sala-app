import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import type { FieldError as RHFFieldError } from "react-hook-form"
interface FormFieldProps {
  label: string
  name: string
  required?: boolean
  error?: RHFFieldError
  children: React.ReactNode
}

function FormField({ label, name, required, error, children }: FormFieldProps) {
  return (
    <Field data-invalid={!!error} className="min-h-30">
      <FieldLabel htmlFor={name}>
        {label} {required && <span className="text-destructive">*</span>}
      </FieldLabel>

      {children}

      {error && <FieldError errors={[error]} />}
    </Field>
  )
}

export default FormField
