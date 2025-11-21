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
import { validarCEP } from "@/lib/utils";
//     /UTIL.       //

interface BuscaCepProps {
    setLocalidade: (data: any) => void;
    setLoading: (loading: boolean) => void;
}

export default function BuscaCep({ setLocalidade, setLoading }: BuscaCepProps) {

    //      ESTADOS.        //
    const [cep, setCep] = useState("");
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

    const maskCep = (v: string) => {
        v = v.replace(/\D/g, "");   // remove tudo que não é número
        v = v.slice(0, 8);          // limita a 8 dígitos
        if (v.length > 5) {
            v = v.replace(/^(\d{5})(\d)/, "$1-$2"); // aplica máscara 00000-000
        }
        return v;
    };

    const eventoBlur = (e: any) => {
        setCep(maskCep(e.target.value.trim()));
    };

    const changeForm = (e: any) => {
        setCep(maskCep(e.target.value.trim()));
    };

    const formSubmit = async (e: any) => {
        e.preventDefault();

        setFormLoad(true);
        setLoading(true);
        setLocalidade(null);

        try {
            if (!validarCEP(cep)) {
                formAlert('Alerta', 'CEP inválido, verifique o campo e tente novamente.');

                setFormLoad(false);
                setLoading(false);
                return false;
            }

            const cepLimpo = cep.replace(/\D/g, "");
            const consulta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`, {
                method: 'GET'
            });

            if (!consulta.ok) {
                const contentType = consulta.headers.get('content-type');

                let erro = null;
                let erroMsg = 'Erro';
                let erroDados;

                if (contentType && contentType.includes('application/json')) {
                    erro = await consulta.json();
                    erroDados = erro.message || 'Erro ao consultar Cep.';
                } else {
                    erro = await consulta.text();
                    erroDados = 'Houve um erro inesperado, verifique o console para mais informações.';
                }
                console.error(erro);
                formAlert(erroMsg, erroDados);

                setFormLoad(false);
                setLoading(false);
                return false;
            }

            const resultado = await consulta.json();
            setLocalidade(resultado);

            setFormLoad(false);
            setLoading(false);
            return true;
        } catch (e) {
            console.error(e);

            e instanceof TypeError && e.message === 'Failed to fetch' ?
                formAlert('Erro de Conexão', 'Não foi possível conectar ao servidor. Verifique sua internet ou tente novamente.') // ERROS DE REDE
                :
                formAlert('Erro', 'Houve um erro inesperado, verifique o console para mais informações.');

            setFormLoad(false);
            setLoading(false);
            return false;
        }
    };
    //     /FUNÇÕES.        //

    return (
        <>
            <form id="form-cep" onSubmit={formSubmit}>
                <InputGroup>
                    <InputGroupInput
                        id="cepInput"
                        name="cepInput"
                        placeholder="Digite o CEP"
                        value={cep}
                        onChange={changeForm}
                        onBlur={eventoBlur}
                        maxLength={9}
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
                Dados obtidos via API <a href="https://viacep.com.br/" target="_blank" rel="noopener noreferrer" className="underline">ViaCep</a>.
                <br />
                A geolocalização dos CEPs estão suscetíveis a erros.
            </span>

        </>
    );
}