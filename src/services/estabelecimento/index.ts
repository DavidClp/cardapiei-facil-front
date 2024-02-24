import axios from "axios";
import { doDataEstabelecimentoDetalheRequest } from "./schemas/doDataEstabelecimentoDetalheResquest";
import { EstabelecimentoFullDetalheResponse } from "./schemas/EstabelecimentoFullDetalheResponse";
import { urlApi } from "../../constants/urlApi";

const url = urlApi;

async function doDataEstabelecimentoFullDetalhe({
  estUrl,
}: doDataEstabelecimentoDetalheRequest) {
  const response = await axios.get<EstabelecimentoFullDetalheResponse>(
    `${url}api/estabelecimentos/${estUrl}`
  );

  return response.data;
}

export const EstabelecimentoApi = {
    doDataEstabelecimentoFullDetalhe
}
