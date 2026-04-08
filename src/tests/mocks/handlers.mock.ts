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
]
