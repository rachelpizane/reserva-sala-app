import { screen } from "@testing-library/react"
import AppDatePicker from "./AppDatePicker"
import {
  formatBrazilianDate,
  formatFullDateWithWeekday,
  getFirstDayOfNextMonth,
  getTodayDate,
} from "@/utils/date"
import { describe, expect, it } from "vitest"
import { renderWithReservationForm } from "@/tests/providers/render.utils"
import userEvent from "@testing-library/user-event"

describe(AppDatePicker.name, () => {
  it("deve renderizar o label e o botão", () => {
    renderWithReservationForm(<AppDatePicker label="Data" name="data" />)
    expect(screen.getByText("Data")).toBeInTheDocument()
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("deve exibir a data de hoje como valor do input", () => {
    const today = getTodayDate()
    renderWithReservationForm(<AppDatePicker label="Data" name="data" />)
    expect(screen.getByText(formatBrazilianDate(today))).toBeInTheDocument()
  })

  it("deve abrir o calendário ao clicar no botão", async () => {
    const user = userEvent.setup()

    renderWithReservationForm(<AppDatePicker label="Data" name="data" />)
    const datePickerButton = screen.getByTestId("datepicker-data")
    await user.click(datePickerButton)

    expect(screen.queryByRole("dialog")).toBeInTheDocument()
  })

  it("deve selecionar uma data", async () => {
    const user = userEvent.setup()
    const nextMonthDate = getFirstDayOfNextMonth()
    const label = formatFullDateWithWeekday(nextMonthDate)
    const result = formatBrazilianDate(nextMonthDate)

    renderWithReservationForm(<AppDatePicker label="Data" name="data" />)

    const datePickerButton = screen.getByTestId("datepicker-data")
    await user.click(datePickerButton)

    expect(await screen.findByRole("dialog")).toBeInTheDocument()

    await user.click(screen.getByLabelText("Go to the Next Month"))
    await user.click(await screen.findByLabelText(label))

    expect(await screen.findByText(result)).toBeInTheDocument()
  })
})
