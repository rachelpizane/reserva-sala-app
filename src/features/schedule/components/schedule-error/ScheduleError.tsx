import { HeartCrack } from "lucide-react"
import Title from "../../../../components/common/title/Title"

function ScheduleError() {
  return (
    <div className="my-6 flex flex-col items-center gap-2">
      <Title text="Agenda não encontrada" />
      <HeartCrack size={56} strokeWidth={2.5} className="text-indigo-400" />
      <p className="mt-4 text-center">
        A agenda que você tentou acessar não foi encontrada. Tente novamente
        mais tarde.
      </p>
    </div>
  )
}

export default ScheduleError
