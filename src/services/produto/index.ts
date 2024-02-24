import axios from "axios";
import { DoDataProdutoDetalheRequest } from "./schemas/doDataProdutoDetalheRequest";
import { urlApi } from "../../constants/urlApi";
import { ProdutoListResponse } from "./schemas/ProdutoListResponse";
const url = urlApi;

async function doDataProdutoDetalhe({proId}: DoDataProdutoDetalheRequest){
    const response = await axios.get<ProdutoListResponse>(
        `${url}api/produtos/geral/${proId}`
    )

    return response.data
}

export const ProdutoApi = {
    doDataProdutoDetalhe
}