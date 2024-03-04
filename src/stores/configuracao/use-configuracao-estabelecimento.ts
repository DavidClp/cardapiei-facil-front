import { ConfiguracaoApi } from "../../services/configuracao";
import { useQuery } from "@tanstack/react-query";

interface PropsUseEstabelecimentoDetalhe {
  estId: number;
}

export function useConfiguracaoEstabelecimento({
  estId,
}: PropsUseEstabelecimentoDetalhe) {
  const query = useQuery({
    queryKey: ["configuracao", { estId }],
    queryFn: () =>
      ConfiguracaoApi.doDataConfiguracaoEstabelecimento({ estId }),
      enabled: !!estId,
      throwOnError: false
  });

  return query;
}
