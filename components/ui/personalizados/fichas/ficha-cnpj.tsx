"use client";

import { useState, useEffect } from "react";
import BuscaCnpj from "@/components/ui/personalizados/forms/busca-cnpj";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSet,
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

export default function FichaCnpj() {
    const [copied, copyToClipboard] = useCopyToClipboard();
    const copyField = (value: string) => {
        if (value) copyToClipboard(value);
    };

    const [empresa, setEmpresa] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const estab = empresa?.estabelecimento;

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
                            <FieldSet>
                                <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <ReadOnlyField label="Razão Social" value={empresa.razao_social} onCopy={copyField} copiedValue={copied} />
                                    <ReadOnlyField label="CNPJ Raiz" value={empresa.cnpj_raiz} onCopy={copyField} copiedValue={copied} />
                                    <ReadOnlyField label="Natureza Jurídica" value={empresa.natureza_juridica?.descricao} onCopy={copyField} copiedValue={copied} />
                                    <ReadOnlyField
                                        label="Capital Social"
                                        value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(empresa.capital_social))}
                                        onCopy={copyField}
                                        copiedValue={copied}
                                    />
                                </FieldGroup>
                            </FieldSet>
                        </AccordionContent>
                    </AccordionItem>

                    {/* ---------------- ESTABELECIMENTO ---------------- */}
                    <AccordionItem value="estabelecimento">
                        <AccordionTrigger>Estabelecimento</AccordionTrigger>
                        <AccordionContent>
                            <FieldSet>
                                <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <ReadOnlyField label="Nome Fantasia" value={estab.nome_fantasia || "-"} onCopy={copyField} copiedValue={copied} />
                                    <ReadOnlyField
                                        label="CNPJ Completo"
                                        value={estab.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}
                                        onCopy={copyField}
                                        copiedValue={copied}
                                    />
                                    <ReadOnlyField label="Situação Cadastral" value={estab.situacao_cadastral} onCopy={copyField} copiedValue={copied} />
                                    <ReadOnlyField
                                        label="Início da Atividade"
                                        value={estab.data_inicio_atividade?.split('-').reverse().join('/')}
                                        onCopy={copyField}
                                        copiedValue={copied}
                                    />
                                    <ReadOnlyField label="Simples Nacional" value={empresa.simples.simples} onCopy={copyField} copiedValue={copied} />
                                    <ReadOnlyField label="MEI" value={empresa.simples.mei} onCopy={copyField} copiedValue={copied} />
                                </FieldGroup>
                            </FieldSet>
                        </AccordionContent>
                    </AccordionItem>

                    {/* ---------------- ENDEREÇO ---------------- */}
                    <AccordionItem value="endereco">
                        <AccordionTrigger>Endereço</AccordionTrigger>
                        <AccordionContent>
                            <FieldSet>
                                <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <ReadOnlyField label="Logradouro" value={`${estab.tipo_logradouro} ${estab.logradouro}`} onCopy={copyField} copiedValue={copied} />
                                    <ReadOnlyField label="Número" value={estab.numero} onCopy={copyField} copiedValue={copied} />
                                    <ReadOnlyField label="Bairro" value={estab.bairro} onCopy={copyField} copiedValue={copied} />
                                    <ReadOnlyField
                                        label="CEP"
                                        value={estab.cep?.replace(/^(\d{5})(\d{3})/, "$1-$2")}
                                        onCopy={copyField}
                                        copiedValue={copied}
                                    />
                                    <ReadOnlyField label="Cidade" value={estab.cidade?.nome} onCopy={copyField} copiedValue={copied} />
                                    <ReadOnlyField label="UF" value={estab.estado?.sigla} onCopy={copyField} copiedValue={copied} />
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
                                    <ReadOnlyField label="Telefone" value={`${estab.ddd1 || ''} ${estab.telefone1 || ''}`} onCopy={copyField} copiedValue={copied} />
                                    <ReadOnlyField label="Email" value={estab.email} onCopy={copyField} copiedValue={copied} />
                                </FieldGroup>
                            </FieldSet>
                        </AccordionContent>
                    </AccordionItem>

                    {/* ---------------- ATIVIDADES ---------------- */}
                    <AccordionItem value="atividades">
                        <AccordionTrigger>Atividades Econômicas</AccordionTrigger>
                        <AccordionContent>
                            <FieldSet>
                                <FieldLabel className="font-semibold">Atividade Principal</FieldLabel>
                                <div className="border p-3 rounded-md bg-muted/30 mb-4 text-sm">
                                    {estab.atividade_principal?.id} - {estab.atividade_principal?.descricao}
                                </div>

                                <FieldLabel className="font-semibold mb-2">Atividades Secundárias</FieldLabel>
                                <ul className="space-y-2">
                                    {estab.atividades_secundarias?.map((a: any) => (
                                        <li key={a.id} className="border p-2 rounded-md bg-muted/20 text-sm">
                                            <strong>{a.subclasse}</strong> — {a.descricao}
                                        </li>
                                    ))}
                                </ul>
                            </FieldSet>
                        </AccordionContent>
                    </AccordionItem>

                    {/* ---------------- SÓCIOS ---------------- */}
                    {empresa.socios && (
                        <AccordionItem value="socios">
                            <AccordionTrigger>Sócios</AccordionTrigger>
                            <AccordionContent>
                                {empresa.socios.map((s: any, i: number) => (
                                    <FieldSet key={i} className="mb-4 border-b pb-4 last:border-0">
                                        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <ReadOnlyField label="Nome" value={s.nome} onCopy={copyField} copiedValue={copied} />
                                            <ReadOnlyField label="Qualificação" value={s.qualificacao_socio?.descricao} onCopy={copyField} copiedValue={copied} />
                                        </FieldGroup>
                                    </FieldSet>
                                ))}
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
}

function ReadOnlyField({ label, value, onCopy, copiedValue }: any) {
    const displayValue = value || "-";
    return (
        <Field>
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