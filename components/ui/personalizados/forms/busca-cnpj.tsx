'use client'
import { SearchIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton, // Certifique-se que este componente suporta type="submit" ou onClick manual
    InputGroupInput,
} from "@/components/ui/input-group";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useState } from "react";
import { validaCnpj } from "@/lib/utils";

interface BuscaCnpjProps {
    setEmpresa: (data: any) => void;
    setLoading: (loading: boolean) => void;
}

export default function BuscaCnpj({ setEmpresa, setLoading }: BuscaCnpjProps) {
    const [cnpj, setCnpj] = useState("");
    const [internalLoading, setInternalLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const [formMsg, setFormMsg] = useState("");
    const [formTitulo, setFormTitulo] = useState("");

    const formAlert = (titulo: string, msg: string) => {
        setFormMsg(msg);
        setFormTitulo(titulo);
        setOpen(true);
    };

    const maskCnpj = (v: string) => {
        v = v.replace(/\D/g, "");
        v = v.slice(0, 14);
        if (v.length >= 3) v = v.replace(/^(\d{2})(\d)/, "$1.$2");
        if (v.length >= 6) v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        if (v.length >= 9) v = v.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4");
        if (v.length >= 13) v = v.replace(/(\d{4})(\d{2})$/, "$1-$2");
        return v;
    };

    const changeForm = (e: any) => {
        setCnpj(maskCnpj(e.target.value));
    };

    const eventoBlur = (e: any) => {
        setCnpj(maskCnpj(e.target.value.trim()));
    };

    const formSubmit = async (e: any) => {
        e.preventDefault();

        setInternalLoading(true);
        setLoading(true);
        setEmpresa(null);

        try {
            if (!validaCnpj(cnpj)) {
                formAlert('Alerta', 'CNPJ inválido, verifique o campo e tente novamente');
                setInternalLoading(false);
                setLoading(false);
                return false;
            }

            const cleanCnpj = cnpj.replace(/\D/g, "");
            const consulta = await fetch(`https://publica.cnpj.ws/cnpj/${cleanCnpj}`, {
                method: 'GET'
            });

            if (!consulta.ok) {
                const contentType = consulta.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const erro = await consulta.json();
                    formAlert(erro.titulo || 'Erro', erro.detalhes || 'Erro ao consultar CNPJ');
                } else {
                    formAlert('Erro', 'Houve um erro inesperado (status ' + consulta.status + ')');
                }
                setEmpresa(null);
            } else {
                const resultado = await consulta.json();
                setEmpresa(resultado);
            }

        } catch (e) {
            console.error(e);
            formAlert('Erro de Conexão', 'Não foi possível conectar à API.');
            setEmpresa(null);
        } finally {
            setInternalLoading(false);
            setLoading(false);
        }
    };

    return (
        <>
            <form id="form-cnpj" onSubmit={formSubmit}>
                <InputGroup>
                    <InputGroupInput
                        id="cnpjInput"
                        name="cnpjInput"
                        placeholder="Digite o CNPJ"
                        value={cnpj}
                        onChange={changeForm}
                        onBlur={eventoBlur}
                        maxLength={18}
                        disabled={internalLoading}
                    />
                    <InputGroupAddon>
                        <InputGroupButton type="submit" disabled={internalLoading} className={`hover:cursor-pointer`}>
                            {internalLoading ? <Spinner /> : <SearchIcon />}
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </form>

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent className="border-orange-300 border-l-4">
                    <AlertDialogHeader>
                        <AlertDialogTitle>{formTitulo}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {formMsg}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Ok</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <span className="text-xs text-muted-foreground mt-2 block">
                Informações obtidas através da API <a href="https://developers.receitaws.com.br/" target="_blank" rel="noopener noreferrer" className="underline">receitaws</a> / public.cnpj.ws. <br />
                Verifique sempre a situação na SEFAZ.
            </span>
        </>
    );
}