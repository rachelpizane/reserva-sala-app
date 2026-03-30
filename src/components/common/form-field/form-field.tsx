import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { InputHTMLAttributes } from "react"
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form"

interface FormFieldProps<
  T extends FieldValues,
> extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: Path<T>
  required?: boolean
}

function FormField<T extends FieldValues>({
  label,
  name,
  required,
  ...inputProps
}: FormFieldProps<T>) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="min-h-30">
          <FieldLabel htmlFor={name}>
            {label} {required && <span className="text-destructive">*</span>}
          </FieldLabel>
          <Input
            {...field}
            {...inputProps}
            id={name}
            aria-invalid={fieldState.invalid}
            className="rounded-lg border-indigo-900 bg-neutral-100 px-4 py-6 shadow-md focus-visible:ring-indigo-300"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}

export default FormField
