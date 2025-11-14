'use client'
import {
    SearchIcon,
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import {
    InputGroup,
    InputGroupAddon,
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


export default function BuscaCnpj() {
    const [cnpj, setCnpj] = useState("");
    const [loadForm, setLoadForm] = useState(false);

    const [open, setOpen] = useState(false);
    const [formMsg, setFormMsg] = useState("");
    const [formTitulo, setFormTitulo] = useState("");

    const formAlert = (titulo: string, msg: string) => {
        setFormMsg(msg);
        setFormTitulo(titulo);
        setOpen(true);
    }

    const maskCnpj = (v: string) => {
        v = v.replace(/\D/g, "");
        v = v.slice(0, 14);

        if (v.length >= 3)
            v = v.replace(/^(\d{2})(\d)/, "$1.$2");

        if (v.length >= 6)
            v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");

        if (v.length >= 9)
            v = v.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4");

        if (v.length >= 13)
            v = v.replace(/(\d{4})(\d{2})$/, "$1-$2");

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
        setLoadForm(true);
        try {
            if (!validaCnpj(cnpj)) {
                formAlert('Alerta', 'CNPJ inválido, verifique o campo e tente novamente');
                setLoadForm(false);
                return false;
            }

            const consulta = await fetch(`https://publica.cnpj.ws/cnpj/${cnpj.replace(/\D/g, "")}`, {
                method: 'GET'
            });

            if (!consulta.ok) {
                const contentType = consulta.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const erro: {
                        status: number;
                        titulo: string;
                        detalhes: string;
                        validacao: []
                    } = await consulta.json();
                    formAlert(erro.titulo, erro.detalhes)
                    console.error(erro);
                } else {
                    const erroText = await consulta.text();
                    formAlert('Erro', 'Houve um erro inpesrado, verifique o console para detalhes');
                    console.error(erroText);
                }

                setLoadForm(false);
                return false;
            }


        } catch (e) {
            
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
                        disabled={loadForm}
                    />
                    <InputGroupAddon>
                        {loadForm ?
                            <Spinner />
                            :
                            <SearchIcon />
                        }
                    </InputGroupAddon>
                </InputGroup>
            </form>

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent className="border-orange-300 border-3">
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
        </>
    );
}
