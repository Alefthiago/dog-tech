"use client";

import Image from "next/image";
import Link from "next/link";
import { House } from "lucide-react";

export default function Custom404() {
    return (
        <section className="min-h-screen flex items-center justify-center from-gray-50 to-gray-100 px-6">
            <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-10 animate-fadeIn">

                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide">
                        Erro 404
                    </p>

                    <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
                        Página não encontrada
                    </h1>

                    <p className="mt-4 max-w-md mx-auto">
                        A página que você está procurando não existe ou foi movida.
                    </p>
                </div>

                <Image
                    src="/404.svg"
                    alt="Erro 404"
                    width={350}
                    height={350}
                    className="drop-shadow-md"
                    priority
                />

                <Link
                    href="/"
                    className="mt-4 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all shadow-lg flex items-center gap-2"
                >
                    <House size={18} />
                    Voltar para a Página Inicial
                </Link>
            </div>
        </section>
    );
}
