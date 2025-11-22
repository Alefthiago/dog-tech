"use client"

import * as React from "react"
import {
  Frame,
  ShoppingBag,
  PieChart,
  Building2,
  Map,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "CNPJ",
      url: "consultaCnpj",
      icon: Building2
    },
    {
      title: "CEP",
      url: "consultaCep",
      icon: Map
    },
    {
      title: "NCM",
      url: "consultaNcm",
      icon: ShoppingBag
    },
  ],
  projects: [
    {
      name: "Disponibilidade da NFE",
      url: "https://www.nfe.fazenda.gov.br/portal/disponibilidade.aspx",
      icon: Frame,
    },
    {
      name: "Disponibilidade NFCE",
      url: "https://nfce.sefaz.se.gov.br/portal/painelMonitor.jsp",
      icon: PieChart,
    },
    {
      name: "Portal MDFE",
      url: "https://dfe-portal.svrs.rs.gov.br/Mdfe",
      icon: Map,
    },
    {
      name: "Download NFCE XML",
      url: "https://dfe-portal.svrs.rs.gov.br/Nfce",
      icon: Frame,
    },
    {
      name: "Consulta Sintegra",
      url: "http://www.sintegra.gov.br/",
      icon: PieChart,
    },
    {
      name: "Sefaz PE",
      url: "https://www.sefaz.pe.gov.br/SitePages/Home.aspx",
      icon: Map,
    },
    {
      name: "Consulta Simples Nacional",
      url: "https://www8.receita.fazenda.gov.br/simplesnacional/aplicacoes.aspx?id=21",
      icon: PieChart,
    },
    {
      name: "Tabela de CFOP",
      url: "https://www.sefaz.pe.gov.br/Legislacao/Tributaria/Documents/Legislacao/Tabelas/CFOP.htm",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher /> {/* LOGO */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />

        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
