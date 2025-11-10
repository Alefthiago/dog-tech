"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SidebarMenu } from "@/components/ui/sidebar";

export function TeamSwitcher() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Depois que o componente monta no client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Durante SSR e primeira render: sempre Skeleton
  if (!mounted) {
    return (
      <SidebarMenu className="items-center">
        <Skeleton className="h-12 w-12 rounded-full" />
      </SidebarMenu>
    );
  }

  const logo = resolvedTheme === "dark" ? "logoBranco.svg" : "logoPreto.svg";

  return (
    <SidebarMenu className="items-center">
      <Image
        src={logo}
        width={50}
        height={50}
        alt="logo"
        priority
      />
    </SidebarMenu>
  );
}
