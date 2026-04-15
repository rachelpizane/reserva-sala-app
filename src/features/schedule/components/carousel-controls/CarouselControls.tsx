import { Loader2 } from "lucide-react"
import { CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface CarouselControlsProps {
  isFetchingNextPage: boolean
}

export function CarouselControls({
  isFetchingNextPage,
}: CarouselControlsProps) {
  return (
    <div className="relative mb-2 flex items-center justify-center gap-6">
      <CarouselPrevious className="h-12 w-12 cursor-pointer bg-primary text-white shadow-md duration-300 hover:bg-indigo-800 hover:text-white disabled:bg-indigo-600 disabled:text-indigo-300" />

      <CarouselNext className="h-12 w-12 cursor-pointer bg-primary text-white shadow-md duration-300 hover:bg-indigo-800 hover:text-white disabled:bg-indigo-600 disabled:text-indigo-300" />

      {isFetchingNextPage && (
        <Loader2 className="absolute right-0 h-8 w-8 animate-spin" />
      )}
    </div>
  )
}
