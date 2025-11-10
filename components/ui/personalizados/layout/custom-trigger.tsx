"use client"
import { ModeToggle } from "@/components/mode-toggle";
import { useSidebar } from "@/components/ui/sidebar"
import { PanelLeftOpen, PanelLeftClose } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CustomTrigger() {
    const { open, toggleSidebar, isMobile } = useSidebar()

    return (
        <>
            <Button
                onClick={toggleSidebar}
                variant="ghost"
                className="cursor-pointer w-30"
            >
                {!isMobile && open ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}

                {/* BOTÃO NO DESKTOP */}
                {!isMobile && <span>{open ? "Fechar Menu" : "Abrir Menu"}</span>}
                {/* BOTÃO NO DESKTOP */}

                {/* BOTÃO NO MOBILE */}
                {isMobile && <span>Abrir Menu</span>}
                {/* BOTÃO NO MOBILE */}
            </Button>
            <ModeToggle />
        </>
    )
};