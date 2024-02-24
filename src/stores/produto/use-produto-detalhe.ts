import { useQuery } from "@tanstack/react-query"
import { ProdutoApi } from "../../services/produto"

interface PropsUseProdutoDetalhe {
    proId: string
}

export function useProdutoDetalhe({proId}: PropsUseProdutoDetalhe){
    const query = useQuery({
        queryKey: ["produto", {proId}],
        queryFn: () => ProdutoApi.doDataProdutoDetalhe({proId})
    })

    return query
}