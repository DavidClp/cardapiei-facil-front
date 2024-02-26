import axios from "axios";

import { urlApi } from "../../constants/urlApi";
import { ConfiguracaoEstabelecimentoResponse } from "./schemas/ConfiguracaoEstabelecimentoResponse";
import { doDataConfiguracaoEstabelecimentoRequest } from "./schemas/doDataConfiguracaoEstabelecimentoRequest";

const url = urlApi;

async function doDataConfiguracaoEstabelecimento({
  estId,
}: doDataConfiguracaoEstabelecimentoRequest) {
  const response = await axios.get<ConfiguracaoEstabelecimentoResponse[]>(
    `${url}api/configuracao/${estId}`
  );

  return response.data;
}

export const ConfiguracaoApi = {
    doDataConfiguracaoEstabelecimento
}
