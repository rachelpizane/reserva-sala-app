import Title from "@/components/common/title/Title"
import { Button } from "@/components/ui/button"
import useAppNavigate from "@/hooks/app-navigate/useAppNavigate"
import { Frown } from "lucide-react"

function NotFound() {
  const { toHome } = useAppNavigate()

  return (
    <div className="flex flex-col items-center gap-8">
      <Title text="Página não encontrada" />
      <Frown size={56} strokeWidth={2.5} className="text-indigo-400" />
      <p className="text-center">
        A página que você tentou acessar não existe ou foi movida.
      </p>
      <Button className="cursor-pointer" variant="link" onClick={toHome}>
        Voltar para página inicial
      </Button>
    </div>
  )
}

export default NotFound
