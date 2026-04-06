import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ChevronDownIcon } from "lucide-react"
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form"
import FormField from "../form-field/form-field"

interface DatePickerProps<T extends FieldValues> {
  label: string
  name: Path<T>
  required?: boolean
}

function AppDatePicker<T extends FieldValues>({
  label,
  name,
  required,
}: DatePickerProps<T>) {
  const { control } = useFormContext()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

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
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id={name}
                variant="outline"
                data-empty={!field.value}
                className="justify-between rounded-lg border-indigo-900 bg-neutral-100 px-4 py-6 text-left font-normal shadow-md data-[empty=true]:text-muted-foreground"
              >
                {field.value
                  ? format(field.value, "dd/MM/yyyy", { locale: ptBR })
                  : "Selecione uma data"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                defaultMonth={field.value ?? today}
                disabled={{ before: today }}
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>
        </FormField>
      )}
    />
  )
}

export default AppDatePicker
