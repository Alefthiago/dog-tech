"use client";

import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { CustomTrigger } from "@/components/ui/personalizados/layout/custom-trigger";

export default function HeaderCustom() {
    const pathname = usePathname();

    let routeNome = pathname.split("/").filter(Boolean).pop() || "Home";

    if (routeNome === "consultaCnpj" || routeNome === "Home") {
        routeNome = "Consulta de CNPJ";
    } else if (routeNome === "consultaCep") {
        routeNome = "Consulta de CEP";
    } else {
        routeNome = '';
    }

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <CustomTrigger />
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                />
                <h4 className="font-semibold">
                    {routeNome}
                </h4>
            </div>
        </header>
    );
}
