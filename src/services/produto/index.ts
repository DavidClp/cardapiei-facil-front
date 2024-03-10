import axios from "axios";
import { DoDataProdutoDetalheRequest } from "./schemas/doDataProdutoDetalheRequest";
import { urlApi } from "../../constants/urlApi";
import { ProdutoListResponse } from "./schemas/ProdutoListResponse";
import { CategoriaListResponse } from "./schemas/CategoriaListResponse";
import { DoDataCategoriasProdutoListRequest } from "./schemas/doDataCategoriasProdutoListRequest";
const url = urlApi;

async function doDataProdutoDetalhe({ proId }: DoDataProdutoDetalheRequest) {
  const response = await axios.get<ProdutoListResponse>(
    `${url}api/produtos/geral/${proId}`
  );

  return response.data;
}

async function doDataCategoriasProdutoList({
  estId,
}: DoDataCategoriasProdutoListRequest) {
  const response = await axios.get<CategoriaListResponse>(
    `${url}api/categorias/${estId}`,
    {
      headers: {
        token: sessionStorage.getItem("token"),
      },
    }
  );

  return response.data;
}

export const ProdutoApi = {
  doDataProdutoDetalhe,
  doDataCategoriasProdutoList,
};
