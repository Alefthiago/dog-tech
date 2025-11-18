"use client";

import { useState, useEffect } from "react";
import BuscaCnpj from "@/components/ui/personalizados/forms/busca-cnpj";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSet,
    FieldLegend
} from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Copy, CopyCheckIcon } from "lucide-react";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Skeleton } from "@/components/ui/skeleton";
import { hasValue } from "@/lib/utils";

export default function FichaCnpj() {
    const [copied, copyToClipboard] = useCopyToClipboard();
    const copyField = (value: string) => {
        if (value) copyToClipboard(value);
    };

    const [empresa, setEmpresa] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const estab = empresa?.estabelecimento;

    try {
        return (
            <section className="flex flex-col gap-5">
                <BuscaCnpj setEmpresa={setEmpresa} setLoading={setLoading} />

                {loading ? (
                    <div className="grid grid-cols-1 gap-4 mt-4 w-full">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                ) : empresa && estab ? (
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full"
                        defaultValue="empresa"
                    >
                        {/* ---------------- EMPRESA ---------------- */}
                        <AccordionItem value="empresa">
                            <AccordionTrigger>Empresa</AccordionTrigger>
                            <AccordionContent>
                                <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <ReadOnlyField label="Razão Social"
                                        value={hasValue(empresa.razao_social) ? empresa.razao_social : 'Não Encontrado'}
                                        onCopy={copyField}
                                        copiedValue={copied}
                                    />
                                    <ReadOnlyField label="CNPJ Raiz"
                                        value={hasValue(empresa.cnpj_raiz) ? empresa.cnpj_raiz : 'Não Encontrado'}
                                        onCopy={copyField}
                                        copiedValue={copied}
                                    />
                                    <ReadOnlyField
                                        label="Natureza Jurídica"
                                        value={hasValue(empresa.natureza_juridica.descricao) ? empresa.natureza_juridica.descricao : 'Não Encontrado'}
                                        onCopy={copyField}
                                        copiedValue={copied}
                                    />
                                    <ReadOnlyField
                                        label="Capital Social"
                                        value={
                                            hasValue(empresa.capital_social) ?
                                                new Intl.NumberFormat('pt-BR', {
                                                    style: 'currency',
                                                    currency: 'BRL',
                                                }).format(Number(empresa.capital_social)) :
                                                'Não Encontrado'
                                        }
                                        onCopy={copyField}
                                        copiedValue={copied}
                                    />
                                </FieldGroup>
                            </AccordionContent>
                        </AccordionItem>
                        {/* ----------------/EMPRESA ---------------- */}


                        {/* ---------------- ESTABELECIMENTO ---------------- */}
                        <AccordionItem value="estabelecimento">
                            <AccordionTrigger>Estabelecimento</AccordionTrigger>
                            <AccordionContent>
                                <FieldSet>
                                    <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <ReadOnlyField
                                            label="Nome Fantasia"
                                            value={hasValue(estab.nome_fantasia) ? estab.nome_fantasia : 'Não Encontrado'}
                                            onCopy={copyField}
                                            copiedValue={copied}
                                            span={2}
                                        />
                                        <ReadOnlyField
                                            label="Tipo"
                                            value={hasValue(estab.tipo) ? estab.tipo : 'Não Encontrado'}
                                            onCopy={copyField}
                                            copiedValue={copied}
                                        />
                                        <ReadOnlyField
                                            label="CNPJ Completo"
                                            value={estab.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}
                                            onCopy={copyField}
                                            copiedValue={copied}
                                        />
                                        <ReadOnlyField
                                            label="Situação Cadastral"
                                            value={hasValue(estab.situacao_cadastral) ? estab.situacao_cadastral : 'Não Encontrado'}
                                            onCopy={copyField}
                                            copiedValue={copied}
                                        />
                                        <ReadOnlyField
                                            label="Início da Atividade"
                                            value={hasValue(estab.data_inicio_atividade) ? estab.data_inicio_atividade.split('-').reverse().join('/') : 'Não Encontrado'}
                                            onCopy={copyField}
                                            copiedValue={copied}
                                        />

                                        <ReadOnlyField
                                            label="Simples Nacional"
                                            value={hasValue(empresa.simples) ? empresa.simples.simples : 'Não Encontrado'}
                                            onCopy={copyField}
                                            copiedValue={copied}
                                        />
                                        <ReadOnlyField
                                            label="MEI"
                                            value={hasValue(empresa.simples) ? empresa.simples.mei : 'Não Encontrado'}
                                            onCopy={copyField}
                                            copiedValue={copied}
                                        />
                                    </FieldGroup>
                                </FieldSet>
                            </AccordionContent>
                        </AccordionItem>
                        {/* ----------------/ESTABELECIMENTO ---------------- */}

                        {/* ---------------- INSCRIÇÕES ESTADUAIS ---------------- */}
                        <AccordionItem value="inscricoes-estaduais">
                            <AccordionTrigger>Inscrições Estaduais</AccordionTrigger>

                            <AccordionContent>
                                {estab?.inscricoes_estaduais?.length > 0 ? (
                                    estab.inscricoes_estaduais.map((ie: any, index: number) => (
                                        <FieldSet key={index} className="mt-6">
                                            <hr />
                                            <FieldLegend>
                                                {hasValue(ie.estado?.sigla) ? ie.estado.sigla : "-"}
                                                ({hasValue(ie.estado?.nome) ? ie.estado.nome : "Não Encontrado"})
                                            </FieldLegend>

                                            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 px-4">

                                                <ReadOnlyField
                                                    label="Inscrição Estadual"
                                                    value={
                                                        hasValue(ie.inscricao_estadual)
                                                            ? ie.inscricao_estadual
                                                            : "Não Encontrado"
                                                    }
                                                    onCopy={copyField}
                                                    copiedValue={copied}
                                                    span={2}
                                                />

                                                <ReadOnlyField
                                                    label="Ativa"
                                                    value={
                                                        hasValue(ie.ativo)
                                                            ? (ie.ativo ? "Ativa" : "Inativa")
                                                            : "Não Encontrado"
                                                    }
                                                    onCopy={copyField}
                                                    copiedValue={copied}
                                                />

                                                <ReadOnlyField
                                                    label="Atualizado em"
                                                    value={
                                                        hasValue(ie.atualizado_em)
                                                            ? new Date(ie.atualizado_em).toLocaleDateString("pt-BR")
                                                            : "Não Encontrado"
                                                    }
                                                    onCopy={copyField}
                                                    copiedValue={copied}
                                                />

                                            </FieldGroup>
                                        </FieldSet>
                                    ))
                                ) : (
                                    <div className="text-center p-10 text-muted-foreground border rounded-md border-dashed">
                                        Nenhuma inscrição estadual encontrada.
                                    </div>
                                )}
                            </AccordionContent>
                        </AccordionItem>

                        {/* ---------------- ENDEREÇO ---------------- */}
                        <AccordionItem value="endereco">
                            <AccordionTrigger>Endereço</AccordionTrigger>
                            <AccordionContent>
                                <FieldSet>
                                    <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <ReadOnlyField
                                            label="Logradouro"
                                            value={
                                                hasValue(estab.tipo_logradouro) || hasValue(estab.logradouro)
                                                    ? `${estab.tipo_logradouro || ""} ${estab.logradouro || ""}`.trim()
                                                    : "Não Encontrado"
                                            }
                                            onCopy={copyField}
                                            copiedValue={copied}
                                        />

                                        <ReadOnlyField
                                            label="Número"
                                            value={hasValue(estab.numero) ? estab.numero : "Não Encontrado"}
                                            onCopy={copyField}
                                            copiedValue={copied}
                                        />

                                        <ReadOnlyField
                                            label="Bairro"
                                            value={hasValue(estab.bairro) ? estab.bairro : "Não Encontrado"}
                                            onCopy={copyField}
                                            copiedValue={copied}
                                        />

                                        <ReadOnlyField
                                            label="CEP"
                                            value={
                                                hasValue(estab.cep)
                                                    ? estab.cep.replace(/^(\d{5})(\d{3})/, "$1-$2")
                                                    : "Não Encontrado"
                                            }
                                            onCopy={copyField}
                                            copiedValue={copied}
                                        />

                                        <ReadOnlyField
                                            label="Cidade"
                                            value={
                                                hasValue(estab.cidade?.nome)
                                                    ? estab.cidade.nome
                                                    : "Não Encontrado"
                                            }
                                            onCopy={copyField}
                                            copiedValue={copied}
                                        />

                                        <ReadOnlyField
                                            label="UF"
                                            value={
                                                hasValue(estab.estado?.sigla)
                                                    ? estab.estado.sigla
                                                    : "Não Encontrado"
                                            }
                                            onCopy={copyField}
                                            copiedValue={copied}
                                        />
                                    </FieldGroup>
                                </FieldSet>
                            </AccordionContent>
                        </AccordionItem>

                        {/* ---------------- CONTATO ---------------- */}
                        <AccordionItem value="contato">
                            <AccordionTrigger>Contato</AccordionTrigger>
                            <AccordionContent>
                                <FieldSet>
                                    <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <ReadOnlyField
                                            label="Telefone"
                                            value={
                                                hasValue(estab.ddd1) || hasValue(estab.telefone1)
                                                    ? `${estab.ddd1 || ""} ${estab.telefone1 || ""}`.trim()
                                                    : "Não Encontrado"
                                            }
                                            onCopy={copyField}
                                            copiedValue={copied}
                                        />

                                        <ReadOnlyField
                                            label="Email"
                                            value={hasValue(estab.email) ? estab.email : "Não Encontrado"}
                                            onCopy={copyField}
                                            copiedValue={copied}
                                        />
                                    </FieldGroup>
                                </FieldSet>
                            </AccordionContent>
                        </AccordionItem>

                        {/* ---------------- ATIVIDADES ---------------- */}
                        <AccordionItem value="atividades">
                            <AccordionTrigger>Atividades Econômicas</AccordionTrigger>
                            <AccordionContent>
                                <FieldSet>
                                    {/* ---- Atividade Principal ---- */}
                                    <FieldLabel className="font-semibold">Atividade Principal</FieldLabel>

                                    <div className="border p-3 rounded-md bg-muted/30 mb-4 text-sm">
                                        {hasValue(estab.atividade_principal?.id) || hasValue(estab.atividade_principal?.descricao)
                                            ? `${estab.atividade_principal?.id || ""} - ${estab.atividade_principal?.descricao || ""}`.trim()
                                            : "Não Encontrado"}
                                    </div>

                                    {/* ---- Atividades Secundárias ---- */}
                                    <FieldLabel className="font-semibold mb-2">Atividades Secundárias</FieldLabel>

                                    {Array.isArray(estab.atividades_secundarias) && estab.atividades_secundarias.length > 0 ? (
                                        <ul className="space-y-2">
                                            {estab.atividades_secundarias.map((a: any) => (
                                                <li key={a.id} className="border p-2 rounded-md bg-muted/20 text-sm">
                                                    <strong>{hasValue(a.subclasse) ? a.subclasse : "-"}</strong> —{" "}
                                                    {hasValue(a.descricao) ? a.descricao : "Sem descrição"}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="text-center p-10 text-muted-foreground border rounded-md border-dashed">
                                            Nenhuma atividade secundária encontrada.
                                        </div>
                                    )}
                                </FieldSet>
                            </AccordionContent>
                        </AccordionItem>

                        {/* ---------------- SÓCIOS ---------------- */}
                        {empresa.socios && (
                            <AccordionItem value="socios">
                                <AccordionTrigger>Sócios</AccordionTrigger>
                                <AccordionContent>
                                    {Array.isArray(empresa.socios) && empresa.socios.length > 0 ? (
                                        empresa.socios.map((s: any, i: number) => (
                                            <FieldSet key={i} className="mb-4 border-b pb-4 last:border-0">
                                                <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                                    <ReadOnlyField
                                                        label="Nome"
                                                        value={hasValue(s.nome) ? s.nome : "Não Encontrado"}
                                                        onCopy={copyField}
                                                        copiedValue={copied}
                                                    />

                                                    <ReadOnlyField
                                                        label="Qualificação"
                                                        value={
                                                            hasValue(s.qualificacao_socio?.descricao)
                                                                ? s.qualificacao_socio.descricao
                                                                : "Não Encontrado"
                                                        }
                                                        onCopy={copyField}
                                                        copiedValue={copied}
                                                    />

                                                </FieldGroup>
                                            </FieldSet>
                                        ))
                                    ) : (
                                        <div className="text-center p-10 text-muted-foreground border rounded-md border-dashed">
                                            Nenhum sócio encontrado.
                                        </div>
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                        )}
                    </Accordion>
                ) : (
                    <div className="text-center p-10 text-muted-foreground border rounded-md border-dashed">
                        Pesquise um CNPJ para visualizar os dados.
                    </div>
                )}
            </section>
        );
    } catch (e) {
        return (
            <div className="text-center p-10 text-muted-foreground border rounded-md border-dashed">
                Ocorreu um erro ao carregar estas informações. Por favor, recarregue a página e tente novamente.
            </div>
        );
    };
}

function ReadOnlyField({ label, value, onCopy, copiedValue, span = 1 }: any) {
    const displayValue = value || "-";
    return (
        <Field className={`col-span-${span}`}>
            <FieldLabel>{label}</FieldLabel>
            <InputGroup>
                <InputGroupInput value={displayValue} readOnly />
                <InputGroupAddon>
                    <InputGroupButton onClick={() => onCopy(String(displayValue))} size="icon-xs">
                        {copiedValue === String(displayValue) ? (
                            <CopyCheckIcon className="text-green-500 w-4 h-4" />
                        ) : (
                            <Copy className="w-4 h-4" />
                        )}
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
        </Field>
    );
}