import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form"
import FormField from "../form-field/form-field"
import { FilmIcon, Loader2 } from "lucide-react"

interface SelectProps<T extends FieldValues> {
  label: string
  name: Path<T>
  placeholder: string
  required?: boolean
  isLoading: boolean
  options: {
    value: string
    label: string
  }[]
}

function AppSelect<T extends FieldValues>({
  label,
  name,
  required,
  placeholder,
  isLoading,
  options,
}: SelectProps<T>) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormField
          label={label}
          name={name}
          required={required}
          error={fieldState.error}
        >
          <Select onValueChange={field.onChange} value={field.value} disabled={isLoading}>
            <SelectTrigger
              id={name}
              className="rounded-lg border-indigo-900 bg-neutral-100 px-4 py-6 shadow-md focus-visible:ring-indigo-300"
            >
              {isLoading ? (
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Carregando salas...
                </span>
              ) : (
                <SelectValue placeholder={placeholder} />
              )}
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormField>
      )}
    />
  )
}

export default AppSelect
