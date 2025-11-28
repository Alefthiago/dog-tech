'use client'

//      COMPONENTES.        //
import { SearchIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
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
//     /COMPONENTES.        //

//      UTIL.       //
import { useState } from "react";
//     /UTIL.       //

interface BuscaNcmProps {
    setNcm: (data: any) => void;
    setLoading: (loading: boolean) => void;
}

export default function BuscaNcm({ setNcm, setLoading }: BuscaNcmProps) {

    //      ESTADOS.        //
    const [codigo, setCodigo] = useState("");
    const [formLoad, setFormLoad] = useState(false);

    const [open, setOpen] = useState(false);
    const [formMsg, setFormMsg] = useState("");
    const [formTitulo, setFormTitulo] = useState("");
    //     /ESTADOS.        //

    //      FUNÇÕES.        //
    const formAlert = (titulo: string, msg: string) => {
        setFormMsg(msg);
        setFormTitulo(titulo);
        setOpen(true);
    };

    const maskNcm = (value: string) => {
        return value
            .replace(/\D/g, "")
            .slice(0, 8)
            .replace(/^(\d{4})(\d)/, "$1.$2")
            .replace(/^(\d{4})\.(\d{2})(\d)/, "$1.$2.$3");
    };

    const eventoBlur = (e: any) => {
        setCodigo(e.target.value.trim());
    };

    const changeForm = (e: any) => {
        setCodigo(maskNcm(e.target.value));
    };

    const formSubmit = async (e: any) => {
        e.preventDefault();

        const ncmLimpo = codigo.replace(/\D/g, "");

        if (ncmLimpo.length !== 8) {
            formAlert("Formato Inválido", "O código NCM deve conter 8 dígitos.");
            return;
        }

        setFormLoad(true);
        setLoading(true);
        setNcm(null);

        try {
            const consulta = await fetch(`https://brasilapi.com.br/api/ncm/v1/${ncmLimpo}`, {
                method: 'GET'
            });

            if (!consulta.ok) {
                const contentType = consulta.headers.get('content-type');

                let erroMsg = 'Erro';
                let erroDados = 'Houve um erro inesperado.';

                if (contentType && contentType.includes('application/json')) {
                    const erro = await consulta.json();
                    erroMsg = 'Erro na busca'; 
                    erroDados = 'Código NCM não encontrado ou inválido.';
                } else {
                    erroDados = 'Houve um erro de conexão com a API.';
                }
                
                console.error("Erro API:", erroDados);
                formAlert(erroMsg, erroDados);

                setFormLoad(false);
                setLoading(false);
                return false;
            }

            const resultado = await consulta.json();
            setNcm(resultado);

            setFormLoad(false);
            setLoading(false);
            return true;
        } catch (e) {
            console.error(e);

            e instanceof TypeError && e.message === 'Failed to fetch' ?
                formAlert('Erro de Conexão', 'Não foi possível conectar ao servidor. Verifique sua internet ou tente novamente.') 
                :
                formAlert('Erro', 'Houve um erro inesperado ao processar sua solicitação.');

            setFormLoad(false);
            setLoading(false);
            return false;
        }
    };
    //     /FUNÇÕES.        //

    return (
        <>
            <form id="form-ncm" onSubmit={formSubmit}>
                <InputGroup>
                    <InputGroupInput
                        id="ncmInput"
                        name="ncmInput"
                        placeholder="Digite o NCM"
                        value={codigo}
                        onChange={changeForm}
                        onBlur={eventoBlur}
                        maxLength={10}
                        disabled={formLoad}
                    />
                    <InputGroupAddon>
                        <InputGroupButton type="submit" disabled={formLoad} className={`hover:cursor-pointer`}>
                            {formLoad ? <Spinner /> : <SearchIcon />}
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </form>

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent className="border-orange-300">
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
                Dados obtidos via <a href="https://brasilapi.com.br/docs#tag/NCM/paths/~1ncm~1v1~1%7Bcode%7D/get" target="_blank" rel="noopener noreferrer" className="underline">BrasilAPI</a>.
                <br />
                Certifique-se de que o código possui 8 dígitos.
            </span>
        </>
    );
}