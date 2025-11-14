import FichaCnpj from "@/components/ui/personalizados/fichas/ficha-cnpj";
import BuscaCnpj from "@/components/ui/personalizados/forms/busca-cnpj";

export default function PageCnpj() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <BuscaCnpj />
      <FichaCnpj />
    </div>
  )
}