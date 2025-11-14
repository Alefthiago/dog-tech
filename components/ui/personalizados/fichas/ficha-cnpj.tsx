"use client";

import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function FichaCnpj() {
    return (
        <FieldSet className="w-full">
            <FieldLegend>Dados da Empresa</FieldLegend>
            <FieldDescription>
                Informações obtidas através da consulta do CNPJ pela API publica.cnpj.ws, algumas informações pode esta desatualizadas.
            </FieldDescription>

            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                {/* Linha inteira */}
                {/* <div className="md:col-span-2"> */}
                <Field>
                    <FieldLabel>Razão Social</FieldLabel>
                    <Input value="EMPRESA FICTÍCIA LTDA" disabled />
                </Field>
                <Field>
                    <FieldLabel>Nome Fantasia</FieldLabel>
                    <Input value="MERCADO MODELO" disabled />
                </Field>
                {/* </div> */}

                {/* Meio a meio */}
                <Field>
                    <FieldLabel>CNPJ Raiz</FieldLabel>
                    <Input value="12.345.678/0001-99" disabled />
                </Field>

                <Field>
                    <FieldLabel>Incrição Estadual</FieldLabel>
                    <Input value="10/02/2010" disabled />
                </Field>

                <Field>
                    <FieldLabel>Utlima atualização</FieldLabel>
                    <Input value="10/02/2010" disabled />
                </Field>

                <Field>
                    <FieldLabel>Situação Cadastral</FieldLabel>
                    <Input value="ATIVA" disabled />
                </Field>

                {/* Linha inteira */}
                <div className="md:col-span-2">
                    <Field>
                        <FieldLabel>Atividade Principal (CNAE)</FieldLabel>
                        <Input value="47.11-3-02 - Comércio varejista" disabled />
                    </Field>
                </div>

                {/* Endereço */}
                <div className="md:col-span-2">
                    <Field>
                        <FieldLabel>Endereço Completo</FieldLabel>
                        <Input value="Rua das Flores, 123 - Centro" disabled />
                    </Field>
                </div>

                <Field>
                    <FieldLabel>Cidade</FieldLabel>
                    <Input value="São Paulo" disabled />
                </Field>

                <Field>
                    <FieldLabel>UF</FieldLabel>
                    <Input value="SP" disabled />
                </Field>

                <Field>
                    <FieldLabel>CEP</FieldLabel>
                    <Input value="01010-000" disabled />
                </Field>

                <Field>
                    <FieldLabel>Telefone</FieldLabel>
                    <Input value="(11) 99999-8888" disabled />
                </Field>

            </FieldGroup>
        </FieldSet>
    );
}
