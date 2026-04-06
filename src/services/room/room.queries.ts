import { useQuery } from "@tanstack/react-query";
import { getSummaryRooms } from "./room.service"

export function useRooms() {
  return useQuery({
    queryKey: ["summary-room"],
    queryFn: () => getSummaryRooms(),
  });
}