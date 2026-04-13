import {
  adicionarDiasFormatado,
  formatarData,
  getDataHoje,
  retornarInicioSemanaFormatado,
} from "@/utils/date-time/date-time.utils"
import { http, HttpResponse } from "msw"

export const handlers = [
  http.post("*/reservas", async ({ request }) => {
    const data = await request.json()
    return HttpResponse.json(
      {
        id: "4bfa0c79-d5ea-4bce-aaec-f87bfb2318de",
        data,
      },
      { status: 201 }
    )
  }),
  http.get("*/salas", () => {
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
  http.get("*/agendas", ({ request }) => {
    const url = new URL(request.url)
    const data = url.searchParams.get("data") ?? formatarData(getDataHoje())
    const dataInicioSemana = retornarInicioSemanaFormatado(data)
    const dataFinalSemana = adicionarDiasFormatado(dataInicioSemana, 6)

    return HttpResponse.json({
      dataInicioSemana,
      dataFinalSemana,
      dataProximaSemana: adicionarDiasFormatado(dataInicioSemana, 7),
      dataAnteriorSemana: adicionarDiasFormatado(dataInicioSemana, -7),
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
