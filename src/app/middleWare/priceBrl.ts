import { useCallback } from "react";

export function useFormatCurrency(){
    const formatCurrency = useCallback((value:number) =>{
        if(typeof value !=='number') return "R$ 0,00"
        return Intl.NumberFormat("pt-BR",{
            style:'currency',
            currency:"BRL",
            minimumFractionDigits:2,
            maximumFractionDigits:2,
        }).format(value)
    },[])

    return {formatCurrency}
}