import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { InputHTMLAttributes } from "react"
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form"
import FormField from "../form-field/form-field"

interface InputProps<
  T extends FieldValues,
> extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: Path<T>
  required?: boolean
}

function AppInput<T extends FieldValues>({
  label,
  name,
  required,
  ...inputProps
}: InputProps<T>) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormField
          label={label}
          name={name}
          required={required}
          error={fieldState.error}
        >
          <Input
            {...field}
            {...inputProps}
            id={name}
            aria-invalid={fieldState.invalid}
            className="rounded-lg border-indigo-900 bg-neutral-100 px-4 py-6 shadow-md focus-visible:ring-indigo-300"
          />
        </FormField>
      )}
    />
  )
}

export default AppInput
