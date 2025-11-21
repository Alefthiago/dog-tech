import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export function validaCnpj(cnpj: string) {
    cnpj = cnpj.replace(/\D/g, "");

    if (cnpj.length !== 14) return false;

    if (/^(\d)\1+$/.test(cnpj)) return false;

    const calcDV = (cnpj: string, length: number) => {
        let soma = 0;
        let pos = length - 7;

        for (let i = length; i >= 1; i--) {
            soma += Number(cnpj[length - i]) * pos--;
            if (pos < 2) pos = 9;
        }

        const resultado = soma % 11;
        return resultado < 2 ? 0 : 11 - resultado;
    };

    const dv1 = calcDV(cnpj, 12);
    const dv2 = calcDV(cnpj, 13);

    return dv1 === Number(cnpj[12]) && dv2 === Number(cnpj[13]);
}
export function validarCEP(cep: string) {
    return /^\d{5}-?\d{3}$/.test(cep);
}

export function hasValue(v: any) {
    return (
        v !== undefined &&
        v !== null &&
        v !== "" &&
        v !== "-" &&
        !(typeof v === "object" && Object.keys(v).length === 0)
    );
}