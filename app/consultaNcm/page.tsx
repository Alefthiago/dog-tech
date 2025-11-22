import FichaNcm from "@/components/ui/personalizados/fichas/ficha-ncm";
import Image from "next/image";

export default function PageNcm() {
  return (
    // <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
    //   <FichaNcm />
    // </div>

    <div className="container px-6 py-20 mx-auto">
      <div className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:gap-20">

        {/* Texto */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-4xl font-extrabold leading-tight lg:text-5xl">
            Estamos construindo algo incrível! 🚧
          </h1>

          <p className="mt-6 text-lg">
            Esta página ainda não está pronta, mas novidades incríveis estão a caminho.
            Fique de olho!
          </p>

          <div className="mt-8">
            <span className="inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 text-white text-lg font-semibold shadow hover:bg-blue-700 transition-all">
              Em breve novidades!
            </span>
          </div>
        </div>

        {/* Imagem */}
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <Image
            src="undraw_under-construction_c2y1.svg"
            alt="Página em construção"
            width={600}
            height={600}
            className="drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  )
}