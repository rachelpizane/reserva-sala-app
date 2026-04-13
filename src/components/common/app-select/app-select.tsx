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
import { Loader2 } from "lucide-react"
import type { Option } from "@/types/option.types"

interface SelectProps<T extends FieldValues> {
  label: string
  name: Path<T>
  placeholder: string
  required?: boolean
  isLoading: boolean
  options: Option[]
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
          <Select
            onValueChange={field.onChange}
            onOpenChange={(open) => {
              if (!open) {
                field.onBlur()
              }
            }}
            value={field.value}
            disabled={isLoading}
          >
            <SelectTrigger
              id={name}
              ref={field.ref}
              aria-invalid={!!fieldState.error}
              data-testid={`select-${name}`}
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
                  <SelectItem
                    data-testid={`select-item-${name}`}
                    key={option.value}
                    value={option.value}
                  >
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
