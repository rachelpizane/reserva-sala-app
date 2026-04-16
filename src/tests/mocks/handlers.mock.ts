import { BASE_URL } from "@/constants/api-config"
import {
  addDaysToDateFormatted,
  formatDate,
  getFormattedWeekStart,
  getTodayDate,
} from "@/utils/date"
import { http, HttpResponse } from "msw"

export function apiUrl(path: string) {
  return new URL(path, BASE_URL).href
}

export const handlers = [
  http.post(apiUrl("/reservas"), async ({ request }) => {
    const data = await request.json()
    return HttpResponse.json(
      {
        id: "4bfa0c79-d5ea-4bce-aaec-f87bfb2318de",
        data,
      },
      { status: 201 }
    )
  }),
  http.get(apiUrl("/reservas/:id"), ({ params }) => {
    const { id } = params

    return HttpResponse.json({
      id,
      inicio: "2026-04-14T09:00:00",
      fim: "2026-04-14T10:00:00",
      organizador: "João da Silva",
      sala: {
        id: "21181886-5cb3-49e5-943b-9582154c3b68",
        nome: "Sala de Reunião 1",
        capacidade: 10,
        localizacao: "Andar 2, Ala B",
        descricao: "Sala equipada com projetor e ar-condicionado.",
      },
    })
  }),
  http.post(apiUrl("/salas"), async ({ request }) => {
    const data = await request.json()
    return HttpResponse.json(
      {
        id: "4bfa0c79-d5ea-4bce-aaec-f87bfb2318de",
        data,
      },
      { status: 201 }
    )
  }),
  http.get(apiUrl("/salas"), () => {
    return HttpResponse.json([
      {
        id: "21181886-5cb3-49e5-943b-9582154c3b68",
        nome: "Sala de Reunião 1",
        capacidade: 10,
      },
      {
        id: "07a0631e-c440-412f-ad41-a1adac35d275",
        nome: "Auditório",
        capacidade: "200",
      },
    ])
  }),
  http.get(apiUrl("/agendas"), ({ request }) => {
    const url = new URL(request.url)
    const data = url.searchParams.get("data") ?? formatDate(getTodayDate())
    const dataInicioSemana = getFormattedWeekStart(data)
    const dataFinalSemana = addDaysToDateFormatted(dataInicioSemana, 6)

    return HttpResponse.json({
      dataInicioSemana,
      dataFinalSemana,
      dataProximaSemana: addDaysToDateFormatted(dataInicioSemana, 7),
      dataAnteriorSemana: addDaysToDateFormatted(dataInicioSemana, -7),
      temProxima: true,
      temAnterior: true,
      agendasDiarias: [
        {
          data,
          reservas: [
            {
              id: "50e10c4c-4ea9-4eee-8ccf-32ebef99ef4c",
              horaInicio: "09:00",
              horaFim: "10:00",
              nomeSala: "Sala de Reunião 1",
            },
          ],
        },
      ],
    })
  }),
]
