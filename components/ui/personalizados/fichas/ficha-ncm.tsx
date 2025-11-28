"use client";

import { useState } from "react";
import BuscaNcm from "@/components/ui/personalizados/forms/busca-ncm";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Copy, CopyCheckIcon, BadgeCheckIcon, BadgeAlert } from "lucide-react";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Skeleton } from "@/components/ui/skeleton";
import { hasValue } from "@/lib/utils";
import { Badge } from "@/components/ui/badge"

export default function FichaNcm() {
    const [copied, copyToClipboard] = useCopyToClipboard();
    const copyField = (value: string) => {
        if (value) copyToClipboard(value);
    };

    const [ncm, setNcm] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    try {
        return (
            <section className="flex flex-col gap-5">
                <BuscaNcm setNcm={setNcm} setLoading={setLoading} />

                {loading ? (
                    <div className="grid grid-cols-1 gap-4 mt-4 w-full">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                ) : ncm ? (
                    <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {/* <Badge
                            variant="secondary"
                            className={`${ncm.data_fim === "9999-12-31" ? ' bg-green-500' : 'bg-red-500'} text-white`}
                        >
                            {ncm.data_fim === "9999-12-31" ?
                                (
                                    <>
                                        <BadgeCheckIcon />
                                        Ativo
                                    </>

                                )
                                :
                                (
                                    <>
                                        <BadgeAlert />
                                        Inativo
                                    </>
                                )
                            }
                        </Badge> */}

                        <ReadOnlyField
                            label="Descrição"
                            value={hasValue(ncm.descricao) ? ncm.descricao : "Não Encontrado"}
                            onCopy={copyField}
                            copiedValue={copied}
                            span={2}
                        />

                        <ReadOnlyField
                            label="Data de Início"
                            value={
                                hasValue(ncm.data_inicio)
                                    ? ncm.data_inicio.split('-').reverse().join('/')
                                    : "Não Encontrado"
                            }
                            onCopy={copyField}
                            copiedValue={copied}
                        />

                        <ReadOnlyField
                            label="Data de Fim"
                            value={
                                hasValue(ncm.data_fim)
                                    ? (ncm.data_fim === "9999-12-31"
                                        ? "Indeterminado"
                                        : ncm.data_fim.split('-').reverse().join('/'))
                                    : "Não Encontrado"
                            }
                            onCopy={copyField}
                            copiedValue={copied}
                        />

                        <ReadOnlyField
                            label="Código"
                            value={hasValue(ncm.codigo) ? ncm.codigo : "Não Encontrado"}
                            onCopy={copyField}
                            copiedValue={copied}
                        />


                        <ReadOnlyField
                            label="Tipo do Ato"
                            value={hasValue(ncm.tipo_ato) ? ncm.tipo_ato : "-"}
                            onCopy={copyField}
                            copiedValue={copied}
                        />

                        <ReadOnlyField
                            label="Número do Ato"
                            value={hasValue(ncm.numero_ato) ? ncm.numero_ato : "-"}
                            onCopy={copyField}
                            copiedValue={copied}
                        />

                        <ReadOnlyField
                            label="Ano do Ato"
                            value={hasValue(ncm.ano_ato) ? ncm.ano_ato : "-"}
                            onCopy={copyField}
                            copiedValue={copied}
                        />

                    </FieldGroup>
                ) : (
                    <div className="text-center p-10 text-muted-foreground border rounded-md border-dashed">
                        Pesquise um NCM para visualizar os dados.
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
    const spanClasses: Record<number, string> = {
        1: "col-span-1",
        2: "col-span-2",
        3: "col-span-3",
        4: "col-span-4",
    };

    return (
        <Field className={spanClasses[span] ?? "col-span-1"}>
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