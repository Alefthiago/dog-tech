"use client";

import { useState } from "react";
import BuscaCep from "@/components/ui/personalizados/forms/busca-cep";
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

import { Copy, CopyCheckIcon } from "lucide-react";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Skeleton } from "@/components/ui/skeleton";
import { hasValue } from "@/lib/utils";

export default function FichaCep() {
    const [copied, copyToClipboard] = useCopyToClipboard();
    const copyField = (value: string) => {
        if (value) copyToClipboard(value);
    };

    const [localidade, setLocalidade] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    try {
        return (
            <section className="flex flex-col gap-5">
                <BuscaCep setLocalidade={setLocalidade} setLoading={setLoading} />

                {loading ? (
                    <div className="grid grid-cols-1 gap-4 mt-4 w-full">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                ) : localidade ? (
                    <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <ReadOnlyField
                            label="CEP"
                            value={hasValue(localidade.cep) ? localidade.cep : "Não Encontrado"}
                            onCopy={copyField}
                            copiedValue={copied}
                        />

                        <ReadOnlyField
                            label="Logradouro"
                            value={hasValue(localidade.logradouro) ? localidade.logradouro : "Não Encontrado"}
                            onCopy={copyField}
                            copiedValue={copied}
                        />

                        <ReadOnlyField
                            label="Complemento"
                            value={hasValue(localidade.complemento) ? localidade.complemento : "Não Encontrado"}
                            onCopy={copyField}
                            copiedValue={copied}
                        />

                        <ReadOnlyField
                            label="Bairro"
                            value={hasValue(localidade.bairro) ? localidade.bairro : "Não Encontrado"}
                            onCopy={copyField}
                            copiedValue={copied}
                        />

                        <ReadOnlyField
                            label="Cidade"
                            value={hasValue(localidade.localidade) ? localidade.localidade : "Não Encontrado"}
                            onCopy={copyField}
                            copiedValue={copied}
                        />

                        <ReadOnlyField
                            label="UF"
                            value={hasValue(localidade.uf) ? localidade.uf : "Não Encontrado"}
                            onCopy={copyField}
                            copiedValue={copied}
                        />

                        <ReadOnlyField
                            label="Estado"
                            value={hasValue(localidade.estado) ? localidade.estado : "Não Encontrado"}
                            onCopy={copyField}
                            copiedValue={copied}
                        />

                        <ReadOnlyField
                            label="Região"
                            value={hasValue(localidade.regiao) ? localidade.regiao : "Não Encontrado"}
                            onCopy={copyField}
                            copiedValue={copied}
                        />

                        <ReadOnlyField
                            label="Código IBGE"
                            value={hasValue(localidade.ibge) ? localidade.ibge : "Não Encontrado"}
                            onCopy={copyField}
                            copiedValue={copied}
                        />

                        <ReadOnlyField
                            label="Código GIA"
                            value={hasValue(localidade.gia) ? localidade.gia : "Não Encontrado"}
                            onCopy={copyField}
                            copiedValue={copied}
                        />

                        <ReadOnlyField
                            label="DDD"
                            value={hasValue(localidade.ddd) ? localidade.ddd : "Não Encontrado"}
                            onCopy={copyField}
                            copiedValue={copied}
                        />

                        <ReadOnlyField
                            label="Código SIAFI"
                            value={hasValue(localidade.siafi) ? localidade.siafi : "Não Encontrado"}
                            onCopy={copyField}
                            copiedValue={copied}
                        />
                    </FieldGroup>
                ) : (
                    <div className="text-center p-10 text-muted-foreground border rounded-md border-dashed">
                        Pesquise um CEP para visualizar os dados.
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