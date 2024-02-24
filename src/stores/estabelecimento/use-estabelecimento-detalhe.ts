import { useQuery } from "@tanstack/react-query";
import { EstabelecimentoApi } from "../../services/estabelecimento";

interface PropsUseEstabelecimentoDetalhe {
  estUrl: string;
}

export function useEstabelecimentoDetalhe({
  estUrl,
}: PropsUseEstabelecimentoDetalhe) {
  const query = useQuery({
    queryKey: ["estabelecimento", { estUrl }],
    queryFn: () =>
      EstabelecimentoApi.doDataEstabelecimentoFullDetalhe({ estUrl }),
  });

  return query;
}
